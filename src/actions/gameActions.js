import firebase from "./firebase";
const db = firebase.firestore();

export const setInGameState = boolean => {
  return {
    type: "SET_IN_GAME_STATE",
    payload: boolean
  };
};

export const setGameFinishState = boolean => {
  return {
    type: "SET_GAME_FINISH_STATE",
    payload: boolean
  };
};

export const fetchPlayingSongData = (songId, difficulty) => dispatch => {
  let obj = {};
  db.collection("songList")
    .doc(songId)
    .collection("gameData")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        obj = Object.assign({
          audio: new Audio(doc.data().url),
          beatData: JSON.parse(doc.data()[difficulty])
        });
        dispatch({ type: "FETCH_PLAYING_SONG_DATA", payload: obj });
      });
    })
    .catch(error => {
      console.log("Error getting documents: ", error);
      dispatch({
        type: "FETCH_PLAYING_SONG_DATA",
        payload: "error"
      });
    });
};

export const storeRecordToDB = (doc, difficutly, data) => dispatch => {
  db.collection("songList")
    .doc(doc)
    .collection(difficutly)
    .add(data)
    .then(() => {
      console.log('lod一下',data);
      
      dispatch({ type: "STORE_RECORD" });
    })
    .catch(error => {
      console.log(error.message);
    });
};
