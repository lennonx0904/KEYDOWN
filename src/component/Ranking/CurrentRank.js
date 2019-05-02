import React from "react";
import { rankingRule } from "../Game/helpers";

const CurrentRank = props => {
  const total = props.currentRanking.totalNotes;
  const hit =
    props.currentRanking.hitNotesA +
    props.currentRanking.hitNotesB +
    props.currentRanking.hitNotesC +
    props.currentRanking.hitNotesD;

  return (
    <>
      <div className="current-ranking">
        <div className="row">
          <div>TotalNotes</div>
          <div> {total}</div>
        </div>
        <div className="row">
          <div>HIT</div>
          <div>{hit}</div>
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
          <div>{rankingRule()}</div>
        </div>
      </div>
    </>
  );
};

export default CurrentRank;
