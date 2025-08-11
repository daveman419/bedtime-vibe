class Sprite1 {
  constructor(animation, x, y, speed) {
      this.x = x;
      this.y = y;
      this.animation = animation;
      this.len = this.animation.length;
      this.speed = speed;
      this.index = 0;
  }

  show() {
      let index = floor(this.index) % this.len;
      image(this.animation[index], this.x, this.y);
  }

  animate() {
      this.index += this.speed;
      this.x += this.speed * 5;

      if (this.x > width) {
          this.x = -this.animation[0].width;
      }
  }
}

let spritesheet;
let spritedata;
let animation = [];
let horses = [];

function preload() {
  // Update paths to match your project structure
  spritedata = loadJSON('sprite.json'); // Adjust path if needed
  spritesheet = loadImage('sprite1.jpg'); // Adjust path if needed
}

function setup() {
  // Attach the canvas to the sketch-container div
  let canvas = createCanvas(850, 600);
  canvas.parent('sketch-container');

  let frames1 = spritedata.frames1;
  for (let i = 0; i < frames1.length; i++) {
      let pos = frames1[i].position;
      let img = spritesheet.get(pos.x, pos.y, pos.w, pos.h);
      animation.push(img);
  }

  for (let i = 0; i < 5; i++) {
      horses[i] = new Sprite1(animation, 0, i * 120, random(0.05, 0.3));
  }
}

function draw() {
  background(166, 172, 186);

  for (let horse of horses) {
      horse.show();
      horse.animate();
  }
}