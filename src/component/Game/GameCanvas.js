import React from "react";

class GameCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas
        id="game-canvas"
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default GameCanvas;
