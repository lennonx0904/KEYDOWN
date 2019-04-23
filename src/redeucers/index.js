import { combineReducers } from "redux";
import showLoginFormReducer from "./showLoginFormReducer";
import showSignUpFormReducer from "./showSignUpFormReducer";
import fetchSongListReducer from "./fetchSongListReducer";
import checkInGameReducer from "./checkInGameReducer";

const selectSongToPlayReducer = (state = {}, action) => {
  switch (action.type) {
    case "SELECT_SONG_TO_PLAY":
      return Object.assign(action.payload);
    default:
      return state;
  }
};

export default combineReducers({
  loginForm: showLoginFormReducer,
  signUpForm: showSignUpFormReducer,
  songList: fetchSongListReducer,
  songToPlay: selectSongToPlayReducer,
  inGame: checkInGameReducer
});
