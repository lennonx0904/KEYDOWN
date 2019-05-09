import {
  updateLocalStorage,
  rankingCounter,
  drawTrack,
  clearCanvas,
  drawJudgeEffect
} from "./helpers";

export const player = (noteA, noteB, noteC, noteD, unit, audio) => {
  const btnD = document.querySelector(".btn-d");
  const btnF = document.querySelector(".btn-f");
  const btnK = document.querySelector(".btn-k");
  const btnL = document.querySelector(".btn-l");
  const currentSocre = document.querySelector(".current-socre");
  let hit = 0;

  const judge = (noteArray, trackIndex) => {
    return () => {
      if (!noteArray[0]) return;
      const notePosY = noteArray[0].centerPos.y;
      let combo = rankingCounter().combo;
      if (notePosY > 11 * unit && notePosY < 13 * unit) {
        hit++;
        combo++;
        noteArray.splice(0, 1);
        drawJudgeEffect(trackIndex, unit, "HIT", combo);
        updateLocalStorage("hit", hit);
        updateLocalStorage("combo", combo);
        currentSocre.textContent = rankingCounter().score;
      }
    };
  };

  const judgeA = judge(noteA, 1);
  const judgeB = judge(noteB, 2);
  const judgeC = judge(noteC, 3);
  const judgeD = judge(noteD, 4);

  const play = e => {
    switch (e.keyCode) {
      // D = 68
      case 68:
        btnD.classList.add("btn-d-active");
        drawTrack(7, 1, unit);
        judgeA();
        break;
      // F = 70
      case 70:
        btnF.classList.add("btn-f-active");
        drawTrack(8, 2, unit);
        judgeB();
        break;
      // K = 75
      case 75:
        btnK.classList.add("btn-k-active");
        drawTrack(9, 3, unit);
        judgeC();
        break;
      // L = 76
      case 76:
        btnL.classList.add("btn-l-active");
        drawTrack(10, 4, unit);
        judgeD();
        break;
      default:
        break;
    }
  };

  const keyupUI = e => {
    clearCanvas(unit);
    switch (e.keyCode) {
      // D = 68
      case 68:
        btnD.classList.remove("btn-d-active");
        break;
      // F = 70
      case 70:
        btnF.classList.remove("btn-f-active");
        break;
      // K = 75
      case 75:
        btnK.classList.remove("btn-k-active");
        break;
      // L = 76
      case 76:
        btnL.classList.remove("btn-l-active");
        break;

      default:
        break;
    }
  };

  window.addEventListener("keydown", play, false);
  window.addEventListener("keyup", keyupUI, false);

  audio.addEventListener("ended", () => {
    window.removeEventListener("keydown", play, false);
    window.removeEventListener("keyup", keyupUI, false);
  });

  // for mobile
  btnD.addEventListener("touchstart", () => {
    drawTrack(7, 1, unit);
    judgeA();
  });
  btnF.addEventListener("touchstart", () => {
    drawTrack(8, 2, unit);
    judgeB();
  });
  btnK.addEventListener("touchstart", () => {
    drawTrack(9, 3, unit);
    judgeC();
  });
  btnL.addEventListener("touchstart", () => {
    drawTrack(10, 4, unit);
    judgeD();
  });

  // for mobile
  btnD.addEventListener("touchend", () => {
    clearCanvas(unit);
  });
  btnF.addEventListener("touchend", () => {
    clearCanvas(unit);
  });
  btnK.addEventListener("touchend", () => {
    clearCanvas(unit);
  });
  btnL.addEventListener("touchend", () => {
    clearCanvas(unit);
  });
};
