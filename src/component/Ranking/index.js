import React from "react";
import { connect } from "react-redux";

import {
  renderRankingData,
  storeRecord,
  fetchRankingDataFromSong
} from "../../actions/rankingActions";
import "./index.css";

class Ranking extends React.Component {
  componentDidMount() {
    this.passRankingDataToStore();
    const { difficulty, match, fetchRankingDataFromSong } = this.props;
    fetchRankingDataFromSong(match.params.id, difficulty);
  }

  passRankingDataToStore = () => {
    let data = JSON.parse(localStorage.rankingData);
    const totalNotes = data.totalNotes;
    const hitNotes =
      data.hitNotesA + data.hitNotesB + data.hitNotesC + data.hitNotesD;
    this.props.renderRankingData({ totalNotes, hitNotes });
  };

  renderPlayerRankingData = () => {
    // 之後用
    const { difficulty, match, fetchRankingDataFromSong } = this.props;
    fetchRankingDataFromSong(match.params.id, difficulty);
  };

  storeRecord = () => {
    // console.log('storeRecord==props', this.props);
    const { difficulty, match, storeRecord, rankingData, auth } = this.props;
    console.log(difficulty, match.params.id, rankingData, auth.name);
    // const level = difficulty;
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
    // date= 2019/4/22 ,name,rank,score
    storeRecord(match.params.id, difficulty, data);
  };

  renderRecordfromSong= ()=> {
    return(
      this.props.rankingRecord.dataFromSong.map(data => {
        return (
          <div key={data.time}>
            <span> NAME : {data.name}</span>
            <span> SCORE : {data.score}</span>
            <span> RANK : {data.rank}</span>
            <span> DATE : {data.time}</span>
          </div>
        )
      })
    );
  };

  render() {
    console.log("ranking Page props----", this.props);
    // const { difficulty, match} = this.props;

    const total = this.props.rankingData.totalNotes;
    const hit = this.props.rankingData.hitNotes;
    return (
      <div>
        <div>
          <div>TOTALNOTAE: {total}</div>
          <div>HIT: {hit}</div>
          <div>MISS: {total - hit}</div>
          <div>SCORE: {hit * 100}</div>
          <div>{Math.round((hit / total) * 100)} %</div>
          <div>RANK: A</div>
        </div>
        <div>
          <p>Do you want to store the record?</p>
          <button onClick={this.storeRecord}>YES</button>
          {/* <button onClick={this.renderPlayerRankingData}>test</button> */}
        </div>
        <div className='recordfromSong'>
        <div>RECORD</div>
          {this.renderRecordfromSong()}
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
  { renderRankingData, storeRecord, fetchRankingDataFromSong }
)(Ranking);
