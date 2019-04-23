import { noteData_1 } from "./noteData";

// 全域變數
let updateFPS = 100;
let time = 0;
// let score = 0;
let round = 0;

//控制
var controls = {
  speed: 10,
  bpm: 100
};

const canvas =document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");
let cw = (canvas.width = 18 * 50);
let ch = (canvas.height = 13 * 50);

const degA = Math.atan2(ch, 350);
const degB = Math.atan2(450 * Math.tan(degA), cw / 2 / 2);
const overHeight = 100 * Math.tan(degA);

//  lib function
ctx.line = function(p1, p2, color, shadowColor, height) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.strokeStyle = color;
  ctx.shadowBlur = 60;
  ctx.shadowColor = shadowColor;
  ctx.lineWidth = height;
  ctx.stroke();
};
drawBackground();

class Pos {
  constructor(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
}
// Class Note
class Note {
  constructor(args) {
    let def = {
      centerPos: new Pos(cw / 2, 0),
      pos1: new Pos(-100, 0),
      pos2: new Pos(-50, 0),
      color: "#ffff00",
      shadowColor: "#fcfc68",
      height: 10,
      speed: controls.speed
      //  controls.bpm
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }
  render() {
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.centerPos.x, this.centerPos.y);
    ctx.line(this.pos1, this.pos2, this.color, this.shadowColor, this.height);
    ctx.restore();
  }
  update() {
    this.centerPos.y += this.speed;
    if (this.pos1.x !== 0 && this.pos2.x !== 0) {
      this.pos1.x =
        ((this.centerPos.y + overHeight) / Math.tan(degA)) *
        (this.pos1.x / Math.abs(this.pos1.x));
      this.pos2.x =
        ((this.centerPos.y + overHeight) / Math.tan(degB)) *
        (this.pos2.x / Math.abs(this.pos2.x));
    } else {
      this.pos1.x =
        ((this.centerPos.y + overHeight) / Math.tan(degB)) *
        (this.pos1.x / Math.abs(this.pos1.x));
      this.pos2.x = 0;
    }
  }
}

let noteA = [];
let noteB = [];
let noteC = [];
let noteD = [];

function update() {
  time++;

  if (time % ((updateFPS * 60) / controls.bpm) === 0) {
    round++;
    console.log(round);
    noteData_1[round].forEach((e, index) => {
      if (noteData_1[round][0] === 1) {
        noteA.push(new Note());
      }
      if (noteData_1[round][1] === 1) {
        noteB.push(
          new Note({
            pos1: new Pos(-50, 0),
            pos2: new Pos(0, 0),
            color: "#75d0f5",
            shadowColor: "#5ad0fa"
          })
        );
      }
      if (noteData_1[round][2] === 1) {
        noteC.push(
          new Note({
            pos1: new Pos(50, 0),
            pos2: new Pos(0, 0),
            color: "#ff0000",
            shadowColor: "#ff5a5a"
          })
        );
      }
      if (noteData_1[round][3] === 1) {
        noteD.push(
          new Note({
            pos1: new Pos(50, 0),
            pos2: new Pos(100, 0),
            color: "#9100f1",
            shadowColor: "#aa27ff"
          })
        );
      }
    });
  }
  noteA.forEach(e => e.update());
  noteB.forEach(e => e.update());
  noteC.forEach(e => e.update());
  noteD.forEach(e => e.update());

  noteA.forEach((e, index) => {
    if (e.centerPos.y > 650) {
      noteA.splice(index, 1);
    }
  });
  noteB.forEach((e, index) => {
    if (e.centerPos.y > 650) {
      noteB.splice(index, 1);
    }
  });
  noteC.forEach((e, index) => {
    if (e.centerPos.y > 650) {
      noteC.splice(index, 1);
    }
  });
  noteD.forEach((e, index) => {
    if (e.centerPos.y > 650) {
      noteD.splice(index, 1);
    }
  });

  render();
}

function drawBackground() {
  for (let i = 0; i < 5; i++) {
    ctx.line(
      { x: (i + 7) * 50, y: 0 },
      { x: ((18 * 50) / 4) * i, y: 13 * 50 },
      "#000",
      null,
      1
    );
  }
  // Fill Background Color
  ctx.beginPath();
  ctx.moveTo(7 * 50, 0);
  ctx.lineTo(11 * 50, 0);
  ctx.lineTo(18 * 50, 13 * 50);
  ctx.lineTo(0, 13 * 50);
  ctx.closePath();
  ctx.fillStyle = "rgba(0,0,0,.8)";
  ctx.fill();

  // Press Line
  ctx.line(
    { x: 0.5 * 50, y: 12 * 50 },
    { x: 17.5 * 50, y: 12 * 50 },
    "rgba(142, 226, 163, 0.8)",
    null,
    2
  );
}

function render() {
  ctx.clearRect(0, 0, 18 * 50, 13 * 50);

  drawBackground();
  noteA.forEach(e => e.render());
  noteB.forEach(e => e.render());
  noteC.forEach(e => e.render());
  noteD.forEach(e => e.render());

  requestAnimationFrame(render);
}
requestAnimationFrame(render);
setInterval(update, 1000 / updateFPS);
