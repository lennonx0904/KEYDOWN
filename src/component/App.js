import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Nav from "./Nav";
import AuthForm from "./AuthForm";
import Home from "./Home";
import SelectSong from "./SelectSong";
import Game from "./Game/Game";
// import Game from './Game'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Nav />
        <AuthForm />
        <div>
          <Route path="/" exact component={Home} />
          <Route path="/select" component={SelectSong} />
          <Route path="/game/:id" component={Game} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
