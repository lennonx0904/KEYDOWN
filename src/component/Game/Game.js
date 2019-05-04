import React from "react";
import { connect } from "react-redux";

import PureCanvas from "./PureCanvas";
import "./game.css";
import {
  setInGameState,
  fetchPlayingSongData,
  setGameOverState,
  storeRecordToDB
} from "../../actions/gameActions";
import { fetchRankingRecord } from "../../actions/rankingActions";
import { writeData } from "../../actions";
import { mainGame } from "./mainGame";
import { drawReadyState, drawFinishState, rankingRule } from "./helpers";
import BestRecord from "./BestRecord";
import CurrentSocre from "./CurrentSocre";

class Game extends React.Component {
  state = { unit: 0 };
  componentWillMount() {
    this.setCanvasSize();
  }
  componentDidMount() {
    const {
      match,
      location,
      fetchPlayingSongData,
      setInGameState,
      fetchRankingRecord
    } = this.props;
    const difficulty = location.search.slice(1);
    fetchPlayingSongData(match.params.id, difficulty);
    fetchRankingRecord(match.params.id, difficulty);
    const canvas = document.querySelector(".player-canvas");
    const startGame = () => {
      setInGameState(true);
      canvas.removeEventListener("click", startGame);
      return false;
    };
    drawReadyState(this.state.unit);
    canvas.addEventListener("click", startGame);
  }

  componentDidUpdate() {
    // console.log("didupdate props", this.props);
    // console.log("didupdate state", this.state);
    // console.log("componentDidUpdate");

    const { game, match, location, setGameOverState, auth } = this.props;
    console.log("componentDidUpdate inGame", game.inGame);
    const difficulty = location.search.slice(1);
    if (game.inGame && game.playingSongData && !game.gameOver) {
      const rankingData = {
        name: auth.name,
        totalNotes: 0,
        hitNotesA: 0,
        hitNotesB: 0,
        hitNotesC: 0,
        hitNotesD: 0
      };
      localStorage.setItem("rankingData", JSON.stringify(rankingData));
      this.stopGame = mainGame(
        this.state.unit,
        game.playingSongData.beatData,
        game.playingSongData.audio,
        difficulty,
        match
      );
      let audio = game.playingSongData.audio;
      audio.addEventListener("ended", () => {
        this.stopGame();
        setGameOverState(true);
        drawFinishState(this.state.unit);
        this.storeRecord();
        const canvas = document.querySelector(".player-canvas");
        canvas.addEventListener("click", () => {
          window.location.hash = `#/ranking/${match.params.id}${
            location.search
          }`;
        });
      });
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    const { setInGameState, setGameOverState, game } = this.props;
    setInGameState(false);
    setGameOverState(false);
    // make sure this.stop won't be undefined
    // 使用者未開始遊戲就跳轉頁面會讓 this.stop == undefined
    if (game.inGame) {
      this.stopGame();
    }
  }

  setCanvasSize = () => {
    console.log("measureCanvasSize", window.innerWidth);
    let unit;
    if (window.innerWidth > 1024) {
      unit = Math.round(window.innerWidth * 0.022);
    } else if (window.innerWidth > 720) {
      unit = Math.round(window.innerWidth * 0.033);
    } else {
      unit = Math.round(window.innerWidth * 0.04);
    }
    console.log("measureCanvasSize", unit);

    this.setState({ unit: unit });
  };

  storeRecord = () => {
    if (!localStorage.rankingData) {
      return;
    }
    const { match, location, storeRecordToDB, auth } = this.props;
    const difficulty = location.search.slice(1);
    console.log(difficulty, match.params.id, auth.name);
    const rankingData = JSON.parse(localStorage.rankingData);
    const hit =
      rankingData.hitNotesA +
      rankingData.hitNotesB +
      rankingData.hitNotesC +
      rankingData.hitNotesD;
    const date = new Date();
    const time = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const data = {
      name: rankingData.name,
      rank: rankingRule(),
      score: hit * 98,
      time: time
    };
    if (!data.name) {
      return;
    }
    // storeRecordToDB(match.params.id, difficulty, data);
  };

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
    console.log("Game props----", this.props);
    const unit = this.state.unit;
    const style = {
      margin: `${unit * 13 + 31}px 0 0 0`,
      width: `${unit * 18 + 1}px`
    };
    return (
      <div className="game-view">
        <div className="game-wrap">
          <div className="battle">
            <BestRecord record={this.props.ranking.record} />
            <CurrentSocre />
          </div>
          <div className="canvas-wrap">
            <PureCanvas width={unit * 18} height={unit * 13} />
            <canvas
              className="player-canvas"
              width={unit * 18}
              height={unit * 13}
            />
          </div>

          <div className="game-buttons" style={style}>
            <div className="game-btn btn-d">D</div>
            <div className="game-btn btn-f">F</div>
            <div className="game-btn btn-k">K</div>
            <div className="game-btn btn-l">L</div>
          </div>
        </div>

        {/* <div>
          <button onClick={this.write}>write</button>
          <button onClick={this.checkAudioandGame}>start</button>
          <Link
            to={`/ranking/${this.props.match.params.id}${
              this.props.location.search
            }`}
          >
            ranking
          </Link>
        </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    game: state.game,
    auth: state.auth,
    ranking: state.ranking
  };
};

export default connect(
  mapStateToProps,
  {
    setInGameState,
    fetchPlayingSongData,
    setGameOverState,
    storeRecordToDB,
    fetchRankingRecord,
    writeData
  }
)(Game);
