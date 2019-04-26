export const player = (noteA, noteB, noteC, noteD, unit) => {
  const judge = noteArray => {
    if (noteArray[0]) {
      if (
        noteArray[0].centerPos.y > 11 * unit &&
        noteArray[0].centerPos.y < 13 * unit
      ) {
        noteArray[0].color = "white";
        noteArray[0].height = 30;
      }
    }
  };

  const play = e => {
    switch (e.keyCode) {
      // D = 68
      case 68:
        console.log("d");
        judge(noteA);
        break;

      // F = 70
      case 70:
        judge(noteB);
        break;

      // K = 75
      case 75:
        judge(noteC);
        break;

      // L = 76
      case 76:
        judge(noteD);
        break;

      default:
        break;
    }
  };

  window.addEventListener("keydown", play, false);
};
