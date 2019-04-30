import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";

import PureCanvas from "./PureCanvas";
import "./index.css";
import { checkInGame, fetchPlayingSongData, writeData } from "../../actions";
import { mainGame } from "./mainGame";
import { drawReadyState } from "./helpers";

class Game extends React.Component {
  state = { unit: Math.round(window.innerWidth * 0.033) };

  componentDidMount() {
    const { fetchPlayingSongData, inGame, match, location } = this.props;
    const difficulty = location.search.slice(1);
    console.log("location.search", difficulty);

    if (difficulty !== "") {
      fetchPlayingSongData(match.params.id, difficulty);
      if (!inGame) {
        drawReadyState(this.state.unit);
        const canvas = document.querySelector(".player-canvas");
        canvas.addEventListener("click", () => {
          this.props.checkInGame(true);
        });
      }
    }
  }

  componentDidUpdate() {
    console.log("didupdate props", this.props);
    console.log("didupdate state", this.state);
    const { inGame, playingSongData, match, location } = this.props;
    const difficulty = location.search.slice(1);

    if (inGame && playingSongData.beatData) {
      let rankingData = {
        totalNotes: 0,
        hitNotesA: 0,
        hitNotesB: 0,
        hitNotesC: 0,
        hitNotesD: 0
      };
      localStorage.setItem("rankingData", JSON.stringify(rankingData));
      this.stop = mainGame(
        this.state.unit,
        playingSongData.beatData,
        playingSongData.audio,
        difficulty,
        match
      );
      let audio = playingSongData.audio;
      audio.addEventListener("ended", () => {
      
          window.location.hash = `#/ranking/${match.params.id}${
            location.search
          }`;
        
      });
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    const { checkInGame, difficulty, inGame } = this.props;
    checkInGame(false);
    // make sure this.stop won't be undefined
    // 1. 使用者未開始遊戲 2.未選取歌曲的 Redirect 會讓 this.stop == undefined
    if (inGame && difficulty !== "") {
      this.stop();
    }
  }

  checkAudioandGame = () => {
    const audio = this.props.playingSongData.audio;
    audio.play();

    console.log("第一次 audio", audio.currentTime);

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
    // console.log("Game props----", this.props);
    // console.log("Game state----", this.state);
    if (this.props.difficulty === "") {
      console.log("Redirect");
      return <Redirect to="/select" />;
    }
    const style = {
      margin: `${this.state.unit * 13 + 7}px 0 0 0`,
      width: `${this.state.unit * 18 + 1}px`
    };

    return (
      <div className="view">
        <div className="game-wrap">
          <div className="canvas-wrap">
            <PureCanvas
              width={this.state.unit * 18}
              height={this.state.unit * 13}
            />
            <canvas
              className="player-canvas"
              width={this.state.unit * 18}
              height={this.state.unit * 13}
            />
          </div>

          <div className="game-buttons" style={style}>
            <div className="game-btn btn-d">D</div>
            <div className="game-btn btn-f">F</div>
            <div className="game-btn btn-k">K</div>
            <div className="game-btn btn-l">L</div>
          </div>
        </div>
        <div>
          {/* <button onClick={this.write}>write</button>
          <button onClick={this.checkAudioandGame}>start</button> */}
          <Link
            to={`/ranking/${this.props.match.params.id}${
              this.props.location.search
            }`}
          >
            ranking
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    // difficulty: state.difficulty,
    inGame: state.inGame,
    playingSongData: state.playingSongData
  };
};

export default connect(
  mapStateToProps,
  { checkInGame, fetchPlayingSongData, writeData }
)(Game);
