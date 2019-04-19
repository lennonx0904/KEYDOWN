import { combineReducers } from "redux";
import showLoginFormReducer from "./showLoginFormReducer";
import showSignUpFormReducer from "./showSignUpFormReducer";

export default combineReducers({
  showLoginForm: showLoginFormReducer,
  showSignUpForm: showSignUpFormReducer
});
