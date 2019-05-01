import React from "react";
import { connect } from "react-redux";

import {
  renderRankingData,
  storeRecordToDB,
  fetchRankingRecord
} from "../../actions/rankingActions";
import CurrentRank from "./CurrentRank";
import Record from "./Record";
import "./index.css";

class Ranking extends React.Component {
  state = {
    hasStored: false
  };

  componentDidMount() {
    if (localStorage.rankingData) {
      this.passRankingDataToStore();
    } else {
      window.location.hash = "#/";
    }
    // if (!this.state.hasStored) {
    //   this.storeRecord();
    // }
    const { match, location, fetchRankingRecord } = this.props;
    const difficulty = location.search.slice(1);
    if (difficulty !== "") {
      fetchRankingRecord(match.params.id, difficulty);
    }
  }

  componentWillUnmount() {
    localStorage.removeItem("rankingData");
  }

  passRankingDataToStore = () => {
    let rankingData = JSON.parse(localStorage.rankingData);
    const totalNotes = rankingData.totalNotes;
    const hitNotes =
      rankingData.hitNotesA +
      rankingData.hitNotesB +
      rankingData.hitNotesC +
      rankingData.hitNotesD;
    this.props.renderRankingData({ totalNotes, hitNotes });
  };

  rankingRule = () => {
    let rankingData = JSON.parse(localStorage.rankingData);
    const total = rankingData.totalNotes;
    const hit =
      rankingData.hitNotesA +
      rankingData.hitNotesB +
      rankingData.hitNotesC +
      rankingData.hitNotesD;
    let accurate = Math.round((hit / total) * 100);
    if (accurate >= 90) {
      return "A";
    } else if (accurate >= 80) {
      return "B";
    } else if (accurate >= 70) {
      return "C";
    } else if (accurate >= 60) {
      return "D";
    } else {
      return "E";
    }
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
      name: auth.name,
      rank: this.rankingRule(),
      score: hit * 98,
      time: time
    };
    console.log("data==Why NaN====", data);
    if (!data.name) {
      return;
    }
    storeRecordToDB(match.params.id, difficulty, data);
    this.setState({ hasStored: true });
  };


  render() {
    console.log("ranking Page props----", this.props);
    return (
      <div className="view">
        <div className="ranking-wrap">
          <CurrentRank
            rankingData={this.props.rankingData}
            rankingRule={this.rankingRule}
          />

          <div className="record">
            <div className="record-board title">
              <div className="record-item"> Name</div>
              <div className="record-item"> Score</div>
              <div className="record-item"> Rank</div>
              <div className="record-item"> Date</div>
            </div>
            <Record rankingRecord={this.props.rankingRecord.record} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("ranking---Store state", state);

  return {
    rankingData: state.rankingData,
    auth: state.auth,
    rankingRecord: state.rankingRecord
  };
};

export default connect(
  mapStateToProps,
  { renderRankingData, storeRecordToDB, fetchRankingRecord }
)(Ranking);
