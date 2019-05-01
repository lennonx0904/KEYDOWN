import firebase from "./firebase";
const db = firebase.firestore();

export const renderRankingData = rankingData => {
  return {
    type: "RENDER_RANKING_DATA",
    payload: rankingData
  };
};

export const storeRecordToDB = (doc, difficutly, data) => dispatch => {
  db.collection("songList")
    .doc(doc)
    .collection(difficutly)
    .add(data)
    .then(() => {
      dispatch({ type: "STORE_RECORD" });
    })
    .catch(error => {
      console.log(error.message);
    });
};

export const fetchRankingRecord = (doc, difficutly) => dispatch => {
  let arr = [];
  db.collection("songList")
    .doc(doc)
    .collection(difficutly)
    .orderBy("score", "desc")
    .limit(10)
    .get()
    .then(q => {
      q.forEach(doc => {
        console.log(doc.data());
        arr.push(doc.data());
        dispatch({ type: "FETCH_RANKING_RECORD", payload: arr });
      });
    });
};
