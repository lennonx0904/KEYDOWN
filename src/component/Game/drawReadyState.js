export const drawReadyState = unit => {
  const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector(
    "#myCanvas"
  ));
  //   const canvas = document.querySelector("#myCanvas");
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
  ctx.font = "36px Courier New";
  ctx.fillStyle = "#fff";
  ctx.fillText("Press to Start", 0, 0);
  ctx.restore();
};
