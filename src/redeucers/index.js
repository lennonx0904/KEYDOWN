import { combineReducers } from "redux";

import songListReducer from "./songListReducer";
import showingReducer from "./showingReducer";
import authReducer from "./authReducer";
import rankingReducer from "./rankingReducer";
import gameReducer from "./gameReducer";


export default combineReducers({
  auth: authReducer,
  showing: showingReducer,
  songList: songListReducer,
  game: gameReducer,
  ranking: rankingReducer
});
