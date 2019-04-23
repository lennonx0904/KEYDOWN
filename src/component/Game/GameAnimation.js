import React from "react";
import Game from "./Game";

class GameAnimation extends React.Component {
  constructor(props) {
    super(props);
    this.state = { unit: window.innerWidth * 0.05};
    this.updateAnimationState = this.updateAnimationState.bind(this);
  }

  componentDidMount() {
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  updateAnimationState() {
    // this.setState(prevState => ({ angle: prevState.angle + 1 }));
    this.rAF = requestAnimationFrame(this.updateAnimationState);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rAF);
  }

  render() {
    console.log(this.state.unit);

    return <Game unit={this.state.unit} />;
  }
}

export default GameAnimation;
