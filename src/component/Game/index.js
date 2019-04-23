import React from "react";
import { connect } from "react-redux";

import PureCanvas from "./PureCanvas";
import "./index.css";
import Note from "./Note";
import { noteData } from "./noteData";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ctx: null,
      screen: window.innerWidth,
      canvas: {
        width: 18 * 50,
        height: 13 * 50,
        degA: Math.atan2(13 * 50, (18 * 50) / 2 - 2 * 50),
        degB: Math.atan2(
          ((18 * 50) / 2) *
            Math.tan(Math.atan2(13 * 50, (18 * 50) / 2 - 2 * 50)),
          (18 * 50) / 4
        ),
        overHeight:
          50 * 2 * Math.tan(Math.atan2(13 * 50, (18 * 50) / 2 - 2 * 50))
      },
      score: 0
    };
    this.noteA = [];
    this.noteB = [];
    this.noteC = [];
    this.noteD = [];
    this.currentTime = 0;
  }
  saveContext = ctx => {
    this.ctx = ctx;
    this.width = this.ctx.canvas.width;
    this.height = this.ctx.canvas.height;
  };
  componentDidMount() {
    // const canvas = document.querySelector("#myCanvas");
    // const ctx = canvas.getContext("2d");
    // this.setState({ ctx: ctx });

    
    requestAnimationFrame(() => {
      this.update();
    });
  }

  generateNote = (noteType, args) => {
    noteType.push(new Note(args));
  };

  update = i => {
    // 抓音樂開始時間，計算songPosition
    if (noteData[0][i] === this.currentTime) {
      this.generateNote(this.noteA, null);
    }

    // Next frame
    requestAnimationFrame(() => {
      this.update();
    });
  };

  startGame = () => {
    const audio = new Audio(this.props.songToPlay.songURL);
    audio.play();
  };

  render() {
    console.log(this.props);
    console.log(this.state);

    return <PureCanvas contextRef={this.saveContext} />;
  }
}

const mapStateToProps = state => {
  return { songToPlay: state.songToPlay };
};

export default connect(mapStateToProps)(Game);
