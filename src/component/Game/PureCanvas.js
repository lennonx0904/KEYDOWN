import React from "react";

class PureCanvas extends React.Component {
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

export default PureCanvas;
