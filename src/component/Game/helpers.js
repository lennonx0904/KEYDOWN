export const updateLocalStorage = (key, value) => {
  const tempObj = JSON.parse(localStorage.rankingData);
  const target = key;
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
  const cw = 18 * unit;
  const ch = 13 * unit;
  ctx.save();
  ctx.beginPath();
  ctx.translate(cw / 2, ch / 2);
  ctx.textAlign = "center";
  ctx.font = `${unit}px Courier New`;
  ctx.fillStyle = "#fff";
  ctx.fillText("Coming Soon...", 0, 0);
  ctx.restore();
};

export const drawTrack = (beginX, trackIndex, unit) => {
  const canvas = document.querySelector("#player-canvas");
  const ctx = canvas.getContext("2d");
  const cw = 18 * unit;
  const ch = 13 * unit;
  // Fill Background Color
  ctx.beginPath();
  ctx.moveTo(beginX * unit, 0);
  ctx.lineTo((beginX + 1) * unit, 0);
  ctx.lineTo((cw * trackIndex) / 4, ch);
  ctx.lineTo((cw * (trackIndex - 1)) / 4, ch);
  ctx.closePath();
  ctx.fillStyle = "rgba(255,255,255,0.1)";
  ctx.fill();
};

export const clearCanvas = unit => {
  const canvas = document.querySelector("#player-canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 18 * unit, 13 * unit);
};

export const drawJudgeEffect = (trackIndex, unit, text, combo) => {
  const canvas = document.querySelector("#player-canvas");
  const ctx = canvas.getContext("2d");
  const cw = 18 * unit;
  const ch = 13 * unit;
  ctx.clearRect(0, 0, cw, ch);

  ctx.save();
  ctx.beginPath();
  ctx.translate((cw * trackIndex) / 4 - cw / 8, 12 * unit - 12);
  ctx.textAlign = "center";
  if (text === "MISS") {
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = `${unit * 0.7}px Courier New`;
  } else {
    ctx.fillStyle = "#fff";
    ctx.font = `${unit}px Courier New`;
  }

  ctx.fillText(text, 0, 0);
  ctx.restore();

  if (combo > 1) {
    ctx.save();
    ctx.beginPath();
    ctx.translate(cw / 2, ch / 2);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = `${unit}px Courier New`;
    ctx.fillText(`COMBO ${combo}`, 0, 0);
    ctx.restore();
  }

  // clear canvas automatically in case player has no interaction
  // that cause "MISS" effect will be removed till next round
  setTimeout(() => {
    ctx.clearRect(0, 0, cw, ch);
  }, 300);
};

export const drawFinishState = (unit, currentScore) => {
  const canvas = document.querySelector("#game-canvas");
  const ctx = canvas.getContext("2d");
  const cw = 18 * unit;
  const ch = 13 * unit;
  ctx.clearRect(0, 0, cw, ch);

  let score = 0;
  if (currentScore / 1000 > 1) {
    score = currentScore - (currentScore % 1000);
  }

  const drawScore = () => {
    if (currentScore === 0) {
      score = 0;
    } else {
      score++;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.rect(0, 0, cw, ch);
    ctx.fillStyle = "#1d1d1d";
    ctx.fill();

    ctx.save();
    ctx.beginPath();
    ctx.translate(cw / 2, ch / 4);
    ctx.textAlign = "center";
    ctx.font = `${unit}px Courier New`;
    ctx.fillStyle = "#fff";
    ctx.fillText(`You got ${score} points!`, 0, 0);
    ctx.translate(0, ch / 4);
    ctx.fillText("Click to Ranking Page", 0, 0);
    ctx.restore();
  };

  // set clearInterval as a callback with condition
  const drawScoreTimer = setInterval(() => {
    drawScore();
    if (score >= currentScore) {
      clearInterval(drawScoreTimer);
    }
  }, 1);
};

export const getRankingData = () => {
  if (!localStorage.rankingData) return;
  const { name, total, hit, miss, combo, score } = JSON.parse(
    localStorage.rankingData
  );
  const accurate = Math.round((hit / total) * 100);
  let rank;
  if (accurate >= 90) {
    rank = "A";
  } else if (accurate >= 80) {
    rank = "B";
  } else if (accurate >= 70) {
    rank = "C";
  } else if (accurate >= 60) {
    rank = "D";
  } else {
    rank = "E";
  }
  return { name, total, hit, miss, combo, score, accurate, rank };
};

export const comboScoreCounter = () => {
  if (!localStorage.rankingData) return;
  const combo = JSON.parse(localStorage.rankingData).combo;
  let score;
  if (combo < 2) {
    score = 100;
  } else if (combo > 20) {
    score = (100 * (100 + Math.pow(20, 2))) / 100;
  } else {
    score = (100 * (100 + Math.pow(combo, 2))) / 100;
  }
  return score;
};
