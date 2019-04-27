import { updateLocalStorage } from "./updateLocalStorage";

export const player = (noteA, noteB, noteC, noteD, unit) => {
  const judge = (noteArray, key) => {
    let hitNotes = 0;
    return () => {
      if (noteArray[0]) {
        if (
          noteArray[0].centerPos.y > 11 * unit &&
          noteArray[0].centerPos.y < 13 * unit
        ) {
          noteArray[0].color = "#000000";
          noteArray[0].shadowColor = '#000000'
          noteArray[0].height = 30;
          hitNotes++;
          updateLocalStorage(key, hitNotes);
          console.log("now hit", hitNotes);
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
        judgeA();
        break;
      // F = 70
      case 70:
        judgeB();
        break;
      // K = 75
      case 75:
        judgeC();
        break;
      // L = 76
      case 76:
        judgeD();
        break;

      default:
        break;
    }
  };

  window.addEventListener("keydown", play, false);

  return () => {};
};
