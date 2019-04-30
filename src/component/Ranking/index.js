import React from "react";
import { connect } from "react-redux";

import {
  renderRankingData,
  storeRecordToDB,
  fetchRankingDataFromSong
} from "../../actions/rankingActions";
import "./index.css";

class Ranking extends React.Component {
  componentDidMount() {
    const { difficulty, match, fetchRankingDataFromSong } = this.props;
    if (this.props.difficulty !== "") {
      this.storeRecord();
      fetchRankingDataFromSong(match.params.id, difficulty);
    }
    this.passRankingDataToStore();
    // hard code 記得改回來
    // fetchRankingDataFromSong(match.params.id, "easy");
  }

  passRankingDataToStore = () => {
    let data = JSON.parse(localStorage.rankingData);
    const totalNotes = data.totalNotes;
    const hitNotes =
      data.hitNotesA + data.hitNotesB + data.hitNotesC + data.hitNotesD;
    this.props.renderRankingData({ totalNotes, hitNotes });
  };


  storeRecord = () => {
    // console.log('storeRecord==props', this.props);
    const { difficulty, match, storeRecordToDB, rankingData, auth } = this.props;
    console.log("why nan rankingData.hitNotes---", rankingData.hitNotes);

    console.log(difficulty, match.params.id, rankingData, auth.name);
    const date = new Date();
    const time = `${date.getFullYear()}/${date.getMonth() +
      1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;
    console.log(time);
    const data = {
      name: auth.name,
      rank: "B",
      score: rankingData.hitNotes * 100,
      time: time
    };
    console.log("data==Why NaN====", data);

    // storeRecordToDB(match.params.id, difficulty, data);
  };

  renderRecordfromSong = () => {
    return this.props.rankingRecord.dataFromSong.map(data => {
      return (
        <div className="record-board" key={data.time}>
          <div className="record-item"> {data.name}</div>
          <div className="record-item"> {data.score}</div>
          <div className="record-item"> {data.rank}</div>
          <div className="record-item"> {data.time}</div>
        </div>
      );
    });
  };

  render() {
    console.log("ranking Page props----", this.props);
    // const { difficulty, match} = this.props;

    const total = this.props.rankingData.totalNotes;
    const hit = this.props.rankingData.hitNotes;
    return (
      <div className="view">
        <div className="ranking-wrap">
          <div className="current-ranking">
            <div>TotalNotes: {total}</div>
            <div>HIT: {hit}</div>
            <div>MISS: {total - hit}</div>
            <div>SCORE: {hit * 100}</div>
            <div>{Math.round((hit / total) * 100)} %</div>
            <div>RANK: A</div>
          </div>

          <div className="record">
            <div>RECORD</div>
            <div className="record-board title">
              <div className="record-item"> Name</div>
              <div className="record-item"> Score</div>
              <div className="record-item"> Rank</div>
              <div className="record-item"> Date</div>
            </div>
            {this.renderRecordfromSong()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  // console.log("ranking---Store state", state);

  return {
    rankingData: state.rankingData,
    difficulty: state.difficulty,
    auth: state.auth,
    rankingRecord: state.rankingRecord
  };
};

export default connect(
  mapStateToProps,
  { renderRankingData, storeRecordToDB, fetchRankingDataFromSong }
)(Ranking);
