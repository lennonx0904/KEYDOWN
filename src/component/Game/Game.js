import React from "react";
import { connect } from "react-redux";

import PureCanvas from "./PureCanvas";
import "./index.css";
import { checkInGame } from "../../actions";
import Note from "./Note";
import { noteData, noteData_1 } from "./noteData";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: null,
      canvas: {
        width: 18 * this.props.unit,
        height: 13 * this.props.unit,
        degA: Math.atan2(
          13 * this.props.unit,
          (18 * this.props.unit) / 2 - 2 * this.props.unit
        ),
        degB: Math.atan2(
          ((18 * this.props.unit) / 2) *
            Math.tan(
              Math.atan2(
                13 * this.props.unit,
                (18 * this.props.unit) / 2 - 2 * this.props.unit
              )
            ),
          (18 * [this.props.unit]) / 4
        ),
        overHeight:
          this.props.unit *
          2 *
          Math.tan(
            Math.atan2(
              13 * this.props.unit,
              (18 * this.props.unit) / 2 - 2 * this.props.unit
            )
          )
      },
      score: 0
    };
    this.noteA = [];
    this.noteB = [];
    this.noteC = [];
    this.noteD = [];
    this.time = 0;
    this.currentTime = 0;
  }

  saveContext = ctx => {
    this.ctx = ctx;
    // this.width = this.state.canvas.width;
    // this.height = this.state.canvas.height;
  };

  componentDidMount() {
    this.props.checkInGame(true);
    this.drawBackground();
  }
  componentWillUnmount() {
    this.props.checkInGame(false);
    clearInterval(this.startTimer);
  }

  line = (p1, p2, color, shadowColor, height) => {
    this.ctx.beginPath();
    this.ctx.moveTo(p1.x, p1.y);
    this.ctx.lineTo(p2.x, p2.y);
    this.ctx.strokeStyle = color;
    this.ctx.shadowBlur = 60;
    this.ctx.shadowColor = shadowColor;
    this.ctx.lineWidth = height;
    this.ctx.stroke();
  };

  drawBackground = () => {
    for (let i = 0; i < 5; i++) {
      this.line(
        { x: (i + 7) * this.props.unit, y: 0 },
        { x: ((18 * this.props.unit) / 4) * i, y: 13 * this.props.unit },
        "#000",
        null,
        1
      );
    }
    // Fill Background Color
    this.ctx.beginPath();
    this.ctx.moveTo(7 * this.props.unit, 0);
    this.ctx.lineTo(11 * this.props.unit, 0);
    this.ctx.lineTo(18 * this.props.unit, 13 * this.props.unit);
    this.ctx.lineTo(0, 13 * this.props.unit);
    this.ctx.closePath();
    this.ctx.fillStyle = "rgba(0,0,0,.8)";
    this.ctx.fill();

    // Press Line
    this.line(
      { x: 0.5 * this.props.unit, y: 12 * this.props.unit },
      { x: 17.5 * this.props.unit, y: 12 * this.props.unit },
      "rgba(142, 226, 163, 0.8)",
      null,
      2
    );
  };

  generateNote = (noteType, args, audio) => {
    if (audio.currentTime === 3) {
    }
    noteType.push(new Note(args));
  };

  update = () => {
    this.time++;
    console.log("UPDATE裡面的time", this.time);

    // 抓音樂開始時間，計算songPosition
    // if (noteData[0] === this.currentTime) {
    //   this.generateNote(this.noteA, null);
    // }

    // Next frame
    // requestAnimationFrame(() => {
    //   this.update();
    // });
  };

  stopGame = () => {
    this.props.checkInGame(false);
    console.log("----------inGame", this.props.inGame);
  };

  startGame = () => {
    let startTimer;
    const audio = new Audio(this.props.songToPlay.songURL);
    audio.play();
    console.log("audio的currentTime-----", audio.currentTime);

    startTimer = setInterval(() => {
      this.update();
      window.addEventListener("click", () => {
        audio.pause();
        audio.currentTime = 0;
        this.time = 0;
        clearInterval(startTimer);
      });
    }, 1000);

    
    // setInterval(()=>{console.log("audio.currentTime=====", audio.currentTime)},1000)

    window.addEventListener("keydown", () => {
      console.log("audio的currentTime-----", audio.currentTime);
    });
  };

  render() {
    console.log(this.props);
    console.log(this.state);

    return (
      <div>
        <PureCanvas
          contextRef={this.saveContext}
          width={this.state.canvas.width}
          height={this.state.canvas.height}
        />
        <button onClick={this.stopGame}>stop</button>
        <button onClick={this.startGame}>start</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { songToPlay: state.songToPlay, inGame: state.inGame };
};

export default connect(
  mapStateToProps,
  { checkInGame }
)(Game);
