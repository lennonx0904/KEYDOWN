import React from "react";

const CurrentRank = props => {
//   console.log("CurrentRank--props", props);

  const total = props.rankingData.totalNotes;
  const hit = props.rankingData.hitNotes;
  return (
    <>
      <div className="current-ranking">
        <div className="row">
          <div>TotalNotes</div>
          <div> {total}</div>
        </div>
        <div className="row">
          <div>HIT</div>
          <div> {hit}</div>
        </div>
        <div className="row">
          <div>MISS</div>
          <div> {total - hit}</div>
        </div>
        <div className="row">
          <div>SCORE</div>
          <div> {hit * 98}</div>
        </div>
        <div className="row">
          <div>ACCURATE</div>
          <div> {Math.round((hit / total) * 100)} %</div>
        </div>
        <div className="row">
          <div>RANK</div>
          <div>{props.rankingRule()}</div>
        </div>
      </div>
    </>
  );
};

export default CurrentRank;