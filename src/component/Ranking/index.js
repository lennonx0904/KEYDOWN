import React from "react";
import { connect } from "react-redux";

import { renderRankingData } from "../../actions";
import "./index.css";

class Ranking extends React.Component {
  componentDidMount() {
    let data = JSON.parse(localStorage.rankingData);
    const totalNotes = data.totalNotes;
    const hitNotes =
      data.hitNotesA + data.hitNotesB + data.hitNotesC + data.hitNotesD;
    this.props.renderRankingData({ totalNotes, hitNotes });
  }

  passRankingDataToStore = () => {
    let data = JSON.parse(localStorage.rankingData);
    const totalNotes = data.totalNotes;
    const hitNotes =
      data.hitNotesA + data.hitNotesB + data.hitNotesC + data.hitNotesD;
    this.props.renderRankingData({ totalNotes, hitNotes });
  };

  render() {
    console.log("ranking Page props----", this.props);
    const { rankingData } = this.props;
    return (
      <div>
        <div>TOTALNOTAE: {rankingData.totalNotes}</div>
        <div>HIT: {rankingData.hitNotes}</div>
        <div>MISS: {rankingData.totalNotes - rankingData.hitNotes}</div>
        <div>SCORE: {rankingData.hitNotes * 100}</div>
        <div>RANGE: A</div>
        <button onClick={this.passRankingDataToStore}>test</button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  console.log("ranking---Store state", state);

  return {
    rankingData: state.rankingData
  };
};

export default connect(
  mapStateToProps,
  { renderRankingData }
)(Ranking);
