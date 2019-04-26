// import { getsongList } from "./fireStore";
import firebase from "./firebase";
import "firebase/auth";

const db = firebase.firestore();

export const showLoginForm = boolean => {
  return {
    type: "SHOW_LOGIN_FORM",
    payload: boolean
  };
};

export const showSignUpForm = boolean => {
  return {
    type: "SHOW_SIGNUP_FORM",
    payload: boolean
  };
};

export const signUpHandler = () => {
  const { userName, email, password, comfirmPassword } = this.state;
  if (userName === "") {
    alert("Please enter your name.");
    return;
  }
  if (password !== comfirmPassword) {
    alert("Please comfirm your password.");
    return;
  }
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(
      db
        .collection("user")
        .doc()
        .set({
          userName: userName,
          email: email
        })
        .then(() => {
          console.log("Document successfully written!");
        })
        .catch(error => {
          console.error("Error writing document: ", error);
        })
    )
    .catch(error => {
      alert(error.message);
    });
};

export const fetchSongList = () => dispatch => {
  let arr = [];
  db.collection("songList")
    .orderBy("id")
    .get()
    .then(querySnapshot =>
      querySnapshot.forEach(doc => {
        arr = [...arr, { id: doc.id, data: doc.data() }];
        dispatch({ type: "FETCH_SONG_LIST", payload: arr });
      })
    );
};

export const selectDifficulty = difficulty => {
  return {
    type: "SELECT_SONG_TO_PLAY",
    payload: difficulty
  };
};

export const checkInGame = boolean => {
  return {
    type: "CHECK_IN_GAME",
    payload: boolean
  };
};

export const fetchPlayingSongData = (songId, difficulty) => dispatch => {
  let obj = {};
  db.collection("songList")
    .doc(songId)
    .collection("gameData")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(doc => {
        // obj = Object.assign({songURL: doc.data().url, beatData: doc.data()[difficulty] });
        obj = Object.assign({
          audio: new Audio(doc.data().url),
          beatData: JSON.parse(doc.data()[difficulty])
        });

        dispatch({ type: "FETCH_PLAYING_SONG_DATA", payload: obj });
      });
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    });
};

export const writeData = data => {
  db.collection("songList")
    .doc("x7mYBzozC4wSDvqXkrN2")
    .collection("gameData")
    .doc("eHYSGoQS5KeY5JwonBoI")
    .set(
      {
        normal: data
      },
      { merge: true }
    )
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};
