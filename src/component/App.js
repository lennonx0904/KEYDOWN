import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Nav from "./Nav";
import AuthForm from "./AuthForm";
import Home from "./Home";
import SelectSong from "./SelectSong";
import GameAnimation from "./Game/GameAnimation";
import Animation from './Animation/Animation';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />
        <AuthForm />
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/select" component={SelectSong} />
          <Route path="/game" component={GameAnimation} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
