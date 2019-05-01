import { combineReducers } from "redux";
// import showLoginFormReducer from "./showLoginFormReducer";
// import showSignUpFormReducer from "./showSignUpFormReducer";
import fetchSongListReducer from "./fetchSongListReducer";
import checkInGameReducer from "./checkInGameReducer";
import showingReducer from './showingReducer';
import authReducer from "./authReducer";
import rankingReducer from "./rankingReducer";

// const selectDifficultyReducer = (state = "", action) => {
//   switch (action.type) {
//     case "SELECT_SONG_TO_PLAY":
//       return action.payload;
//     default:
//       return state;
//   }
// };

const fetchPlayingSongDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_PLAYING_SONG_DATA":
      return Object.assign(action.payload);
    default:
      return state;
  }
};

const renderRankingDataReducer = (state = {}, action) => {
  switch (action.type) {
    case "RENDER_RANKING_DATA":
      return Object.assign(action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
  showing: showingReducer,
  // loginForm: showLoginFormReducer,
  // signUpForm: showSignUpFormReducer,
  songList: fetchSongListReducer,
  // difficulty: selectDifficultyReducer,
  inGame: checkInGameReducer,
  playingSongData: fetchPlayingSongDataReducer,
  rankingData: renderRankingDataReducer,
  rankingRecord: rankingReducer
});
