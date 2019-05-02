import firebase from "./firebase";
import "firebase/auth";

const db = firebase.firestore();



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





// 這只是用來寫假的 beatData
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
