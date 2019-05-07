import React from "react";
import { rankingCounter } from "../Game/helpers";

const CurrentRank = props => {
  return (
    <>
      <div className="current-ranking">
        <div className="current-ranking-row">
          <div>TotalNotes</div>
          <div> {rankingCounter().total}</div>
        </div>
        <div className="current-ranking-row">
          <div>HIT</div>
          <div> {rankingCounter().hit}</div>
        </div>
        <div className="current-ranking-row">
          <div>MISS</div>
          <div> {rankingCounter().miss}</div>
        </div>
        <div className="current-ranking-row">
          <div>SCORE</div>
          <div> {rankingCounter().score}</div>
        </div>
        <div className="current-ranking-row">
          <div>ACCURATE</div>
          <div> {rankingCounter().accurate} %</div>
        </div>
        <div className="current-ranking-row">
          <div>RANK</div>
          <div> {rankingCounter().rank}</div>
        </div>
      </div>
    </>
  );
};

export default CurrentRank;
