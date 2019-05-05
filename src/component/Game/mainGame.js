import { player } from "./player";
import { updateLocalStorage } from "./helpers";

export const mainGame = (unit, beatData, audio, difficulty) => {
  audio.play();
  // 全域變數
  let updateFPS = 100;
  let time = 0;
  let round = 0;
  let speed = unit / 5;
  let bpm = 100;

  if (difficulty === "easy") {
    bpm /= 2;
    speed *= 0.8;
  }
  if (difficulty === "hard") {
    bpm *= 2;
  }

  const canvas = document.querySelector("#game-canvas");
  const ctx = canvas.getContext("2d");
  const cw = 18 * unit;
  const ch = 13 * unit;
  const degA = Math.atan2(ch, cw / 2 - 2 * unit);
  const degB = Math.atan2((cw / 2) * Math.tan(degA), cw / 2 / 2);
  const overHeight = unit * 2 * Math.tan(degA);

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

  class Pos {
    constructor(x, y) {
      this.x = x || 0;
      this.y = y || 0;
    }
  }

  class Note {
    constructor(args) {
      let def = {
        centerPos: new Pos(cw / 2, 0),
        pos1: new Pos(-(unit * 2), 0),
        pos2: new Pos(-unit, 0),
        color: "#75d0f5",
        shadowColor: "#5ad0fa",
        height: unit / 5,
        speed: speed
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
  let totalNotes = 0;

  const update = () => {
    time++;

    // offset = 115
    if (time > 115) {
      if (time % ((updateFPS * 60) / bpm) === 0) {
        round++;
        beatData[round].forEach((e, index) => {
          if (beatData[round][0] === 1) {
            noteA.push(new Note());
            totalNotes++;
          }
          if (beatData[round][1] === 1) {
            noteB.push(
              new Note({
                pos1: new Pos(-unit, 0),
                pos2: new Pos(0, 0),
                color: "#ff0000",
                shadowColor: "#ff5a5a"
              })
            );
            totalNotes++;
          }
          if (beatData[round][2] === 1) {
            noteC.push(
              new Note({
                pos1: new Pos(unit, 0),
                pos2: new Pos(0, 0),
                color: "#83ff2b",
                shadowColor: "#6fd328"
              })
            );
            totalNotes++;
          }
          if (beatData[round][3] === 1) {
            noteD.push(
              new Note({
                pos1: new Pos(unit, 0),
                pos2: new Pos(unit * 2, 0),
                color: "#ffff00",
                shadowColor: "#fcfc68"
              })
            );
            totalNotes++;
          }
        });
      }
    }
    
    noteA.forEach(e => e.update());
    noteB.forEach(e => e.update());
    noteC.forEach(e => e.update());
    noteD.forEach(e => e.update());

    noteA.forEach((e, index) => {
      if (e.centerPos.y > ch) {
        noteA.splice(index, 1);
      }
    });
    noteB.forEach((e, index) => {
      if (e.centerPos.y > ch) {
        noteB.splice(index, 1);
      }
    });
    noteC.forEach((e, index) => {
      if (e.centerPos.y > ch) {
        noteC.splice(index, 1);
      }
    });
    noteD.forEach((e, index) => {
      if (e.centerPos.y > ch) {
        noteD.splice(index, 1);
      }
    });
    updateLocalStorage("totalNotes", totalNotes / 4);
    render();
  };

  const render = () => {
    ctx.clearRect(0, 0, 18 * unit, 13 * unit);
    drawBackground();
    noteA.forEach(e => e.render());
    noteB.forEach(e => e.render());
    noteC.forEach(e => e.render());
    noteD.forEach(e => e.render());
  };

  const drawBackground = () => {
    for (let i = 0; i < 5; i++) {
      ctx.line(
        { x: (i + 7) * unit, y: 0 },
        { x: ((18 * unit) / 4) * i, y: 13 * unit },
        "#000",
        null,
        1
      );
    }
    // Fill Background Color
    ctx.beginPath();
    ctx.moveTo(7 * unit, 0);
    ctx.lineTo(11 * unit, 0);
    ctx.lineTo(18 * unit, 13 * unit);
    ctx.lineTo(0, 13 * unit);
    ctx.closePath();
    ctx.fillStyle = "rgba(0,0,0,.8)";
    ctx.fill();

    // Press Line
    ctx.line(
      { x: 0.5 * unit, y: 12 * unit },
      { x: 17.5 * unit, y: 12 * unit },
      "rgba(142, 226, 163, 0.8)",
      null,
      2
    );
  };

  const startGameTimer = setInterval(() => {
    update();
  }, 1000 / updateFPS);

  player(noteA, noteB, noteC, noteD, unit, audio);

  // set the closure let outside Component can clearInterval
  return () => {
    clearInterval(startGameTimer);
    audio.pause();
    audio.currentTime = 0;
  };
};
