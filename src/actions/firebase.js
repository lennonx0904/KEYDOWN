import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpuiUbM6r9pKhzKP6xHSSaANIEe_rwPrc",
  authDomain: "keyboard-game-64e45.firebaseapp.com",
  databaseURL: "https://keyboard-game-64e45.firebaseio.com",
  projectId: "keyboard-game-64e45",
  storageBucket: "keyboard-game-64e45.appspot.com",
  messagingSenderId: "697558300831"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
