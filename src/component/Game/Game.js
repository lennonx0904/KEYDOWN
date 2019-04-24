import React from "react";
import { connect } from "react-redux";

import PureCanvas from "./PureCanvas";
import "./index.css";
import { checkInGame, fetchPlayingSongData } from "../../actions";
import Note from "./Note";
import { noteData, noteData_1 } from "./noteData";
import { mainGame } from "./mainGame";

class Game extends React.Component {
  state = { unit: Math.round(window.innerWidth * 0.05) };

  componentDidMount() {
    this.props.fetchPlayingSongData(this.props.match.params.id, this.props.difficulty);
    this.props.checkInGame(true);

    // mainGame(this.state.unit);
  }
  componentWillUnmount() {
    this.props.checkInGame(false);
    clearInterval(this.startTimer);
  }

  stopGame = () => {
    this.props.checkInGame(false);
    console.log("----------inGame", this.props.inGame);
  };

  startGame = () => {
    let startTimer;
    const audio = new Audio(this.props.songToPlay.songURL);
    audio.play();
    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime === 1.190166) {
        console.log("timeupdate裡面的", audio.currentTime);
      } else {
        return;
      }
    });

    startTimer = setInterval(() => {
      this.update();
      window.addEventListener("click", () => {
        audio.pause();
        audio.currentTime = 0;
        this.time = 0;
        clearInterval(startTimer);
      });
    }, 1000 / 100);

    // setInterval(() => {
    //   console.log("audio.currentTime=====", audio.currentTime);
    // }, 10);

    window.addEventListener("keydown", () => {
      console.log("audio的currentTime-----", audio.currentTime);
    });
  };

  render() {
    console.log('Game props----',this.props);

    return (
      <div>
        <PureCanvas
          width={this.state.unit * 18}
          height={this.state.unit * 13}
        />
        <button onClick={this.stopGame}>stop</button>
        <button onClick={this.startGame}>start</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    difficulty: state.difficulty,
    inGame: state.inGame,
    playingSongData: state.playingSongData
  };
};

export default connect(
  mapStateToProps,
  { checkInGame, fetchPlayingSongData }
)(Game);
