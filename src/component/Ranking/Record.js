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
        {this.props.rankingRecord.map(record => {
          return (
            <div className="record-board" key={record.id}>
              <div className="record-item"> {record.data.name}</div>
              <div className="record-item"> {record.data.score}</div>
              <div className="record-item"> {record.data.rank}</div>
              <div className="record-item"> {record.data.time}</div>
            </div>
          );
        })}
      </>
    );
  }
}
export default Record;
