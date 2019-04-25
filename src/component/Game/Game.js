import React from "react";
import { connect } from "react-redux";

import PureCanvas from "./PureCanvas";
import "./index.css";
import { checkInGame, fetchPlayingSongData } from "../../actions";
import Note from "./Note";
import { noteData, noteData_1 } from "./noteData";
import { mainGame } from "./mainGame";
import { drawReadyState } from "./drawReadyState";

class Game extends React.Component {
  state = { unit: Math.round(window.innerWidth * 0.045), startGame: false };

  componentDidMount() {
    this.props.fetchPlayingSongData(
      this.props.match.params.id,
      this.props.difficulty
    );

    if (!this.props.inGame) {
      drawReadyState(this.state.unit);
      const canvas = document.querySelector("#myCanvas");
      canvas.addEventListener("click", () => {
        this.props.checkInGame(true);
        // this.setState({ startGame: true });
      });
    }
  }

  componentDidUpdate(props, state) {
    console.log("didupdate props", props);
    console.log("didupdate state", state);
    if (props.inGame) {
      console.log("props.inGame----過去啦", props.inGame);
      // mainGame(this.state.unit);
    }
  }
  componentWillUnmount() {
    // window.removeEventListener("keydown", () => {
    //   this.props.checkInGame(true);
    // });
  }

  stopGame = () => {
    const audio = this.props.playingSongData.audio;
    audio.pause();
    this.props.checkInGame(false);
  };

  startGame = () => {
    let startTimer;
    const audio = new Audio(this.props.playingSongData.songURL);
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

  checkAudioandGame = () => {
    const audio = this.props.playingSongData.audio;
    audio.play();

    console.log("第一次 audio", audio.currentTime);

    // setTimeout(() => {
    //   // console.log("readyState", audio.readyState);
    //   console.log("duration", audio.duration);
    //   console.log("currentTime", audio.currentTime);
    //   console.log("audioCtx", audioCtx.currentTime);
    // }, 4000);

    let timer = setInterval(() => {
      console.log("currentTime", audio.currentTime);
    }, 1000 / 100);

    audio.addEventListener("ended", () => {
      console.log("end-currentTime----", audio.currentTime);
      console.log("結束了");
      clearInterval(timer);
    });

    audio.addEventListener("pause", () => {
      clearInterval(timer);
    });

    audio.addEventListener("timeupdate", () => {
      if (audio.currentTime.toFixed(2) === "3.23") {
        console.log("timeupdate裡的----", audio.currentTime);
      }
    });
  };

  render() {
    console.log("Game props----", this.props);
    console.log("Game state----", this.state);

    return (
      <div>
        <PureCanvas
          width={this.state.unit * 18}
          height={this.state.unit * 13}
        />

        <button onClick={this.stopGame}>stop</button>
        <button onClick={this.checkAudioandGame}>start</button>
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
