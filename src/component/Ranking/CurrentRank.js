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
        <div className="current-ranking-row">
          <div>TotalNotes</div>
          <div> {total}</div>
        </div>
        <div className="current-ranking-row">
          <div>HIT</div>
          <div>{hit}</div>
        </div>
        <div className="current-ranking-row">
          <div>MISS</div>
          <div> {total - hit}</div>
        </div>
        <div className="current-ranking-row">
          <div>SCORE</div>
          <div> {hit * 98}</div>
        </div>
        <div className="current-ranking-row">
          <div>ACCURATE</div>
          <div> {Math.round((hit / total) * 100)} %</div>
        </div>
        <div className="current-ranking-row">
          <div>RANK</div>
          <div>{rankingRule()}</div>
        </div>
      </div>
    </>
  );
};

export default CurrentRank;
