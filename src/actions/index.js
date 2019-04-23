// import { getsongList } from "./fireStore";
import firebase from "./firebase";
import "firebase/auth";

const db = firebase.firestore();

export const showLoginForm = () => {
  return {
    type: "SHOW_LOGIN_FORM",
    payload: true
  };
};
export const hideLoginForm = () => {
  return {
    type: "SHOW_LOGIN_FORM",
    payload: false
  };
};

export const showSignUpForm = () => {
  return {
    type: "SHOW_SIGNUP_FORM",
    payload: true
  };
};
export const hideSignUpForm = () => {
  return {
    type: "SHOW_SIGNUP_FORM",
    payload: false
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
        arr = [...arr, doc.data()];
        dispatch({ type: "FETCH_SONG_LIST", payload: arr });
      })
    );
};

export const selectSongToPlay = songToPlay => {
  return {
    type: "SELECT_SONG_TO_PLAY",
    payload: songToPlay
  };
};

export const checkInGame = boolean => {
  return {
    type: "CHECK_IN_GAME",
    payload: boolean
  };
};
