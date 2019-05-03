const initState = {
  loginForm: false,
  signUpForm: false,
  mobileButtons: false
};

const showingReducer = (state = initState, action) => {
  switch (action.type) {
    case "SHOW_LOGIN_FORM":
      return { ...state, loginForm: action.payload };
    case "SHOW_SIGNUP_FORM":
      return { ...state, signUpForm: action.payload };
    case "SHOW_MOBILE_BUTTONS":
      return { ...state, mobileButtons: action.payload };
    case "LOGIN_SUCCESS":
      return { ...state, loginForm: false };
    case "SIGH_UP_SUCCESS":
      return { ...state, signUpForm: false };
    default:
      return state;
  }
};

export default showingReducer;
