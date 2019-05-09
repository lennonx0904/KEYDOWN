import { player } from "./player";
import { updateLocalStorage } from "./helpers";

export const mainGame = (unit, beatData, audio, difficulty) => {
  audio.play();

  const updateFPS = 100;
  let speed = unit / 5;
  let round = 0;
  let bpm = 100;

  if (difficulty === "easy") {
    bpm /= 2;
    // speed *= 0.8;
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
  let total = 0;
  let miss = 0;
  // time offset
  let lastPosition = 0.2;

  const update = () => {
    const getFixedTime = float => {
      return parseFloat(float.toFixed(1));
    };
    const currentTime = getFixedTime(audio.currentTime);
    const deltaTime = getFixedTime(60 / bpm);

    // using SongPosition to generate notes
    if (getFixedTime(currentTime - lastPosition) === deltaTime) {
      lastPosition += deltaTime;
      round++;
      total += beatData[round].filter(e => e === 1).length;
      // console.log("round", round);
      for (let i = 0; i < 4; i++) {
        if (beatData[round][i] === 1) {
          switch (i) {
            case 0:
              return noteA.push(new Note());
            case 1:
              return noteB.push(
                new Note({
                  pos1: new Pos(-unit, 0),
                  pos2: new Pos(),
                  color: "#ff0000",
                  shadowColor: "#ff5a5a"
                })
              );
            case 2:
              return noteC.push(
                new Note({
                  pos1: new Pos(unit, 0),
                  pos2: new Pos(),
                  color: "#83ff2b",
                  shadowColor: "#6fd328"
                })
              );
            case 3:
              return noteD.push(
                new Note({
                  pos1: new Pos(unit, 0),
                  pos2: new Pos(unit * 2, 0),
                  color: "#ffff00",
                  shadowColor: "#fcfc68"
                })
              );
            default:
              return;
          }
        }
      }
    }

    // update the position of notes for animation
    noteA.forEach(note => note.update());
    noteB.forEach(note => note.update());
    noteC.forEach(note => note.update());
    noteD.forEach(note => note.update());

    // remove notes which were outside of the canvas
    noteA.forEach((e, index) => {
      if (e.centerPos.y > ch) {
        noteB.splice(index, 1);
        miss++;
      }
    });
    noteB.forEach((e, index) => {
      if (e.centerPos.y > ch) {
        noteB.splice(index, 1);
        miss++;
      }
    });
    noteC.forEach((e, index) => {
      if (e.centerPos.y > ch) {
        noteC.splice(index, 1);
        miss++;
      }
    });
    noteD.forEach((e, index) => {
      if (e.centerPos.y > ch) {
        noteD.splice(index, 1);
        miss++;
      }
    });

    updateLocalStorage("total", total);
    updateLocalStorage("miss", miss);

    render();
  };

  const render = () => {
    ctx.clearRect(0, 0, 18 * unit, 13 * unit);
    drawBackground();
    // noteArray.forEach(e => e.render());
    noteA.forEach(note => note.render());
    noteB.forEach(note => note.render());
    noteC.forEach(note => note.render());
    noteD.forEach(note => note.render());
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
