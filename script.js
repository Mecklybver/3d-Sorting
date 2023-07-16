import Column from "./column.js";
import lerp from "./math.js";
import { bubbleSort, selectionSort, doubleBubbleSort } from "./sorts.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 300;
const margin = 30;
const n = 20;
let array = [];
let cols = [];
let moves = [];
const spacing = (canvas.width - margin * 2) / n;
const maxColumnHeight = 200;
let audioCtx;
function init() {
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }

  for (let i = 0; i < array.length; i++) {
    const x = i * spacing + spacing * 0.5 + margin;
    const y = canvas.height - margin - i * 3;
    const width = spacing - 4;
    const height = maxColumnHeight * array[i];
    cols[i] = new Column(x, y, width, height);
  }
}
init();

function playNote(freq, type) {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  const dur = 0.2;
  const node = audioCtx.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioCtx.currentTime + dur);

  freq.forEach((f) => {
    const osc = audioCtx.createOscillator();
    osc.frequency.value = f * 700 + 300;
    osc.type = type;
    osc.connect(node);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
  });

  node.connect(audioCtx.destination);
}

window.init = () => {
  moves = [];
  array = [];
  cols = [];
  for (let i = 0; i < n; i++) {
    array[i] = Math.random();
  }

  for (let i = 0; i < array.length; i++) {
    const x = i * spacing + spacing * 0.5 + margin;
    const y = canvas.height - margin - i * 3;
    const width = spacing - 4;
    const height = maxColumnHeight * array[i];
    cols[i] = new Column(x, y, width, height);
  }
};

let sort = "bubbleSort";

window.sorting = () => {
  sort = document.querySelector("select").value;
};

window.play = () => {
  if (sort === "bubbleSort") {
    moves = bubbleSort(array);
  }
  if (sort === "selectionSort") {
    moves = selectionSort(array);
  }
  if (sort === "doubleBubbleSort") {
    moves = doubleBubbleSort(array);
  }
};

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let changed = false;
  cols.forEach((col) => {
    changed = col.draw(ctx) || changed;
  });

  if (!changed && moves.length > 0) {
    const move = moves.shift();
    const [i, j] = move.indices;
    const waveFormType = move.swap ? "triangle" : "sine";
    playNote([array[i], array[j]], waveFormType);
    if (move.swap) {
      cols[i].moveTo(cols[j]);
      cols[j].moveTo(cols[i], -1, false);
      [cols[i], cols[j]] = [cols[j], cols[i]];
    } else {
      cols[i].jump();
      cols[j].jump();
    }
  }
  if (changed && moves.length == 0) {
    let j=0
    for (let i = array.length - 1; i >= 0; i--) {
      j++
      setTimeout(() => {
        cols[i].color = {r: 0, g: 255, b: 0};
        playNote([array[i]], "square");
      }, 100 * j);
      if ( i == 0){
        for (let i = array.length - 1; i >= 0; i--){
          j++
          setTimeout(() => {
            cols[i].color = {r: 150, g: 150, b: 150};
          }, 100 * j);
        }
      }
    }
  }

  requestAnimationFrame(animate);
}

animate();

export default moves;
