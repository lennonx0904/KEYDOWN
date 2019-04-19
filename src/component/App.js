import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

import Nav from "./Nav";
import AuthForm from "./AuthForm";
import Home from "./Home";

const firebaseConfig = {
  apiKey: "AIzaSyBpuiUbM6r9pKhzKP6xHSSaANIEe_rwPrc",
  authDomain: "keyboard-game-64e45.firebaseapp.com",
  databaseURL: "https://keyboard-game-64e45.firebaseio.com",
  projectId: "keyboard-game-64e45",
  storageBucket: "keyboard-game-64e45.appspot.com",
  messagingSenderId: "697558300831"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Nav />
          <AuthForm />
          <div>
            <Route path="/" exact component={Home} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
