import lerp from "./math.js";

class Column {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = {
      r: 150,
      g: 150,
      b: 150,
    };
    this.queue = [];
    this.frameCount = 15;
    
  }

  moveTo(loc, yOffset = 1, left = true, frameCount = this.frameCount) {
    console.log(this.frameCount);
    
    for (let i = 1; i <= frameCount; i++) {
      const t = i / frameCount;
      const u = Math.sin(t * Math.PI);
      this.queue.push({
        x: lerp(this.x, loc.x, t),
        y: lerp(this.y, loc.y, t) + u * this.width * 0.6 * yOffset,
        r: left == true ? lerp(150, 255, u) : lerp(150, 255, u),
        g: left == true ? lerp(150, 0, u) : lerp(150, 255, u),
        b: left == true ? lerp(150, 0, u) : lerp(150, 0, u),
      });
    }
  }

  jump(green = true, yOffset = -2, frameCount = this.frameCount) {
    for (let i = 1; i <= frameCount; i++) {
      const t = i / frameCount;
      const u = Math.sin(t * Math.PI);
      this.queue.push({
        x: this.x,
        y:
          lerp(this.y, this.y - u * this.width * 0.6 * yOffset, t) +
          u * this.width * 0.6 * yOffset,
        r: green == true ? lerp(150, 0, u) : lerp(150, 255, u),
        g: green == true ? lerp(150, 0, u) : lerp(150, 255, u),
        b: green == true ? lerp(150, 255, u) : lerp(150, 255, u),
      });
    }
  }

  draw(ctx,frameCount) {
    this.frameCount = frameCount;
    console.log(this.frameCount);
    let changed = false;
    if (this.queue.length > 0) {
      const { x, y, r, g, b } = this.queue.shift();
      this.x = x;
      this.y = y;
      this.color = { r, g, b };
      changed = true;
    }

    const left = this.x - this.width * 0.5;
    const right = this.x + this.width * 0.5;
    const top = this.y - this.height;

    ctx.beginPath();
    const { r, g, b } = this.color;
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.moveTo(left, top);
    ctx.lineTo(left, this.y);
    ctx.ellipse(
      this.x,
      this.y,
      this.width * 0.5,
      this.width * 0.25,
      0,
      Math.PI,
      Math.PI * 2,
      true
    );
    ctx.lineTo(right, top);
    ctx.ellipse(
      this.x,
      top,
      this.width * 0.5,
      this.width * 0.25,
      0,
      0,
      Math.PI * 2,
      true
    );
    ctx.fill();
    ctx.stroke();

    return changed;
  }
}

export default Column;
