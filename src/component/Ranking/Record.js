import React from "react";

class Record extends React.Component {
  render() {
    console.log(
      "Record Component props.rankingRecord--",
      this.props.rankingRecord
    );
    // const data = this.props.rankingRecord;
    return (
      <>
        {this.props.rankingRecord.map(data => {
          return (
            <div className="record-board" key={data.time}>
              <div className="record-item"> {data.name}</div>
              <div className="record-item"> {data.score}</div>
              <div className="record-item"> {data.rank}</div>
              <div className="record-item"> {data.time}</div>
            </div>
          );
        })}
      </>
    );
  }
}
export default Record;
