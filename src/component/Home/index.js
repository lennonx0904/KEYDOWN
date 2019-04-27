import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { checkInGame } from "../../actions";
import "./index.css";

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

const mapStateToProps = state => {
  console.log('home--state---',state);
  
  return {
    playingSongData: state.playingSongData,
  };
};

export default connect(
  mapStateToProps,
  { checkInGame }
)(Home);
