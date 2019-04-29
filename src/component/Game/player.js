import { updateLocalStorage, drawTrack, drawEffect } from "./helpers";

export const player = (noteA, noteB, noteC, noteD, unit) => {
  const btnD = document.querySelector(".btn-d");
  const btnF = document.querySelector(".btn-f");
  const btnK = document.querySelector(".btn-k");
  const btnL = document.querySelector(".btn-l");

  const judge = (noteArray, key) => {
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
          updateLocalStorage(key, hitNotes);
        }
      }
    };
  };

  const judgeA = judge(noteA, "hitNotesA");
  const judgeB = judge(noteB, "hitNotesB");
  const judgeC = judge(noteC, "hitNotesC");
  const judgeD = judge(noteD, "hitNotesD");

  const play = e => {
    switch (e.keyCode) {
      // D = 68
      case 68:
        // drawEffect(1, unit);
        btnD.classList.add("btn-d-active");
        drawTrack(7, 8, 1, 0, unit, "rgba(255,255,255,0.2)");
        // drawTrackA(unit, "rgba(255,255,255,0.2)");
        judgeA();
        break;
      // F = 70
      case 70:
        btnF.classList.add("btn-f-active");
        drawTrack(8, 9, 2, 1, unit, "rgba(255,255,255,0.2)");

        // drawTrackB(unit, "rgba(255,255,255,0.2)");
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
        drawTrack(7, 8, 1, 0, unit, "rgba(0,0,0,0.0)");

        break;
      // F = 70
      case 70:
        btnF.classList.remove("btn-f-active");
        drawTrack(8, 9, 2, 1, unit, "rgba(0,0,0,0.0)");

        break;
      // K = 75
      case 75:
        btnK.classList.remove("btn-k-active");
        drawTrack(9, 10, 3, 2, unit, "rgba(0,0,0,0.0)");

        break;
      // L = 76
      case 76:
        btnL.classList.remove("btn-l-active");
        drawTrack(10, 11, 4, 3, unit, "rgba(0,0,0,0.0)");

        break;

      default:
        break;
    }
  };

  window.addEventListener("keydown", play, false);
  window.addEventListener("keyup", keyupUI, false);
  return () => {};
};
