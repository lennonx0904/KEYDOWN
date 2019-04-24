import React from "react";

class PureCanvas extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <canvas
        id="myCanvas"
        width={this.props.width}
        height={this.props.height}
        // ref={node =>
        //   node ? this.props.contextRef(node.getContext("2d")) : null
        // }
      />
    );
  }
}

export default PureCanvas;
