import { combineReducers } from "redux";

import fetchSongListReducer from "./fetchSongListReducer";
// import checkInGameReducer from "./checkInGameReducer";
import showingReducer from "./showingReducer";
import authReducer from "./authReducer";
import rankingReducer from "./rankingReducer";
import gameReducer from "./gameReducer";



// const fetchPlayingSongDataReducer = (state = {}, action) => {
//   switch (action.type) {
//     case "FETCH_PLAYING_SONG_DATA":
//       return Object.assign(action.payload);
//     default:
//       return state;
//   }
// };



export default combineReducers({
  auth: authReducer,
  showing: showingReducer,
  songList: fetchSongListReducer,
  game: gameReducer,
  ranking: rankingReducer
});
