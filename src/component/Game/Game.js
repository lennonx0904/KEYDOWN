import React from "react";
import { connect } from "react-redux";

import PureCanvas from "./PureCanvas";
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
  rankingRule
} from "./helpers";
import "./game.css";

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
    drawReadyState(this.state.unit);
    // limit player can only click once
    const canvas = document.querySelector(".player-canvas");
    const startGame = () => {
      setInGameState(true);
      canvas.removeEventListener("click", startGame);
      return false;
    };
    canvas.addEventListener("click", startGame);
  }

  componentDidUpdate() {
    const { game, match, location, setGameFinishState, auth } = this.props;
    const difficulty = location.search.slice(1);
    if (!game.playingSongData) {
      drawComingSoon(this.state.unit);
    }
    if (game.inGame && game.playingSongData && !game.gameFinish) {
      const rankingData = {
        name: auth.name,
        totalNotes: 0,
        hitNotesA: 0,
        hitNotesB: 0,
        hitNotesC: 0,
        hitNotesD: 0
      };
      localStorage.setItem("rankingData", JSON.stringify(rankingData));
      // start game
      // this.stopGame using the closure in mainGame to clearInterval
      this.stopGame = mainGame(
        this.state.unit,
        game.playingSongData.beatData,
        game.playingSongData.audio,
        difficulty
      );
      const audio = game.playingSongData.audio;
      audio.addEventListener("ended", () => {
        const currentSocre = this.countCurrentScore();
        this.stopGame();
        setGameFinishState(true);
        drawFinishState(this.state.unit, currentSocre);
        this.storeRecord(currentSocre);
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
    const { setInGameState, setGameFinishState, game } = this.props;
    setInGameState(false);
    setGameFinishState(false);
    // make sure this.stopGame won't be undefined
    // 使用者未開始遊戲或沒有遊戲資訊的跳轉頁面
    if (game.inGame && game.playingSongData) {
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

  countCurrentScore = () => {
    const rankingData = JSON.parse(localStorage.rankingData);
    const currentScore =
      (rankingData.hitNotesA +
        rankingData.hitNotesB +
        rankingData.hitNotesC +
        rankingData.hitNotesD) *
      98;
    return currentScore;
  };

  storeRecord = currentSocre => {
    if (!localStorage.rankingData) {
      return;
    }
    const { match, location, storeRecordToDB } = this.props;
    const difficulty = location.search.slice(1);
    const rankingData = JSON.parse(localStorage.rankingData);
    const date = new Date();
    const time = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    const data = {
      name: rankingData.name,
      rank: rankingRule(),
      score: currentSocre,
      time: time
    };
    if (!data.name) {
      return;
    }
    storeRecordToDB(match.params.id, difficulty, data);
  };

  render() {
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
