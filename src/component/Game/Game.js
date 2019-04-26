import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router";

import PureCanvas from "./PureCanvas";
import "./index.css";
import { checkInGame, fetchPlayingSongData, writeData } from "../../actions";
import { mainGame } from "./mainGame";
import { drawReadyState } from "./drawReadyState";

// remember to remove state:startGame
class Game extends React.Component {
  state = { unit: Math.round(window.innerWidth * 0.045) };

  componentDidMount() {
    const { fetchPlayingSongData, inGame, match, difficulty } = this.props;
    if (difficulty !== "") {
      fetchPlayingSongData(match.params.id, difficulty);

      if (!inGame) {
        drawReadyState(this.state.unit);
        const canvas = document.querySelector("#myCanvas");
        canvas.addEventListener("click", () => {
          this.props.checkInGame(true);
        });
      }
    }
  }

  componentDidUpdate() {
    console.log("didupdate props", this.props);
    console.log("didupdate state", this.state);

    const { inGame, playingSongData } = this.props;
    if (inGame && playingSongData.beatData) {
      console.log("props.inGame----過去啦", inGame);
      playingSongData.audio.addEventListener('ended', ()=>{
        console.log('我在componentDidUpdate裡的監聽結束了');
        
      })
      this.stop = mainGame(
        this.state.unit,
        playingSongData.beatData,
        playingSongData.audio
      );
    }
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
    const { checkInGame, difficulty, inGame } = this.props;
    checkInGame(false);
    if (inGame && difficulty !== "") {
      this.stop();
    }
  }

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

  write = () => {
    let data = [];
    const makeRandom = () => {
      let num = Math.random();
      if (num < 0.65) {
        return 0;
      } else {
        return 1;
      }
    };
    for (let i = 0; i < 400; i++) {
      let newArr = [makeRandom(), makeRandom(), makeRandom(), makeRandom()];
      data.push(newArr);
    }
    this.props.writeData(JSON.stringify(data));
  };

  render() {
    console.log("Game props----", this.props);
    console.log("Game state----", this.state);
    if (this.props.difficulty === "") {
      console.log("Redirect");
      return <Redirect to="/select" />;
    }

    return (
      <div>
        <PureCanvas
          width={this.state.unit * 18}
          height={this.state.unit * 13}
        />
        <button onClick={this.write}>write</button>
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
  { checkInGame, fetchPlayingSongData, writeData }
)(Game);
