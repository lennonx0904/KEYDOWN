import firebase from "./firebase";
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
