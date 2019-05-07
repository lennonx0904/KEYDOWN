import React from "react";

class PlayerCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas
        ref={this.props.getCanvas}
        id="player-canvas"
        width={this.props.width}
        height={this.props.height}
      />
    );
  }
}

export default PlayerCanvas;
