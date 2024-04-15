let gradationpallet1 = ["#7f5539","#606c38","#ff758f","#f7ede2","#936639","#4ecdc4","#f9c74f"];
let gradationpallet2 = ["#582f0e","#c6ac8f","#fe6d73", "#713200","#bd897e", "#f9c74f","#6a4c93","#e5383b"];
let topping = ["#e9c46a", "#e63946", "#f7ede2", "#ffffff", "#582f0e"];
let bg = ["#F2EDEC"];

class MovingShape {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.rotationSpeed = random(-1, 1); // 隨機旋轉速度
  }

  move() {
    this.x += random(-1, 1); // 隨機沿 x 軸移動
    this.y += random(-1, 1); // 隨機沿 y 軸移動
  }

  drawShape() {
    push();
    translate(this.x, this.y);
    rotate(frameCount * this.rotationSpeed); // 根據 frameCount 和旋轉速度旋轉

    let gradient = drawingContext.createLinearGradient(0, -this.size / 2, 0, this.size / 2);
    gradient.addColorStop(0, random(gradationpallet1));
    gradient.addColorStop(1, random(gradationpallet2));
    noStroke();
    drawingContext.fillStyle = gradient;
    arc(0, 0, this.size * 0.9, this.size, 180, 360);
    circle(0, this.size / 8, this.size / 2);
    circle(this.size / 3, this.size / 8, this.size / 2);
    circle(-this.size / 3, this.size / 8, this.size / 2);

    for (let n = 0; n < this.size / 5; n++) {
      fill(random(topping));
      circle(random(-this.size / 3, this.size / 3), random(-this.size / 14, -this.size / 2.5), random(this.size / 10));
    }
    pop();
  }
}

let shapes = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background(bg);

  let cells = 4;
  let offset = height / 10;
  let margin = offset / 2;
  let w = (width - offset * 2 - margin * (cells - 1)) / cells;
  let h = (height - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (w + margin);
      let y = offset + j * (h + margin);

      let cx = x + w / 2;
      let cy = y + h / 2;
      let d = h;

      shapes.push(new MovingShape(cx, cy, d));
    }
  }
}

function draw() {
  background(bg);
  for (let shape of shapes) {
    shape.move();
    shape.drawShape();
  }
}