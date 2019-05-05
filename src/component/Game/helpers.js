export const updateLocalStorage = (key, value) => {
  let tempObj = JSON.parse(localStorage.rankingData);
  let target = key;
  tempObj[target] = value;
  localStorage.rankingData = JSON.stringify(tempObj);
};

export const drawReadyState = unit => {
  const canvas = document.querySelector("#game-canvas");
  const ctx = canvas.getContext("2d");

  let cw = 18 * unit;
  let ch = 13 * unit;

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

  // press to start
  ctx.save();
  ctx.beginPath();
  ctx.translate(cw / 2, ch / 2);
  ctx.textAlign = "center";
  ctx.font = `${unit}px Courier New`;
  ctx.fillStyle = "#fff";
  ctx.fillText("Click to Start", 0, 0);
  ctx.restore();
};

export const drawComingSoon = unit => {
  const canvas = document.querySelector("#game-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 18 * unit, 13 * unit);
  ctx.rect(0, 0, 18 * unit, 13 * unit);
  ctx.fillStyle = "#1d1d1d";
  ctx.fill();
  let cw = 18 * unit;
  let ch = 13 * unit;
  ctx.save();
  ctx.beginPath();
  ctx.translate(cw / 2, ch / 2);
  ctx.textAlign = "center";
  ctx.font = `${unit}px Courier New`;
  ctx.fillStyle = "#fff";
  ctx.fillText("Coming Soon...", 0, 0);
  ctx.restore();
};

export const drawTrack = (x1, x2, x3, x4, unit, color) => {
  const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector(
    ".player-canvas"
  ));
  const ctx = canvas.getContext("2d");
  let cw = 18 * unit;
  let ch = 13 * unit;

  // Fill Background Color
  ctx.beginPath();
  ctx.moveTo(x1 * unit, 0);
  ctx.lineTo(x2 * unit, 0);
  ctx.lineTo((cw * x3) / 4, ch);
  ctx.lineTo((cw * x4) / 4, ch);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
};

export const clearCanvas = unit => {
  const canvas = document.querySelector(".player-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 18 * unit, 13 * unit);
};

export const drawEffect = (x, unit) => {
  const canvas = document.querySelector(".player-canvas");
  const ctx = canvas.getContext("2d");
  const cw = 18 * unit;

  ctx.save();
  ctx.beginPath();
  ctx.translate((cw * x) / 4 - cw / 8, 12 * unit - 12);
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.font = `${unit}px Courier New`;
  ctx.fillText("HIT", 0, 0);
  ctx.restore();
};

export const drawFinishState = (unit, currentScore) => {
  const canvas = document.querySelector("#game-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 18 * unit, 13 * unit);
  let cw = 18 * unit;
  let ch = 13 * unit;

  let score = 0;
  const drawScore = () => {
    if (currentScore === 0) {
      score = 0;
    } else {
      score += 98;
    }
    ctx.clearRect(0, 0, 18 * unit, 13 * unit);
    ctx.rect(0, 0, 18 * unit, 13 * unit);
    ctx.fillStyle = "#1d1d1d";
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.translate(cw / 2, ch / 4);
    ctx.textAlign = "center";
    ctx.font = `${unit}px Courier New`;
    ctx.fillStyle = "#fff";
    ctx.fillText(`You got ${score} points!`, 0, 0);
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.translate(cw / 2, ch / 2);
    ctx.textAlign = "center";
    ctx.font = `${unit}px Courier New`;
    ctx.fillStyle = "#fff";
    ctx.fillText("Click to Ranking Page", 0, 0);
    ctx.restore();
  };

  const drawScoreTimer = setInterval(() => {
    drawScore();
    if (score >= currentScore) {
      clearInterval(drawScoreTimer);
    }
  }, 5);
};

export const rankingRule = () => {
  if (!localStorage.rankingData) {
    return;
  }
  let rankingData = JSON.parse(localStorage.rankingData);
  const total = rankingData.totalNotes;
  const hit =
    rankingData.hitNotesA +
    rankingData.hitNotesB +
    rankingData.hitNotesC +
    rankingData.hitNotesD;
  let accurate = Math.round((hit / total) * 100);
  if (accurate >= 90) {
    return "A";
  } else if (accurate >= 80) {
    return "B";
  } else if (accurate >= 70) {
    return "C";
  } else if (accurate >= 60) {
    return "D";
  } else {
    return "E";
  }
};
