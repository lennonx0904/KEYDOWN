import React from "react";
import './mainGame';

class Game extends React.Component {
    componentDidMount() {
        const canvas = this.refs.canvas
        const ctx = this.refs.canvas.getContext("2d")
        const img = this.refs.image
      }
  render() {
    return <canvas id="myCanvas"></canvas>;
  }
}



export default Game;
