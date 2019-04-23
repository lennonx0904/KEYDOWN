
export default class Note {
  constructor(args) {
    let def = {
      centerPos: args.centerPos,
      pos1: args.pos1,
      pos2: args.pos2,
      color: "#ffff00",
      shadowColor: "#fcfc68",
      height: 10,
      speed: 10
    };
    Object.assign(def, args);
    Object.assign(this, def);
  }
  render(state) {
    const degA = state.degA;
    const degB = state.degB;
    const overHeight = state.overHeight;

    // fall down
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

    // draw
    const ctx = state.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.translate(this.centerPos.x, this.centerPos.y);
    ctx.line(this.pos1, this.pos2, this.color, this.shadowColor, this.height);
    ctx.restore();
  }
}
