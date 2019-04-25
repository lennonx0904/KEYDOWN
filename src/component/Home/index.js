import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./index.css";

class Home extends React.Component {
  componentDidMount() {
    console.log("home page ---", this.props);
    const { playingSongData, match } = this.props;
    if (playingSongData.audio && match.path !== "/game/:id") {
      playingSongData.audio.pause();
      playingSongData.audio.currentTime = 0;
    }
  }
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

const mapStateToProps = state => {
  return {
    playingSongData: state.playingSongData
  };
};

export default connect(mapStateToProps)(Home);
