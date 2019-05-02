import {
  updateLocalStorage,
  drawTrack,
  clearCanvas,
  drawEffect
} from "./helpers";

export const player = (noteA, noteB, noteC, noteD, unit, audio) => {
  const btnD = document.querySelector(".btn-d");
  const btnF = document.querySelector(".btn-f");
  const btnK = document.querySelector(".btn-k");
  const btnL = document.querySelector(".btn-l");

  const judge = (noteArray, trackIndex, key) => {
    let hitNotes = 0;
    return () => {
      if (noteArray[0]) {
        if (
          noteArray[0].centerPos.y > 11 * unit &&
          noteArray[0].centerPos.y < 13 * unit
        ) {
          noteArray[0].color = "#000000";
          noteArray[0].shadowColor = "#000000";
          noteArray[0].height = 30;
          hitNotes++;
          drawEffect(trackIndex, unit);
          updateLocalStorage(key, hitNotes);
        }
      }
    };
  };

  const judgeA = judge(noteA, 1, "hitNotesA");
  const judgeB = judge(noteB, 2, "hitNotesB");
  const judgeC = judge(noteC, 3, "hitNotesC");
  const judgeD = judge(noteD, 4, "hitNotesD");

  const play = e => {
    switch (e.keyCode) {
      // D = 68
      case 68:
        btnD.classList.add("btn-d-active");
        drawTrack(7, 8, 1, 0, unit, "rgba(255,255,255,0.2)");
        judgeA();
        break;
      // F = 70
      case 70:
        btnF.classList.add("btn-f-active");
        drawTrack(8, 9, 2, 1, unit, "rgba(255,255,255,0.2)");
        judgeB();
        break;
      // K = 75
      case 75:
        btnK.classList.add("btn-k-active");
        drawTrack(9, 10, 3, 2, unit, "rgba(255,255,255,0.2)");
        judgeC();
        break;
      // L = 76
      case 76:
        btnL.classList.add("btn-l-active");
        drawTrack(10, 11, 4, 3, unit, "rgba(255,255,255,0.2)");
        judgeD();
        break;
      default:
        break;
    }
  };
  const keyupUI = e => {
    switch (e.keyCode) {
      // D = 68
      case 68:
        btnD.classList.remove("btn-d-active");
        clearCanvas(unit);
        break;
      // F = 70
      case 70:
        btnF.classList.remove("btn-f-active");
        clearCanvas(unit);
        break;
      // K = 75
      case 75:
        btnK.classList.remove("btn-k-active");
        clearCanvas(unit);
        break;
      // L = 76
      case 76:
        btnL.classList.remove("btn-l-active");
        clearCanvas(unit);
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

  // for mobile touchstart ------------
  btnD.addEventListener("touchstart", () => {
    drawTrack(7, 8, 1, 0, unit, "rgba(255,255,255,0.2)");
    judgeA();
  });
  btnF.addEventListener("touchstart", () => {
    drawTrack(8, 9, 2, 1, unit, "rgba(255,255,255,0.2)");
    judgeB();
  });
  btnK.addEventListener("touchstart", () => {
    drawTrack(9, 10, 3, 2, unit, "rgba(255,255,255,0.2)");
    judgeC();
  });
  btnL.addEventListener("touchstart", () => {
    drawTrack(10, 11, 4, 3, unit, "rgba(255,255,255,0.2)");
    judgeD();
  });

  // for mobile touchend
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
