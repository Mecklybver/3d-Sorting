import moves from "./script.js";

function bubbleSort(array) {
  let swapped;
  do {
    swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        swapped = true;
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        moves.push({ indices: [i - 1, i], swap: true });
      } else {
        moves.push({ indices: [i - 1, i], swap: false });
      }
    }
  } while (swapped);
  return moves;
}
function doubleBubbleSort(array) {
  let swapped;
  do {
    swapped = false;
    for (let i = 1; i < array.length; i++) {
      if (array[i - 1] > array[i]) {
        swapped = true;
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        moves.push({ indices: [i - 1, i], swap: true });
      } else {
        moves.push({ indices: [i - 1, i], swap: false });
      }
    }
    for (let i = array.length - 1; i > 0; i--) {
      if (array[i - 1] > array[i]) {
        swapped = true;
        [array[i - 1], array[i]] = [array[i], array[i - 1]];
        moves.push({ indices: [i - 1, i], swap: true });
      } else {
        moves.push({ indices: [i - 1, i], swap: false });
      }
    }
  } while (swapped);
  return moves;
}

function selectionSort(array) {
  const moves = [];
  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) {
        minIndex = j;
      }
    }
    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      moves.push({ indices: [i, minIndex], swap: true });
    } else {
      moves.push({ indices: [i, minIndex], swap: false });
    }
  }
  return moves;
}



export { bubbleSort, selectionSort, doubleBubbleSort };

