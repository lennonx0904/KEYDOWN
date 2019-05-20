import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

class Home extends React.Component {
  componentDidMount() {
    console.log("HOME--", this.props);
  }
  render() {
    return (
      <>
        <div className="banner">
          <div className="enter-wrap">
            <div className="enter-btn">
              <Link to="/select">Enter Game</Link>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
