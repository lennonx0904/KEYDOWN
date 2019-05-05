import firebase from "./firebase";
import "firebase/auth";
const db = firebase.firestore();

// 這只是用來寫假的 beatData
export const writeData = data => dispatch => {
  db.collection("songList")
    .doc("x7mYBzozC4wSDvqXkrN2")
    .collection("gameData")
    .doc("eHYSGoQS5KeY5JwonBoI")
    .set(
      {
        hard: data
      },
      { merge: true }
    )
    .then(function() {
      console.log("Document successfully written!");
      dispatch({ type: "WRITE_DATA" });
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
};
