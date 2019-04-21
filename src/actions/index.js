// import { getsongList } from "./fireStore";
import firebase from "./firebase";

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

export const fetchSongList = () => dispatch => {
  let arr = [];
  db.collection("songList")
    .get()
    .then(querySnapshot =>
      querySnapshot.forEach(doc => {
        arr = [...arr, doc.data()];
        // arr.push(doc.data());
        dispatch({ type: "FETCH_SONG_LIST", payload: arr });
      })
    );
};
