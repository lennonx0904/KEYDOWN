import React from "react";

const BestRecord = props => {
  return (
    <div className="battle-board">
      Best Record
      {props.record.slice(0, 1).map(record => {
        return (
          <div className="score-in-board" key={record.id}>
            {record.data.score}
          </div>
        );
      })}
    </div>
  );
};

export default BestRecord;
