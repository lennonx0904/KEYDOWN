import firebase from "./firebase";
const db = firebase.firestore();

export const fetchRankingRecord = (docId, difficutly) => dispatch => {
  let arr = [];
  db.collection("songList")
    .doc(docId)
    .collection(difficutly)
    .orderBy("score", "desc")
    .limit(10)
    .get()
    .then(q => {
      q.forEach(doc => {
        arr.push({ id: doc.id, data: doc.data() });
        dispatch({ type: "FETCH_RANKING_RECORD", payload: arr });
      });
    });
};
