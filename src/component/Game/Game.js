import React from "react";
import { connect } from "react-redux";

import GameCanvas from "./GameCanvas";
import PlayerCanvas from "./PlayerCanvas";
import BestRecord from "./BestRecord";
import CurrentSocre from "./CurrentSocre";
import {
  setInGameState,
  fetchPlayingSongData,
  setGameFinishState,
  storeRecordToDB
} from "../../actions/gameActions";
import { fetchRankingRecord } from "../../actions/rankingActions";
import { mainGame } from "./mainGame";
import {
  drawReadyState,
  drawComingSoon,
  drawFinishState,
  getRankingData
} from "./helpers";
import "./game.css";

class Game extends React.Component {
  state = { unit: 0 };
  getCanvas = React.createRef();

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
    const docId = match.params.id;
    const difficulty = location.search.slice(1);
    fetchPlayingSongData(docId, difficulty);
    fetchRankingRecord(docId, difficulty);
    drawReadyState(this.state.unit);
    // limit player can only click once
    const startGame = () => {
      setInGameState(true);
      this.getCanvas.current.removeEventListener("click", startGame);
      return false;
    };
    this.getCanvas.current.addEventListener("click", startGame);
  }

  componentDidUpdate() {
    
    const { game, match, location, setGameFinishState, auth } = this.props;
    const docId = match.params.id;
    const difficulty = location.search.slice(1);
    if (game.playingSongData === "error") {
      drawComingSoon(this.state.unit);
    }
    if (game.inGame && game.playingSongData.audio && !game.gameFinish) {
      console.log("ingmae 以後", game.playingSongData.offset);

      const rankingData = {
        name: auth.name,
        total: 0,
        hit: 0,
        miss: 0,
        combo: 0,
        score: 0,
      };
      localStorage.setItem("rankingData", JSON.stringify(rankingData));
      // start game
      // this.stopGame use the closure in mainGame to clearInterval

      this.stopGame = mainGame(
        this.state.unit,
        game.playingSongData.beatData,
        game.playingSongData.audio,
        game.playingSongData.offset,
        difficulty
      );
      const audio = game.playingSongData.audio;
      audio.addEventListener("ended", () => {
        const currentSocre = getRankingData().score;
        this.stopGame();
        setGameFinishState(true);
        drawFinishState(this.state.unit, currentSocre);
        this.storeRecord(docId, difficulty);
        this.getCanvas.current.addEventListener("click", () => {
          window.location.hash = `#/ranking/${match.params.id}${
            location.search
          }`;
        });
      });
    }
  }

  componentWillUnmount() {
    const { setInGameState, setGameFinishState, game } = this.props;
    setInGameState(false);
    setGameFinishState(false);
    // make sure this.stopGame won't be undefined
    // 使用者未開始遊戲或沒有遊戲資訊的跳轉頁面
    if (game.inGame && game.playingSongData !== "error") {
      this.stopGame();
    }
  }

  setCanvasSize = () => {
    let unit;
    if (window.innerWidth > 1024) {
      unit = Math.round(window.innerWidth * 0.022);
    } else if (window.innerWidth > 720) {
      unit = Math.round(window.innerWidth * 0.033);
    } else {
      unit = Math.round(window.innerWidth * 0.04);
    }
    this.setState({ unit });
  };

  storeRecord = (docId, difficulty) => {
    if (!localStorage.rankingData || !getRankingData().name) return;
    const addZero = number => {
      if (number < 10) {
        return `0${number}`;
      } else {
        return number;
      }
    };
    const date = new Date();
    const time = `${date.getFullYear()}/${addZero(
      date.getMonth() + 1
    )}/${addZero(date.getDate())} ${addZero(date.getHours())}:${addZero(
      date.getMinutes()
    )}`;
    const data = {
      name: getRankingData().name,
      rank: getRankingData().rank,
      score: getRankingData().score,
      time: time
    };
    console.log("docId", docId);
    console.log("difficulty", difficulty);
    console.log("data", data);

    // storeRecordToDB(docId, difficulty, data);
  };

  render() {
    const unit = this.state.unit;
    const btnStyle = {
      margin: `${unit * 13 + 31}px 0 0 0`,
      width: `${unit * 18 + 1}px`
    };
    const { game, ranking } = this.props;
    // console.log(game.playingSongData === null);

    return (
      <div className="game-view">
        <div className="game-wrap">
          <div className="battle">
            <BestRecord record={ranking.record} />
            <CurrentSocre />
          </div>
          <div className="canvas-wrap">
            <GameCanvas width={unit * 18} height={unit * 13} />
            <PlayerCanvas
              width={unit * 18}
              height={unit * 13}
              getCanvas={this.getCanvas}
            />
          </div>
          <div className="game-buttons" style={btnStyle}>
            <div className="game-btn btn-d">D</div>
            <div className="game-btn btn-f">F</div>
            <div className="game-btn btn-k">K</div>
            <div className="game-btn btn-l">L</div>
          </div>
        </div>
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
    setGameFinishState,
    storeRecordToDB,
    fetchRankingRecord
  }
)(Game);
