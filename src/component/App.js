import React, { Component } from "react";
import { HashRouter, Route } from "react-router-dom";

import Nav from "./Nav/Nav";
import AuthForm from "./AuthForm/AuthForm";
import Home from "./Home";
import SelectSong from "./SelectSong/SelectSong";
import Game from "./Game/Game";
import Ranking from "./Ranking/Ranking";

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Nav />
        <AuthForm />
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/select" component={SelectSong} />
          <Route path="/game/:id" component={Game} />
          <Route path="/ranking/:id" component={Ranking} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
