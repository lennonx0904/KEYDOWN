import { combineReducers } from "redux";
import showLoginFormReducer from "./showLoginFormReducer";
import showSignUpFormReducer from "./showSignUpFormReducer";
import fetchSongListReducer from './fetchSongListReducer';

export default combineReducers({
  loginForm: showLoginFormReducer,
  signUpForm: showSignUpFormReducer,
  songList: fetchSongListReducer
});
