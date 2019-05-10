import React from "react";
import { getRankingData } from "../Game/helpers";

const CurrentRank = props => {
  return (
    <>
      <div className="current-ranking">
        <div className="current-ranking-row">
          <div>TotalNotes</div>
          <div> {getRankingData().total}</div>
        </div>
        <div className="current-ranking-row">
          <div>HIT</div>
          <div> {getRankingData().hit}</div>
        </div>
        <div className="current-ranking-row">
          <div>MISS</div>
          <div> {getRankingData().miss}</div>
        </div>
        <div className="current-ranking-row">
          <div>SCORE</div>
          <div> {getRankingData().score}</div>
        </div>
        <div className="current-ranking-row">
          <div>ACCURATE</div>
          <div> {getRankingData().accurate} %</div>
        </div>
        <div className="current-ranking-row">
          <div>RANK</div>
          <div> {getRankingData().rank}</div>
        </div>
      </div>
    </>
  );
};

export default CurrentRank;
