import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./home.css";

class Home extends React.Component {
  render() {
    return (
      <div className="banner">
        <div className="enter-wrap">
          <div className="enter-btn">
            <Link to="/select">Enter Game</Link>
          </div>
        </div>
      </div>
    );
  }
}

// 記得刪掉 mapStateToProps
const mapStateToProps = state => {
  console.log("home--state---", state);

  return {
    playingSongData: state.playingSongData
  };
};

export default connect(mapStateToProps)(Home);
