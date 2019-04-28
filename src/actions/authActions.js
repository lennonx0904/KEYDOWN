import firebase from "./firebase";
import "firebase/auth";
const db = firebase.firestore();

export const logIn = data => dispatch => {
  firebase
    .auth()
    .signInWithEmailAndPassword(data.email, data.password)
    .then(() => {
      firebase.auth().onAuthStateChanged(user => {
        console.log("log in 以後抓user.uid", user.uid);
        dispatch({ type: "STORE_USER_UID", payload: user.uid });
      });
    })
    .catch(error => {
      dispatch({ type: "LOGIN_ERROR", payload: error });
    });
};

export const logOut = () => dispatch => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({ type: "LOGOUT_SUCCESS" });
    });
};

export const checkAuthState = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    console.log("每次的checkAuthState-------");
    if (user) {
      console.log("checkAuthState 裡面的", user.uid);
      dispatch({ type: "STORE_USER_UID", payload: user.uid });
    } else {
      dispatch({ type: "STORE_USER_UID", payload: null });
    }
  });
};

export const signUp = data => dispatch => {
  console.log("signUp--state--", data);

  const { userName, email, password, comfirmPassword } = data;

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
    .then(res => {
      console.log("sigh up 裡的 user----", res.user.uid);
      let uid = res.user.uid;
      dispatch({ type: "STORE_USER_UID", payload: uid });
      db.collection("users")
        .doc(uid)
        .set({ userName, email });
    })
    .then(() => {
      dispatch({ type: "SIGH_UP_SUCCESS" });
    })
    .catch(error => {
      dispatch({ type: "SIGH_UP_ERROR", payload: error.message });
    });
};
