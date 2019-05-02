import React from "react";
import { connect } from "react-redux";

import { fetchRankingRecord } from "../../actions/rankingActions";
import CurrentRank from "./CurrentRank";
import Record from "./Record";
import "./ranking.css";

class Ranking extends React.Component {
  componentDidMount() {
    if (!localStorage.rankingData) {
      window.location.hash = "#/";
    }
    const { match, location, fetchRankingRecord } = this.props;
    const difficulty = location.search.slice(1);
    if (difficulty !== "") {
      fetchRankingRecord(match.params.id, difficulty);
    }
  }

  componentWillUnmount() {
    localStorage.removeItem("rankingData");
  }

  render() {
    // console.log("ranking Page props----", this.props);

    // if (localStorage.rankingData) {
    //   const rankingData = JSON.parse(localStorage.rankingData);
    //   const totalNotes = rankingData.totalNotes;
    //   const hitNotes =
    //     rankingData.hitNotesA +
    //     rankingData.hitNotesB +
    //     rankingData.hitNotesC +
    //     rankingData.hitNotesD;
    // }

    return (
      <div className="ranking-view">
        <div className="ranking-wrap">
          {localStorage.rankingData ? (
            <CurrentRank currentRanking={JSON.parse(localStorage.rankingData)} />
          ) : null}

          <div className="record">
            <div className="record-board title">
              <div className="record-item"> Name</div>
              <div className="record-item"> Score</div>
              <div className="record-item"> Rank</div>
              <div className="record-item"> Date</div>
            </div>
            <Record rankingRecord={this.props.ranking.record} />
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
    ranking: state.ranking
  };
};

export default connect(
  mapStateToProps,
  { fetchRankingRecord }
)(Ranking);
