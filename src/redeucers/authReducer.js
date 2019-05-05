const initState = {
  authError: null,
  uid: null,
  name: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      return { ...state, authError: "Login Failed" };
    case "GET_USER_UID":
      return { ...state, uid: action.payload };
    case "LOGIN_SUCCESS":
      return state;
    case "SIGH_UP_SUCCESS":
      return { ...state, authError: null };
    case "SIGH_UP_ERROR":
      return { ...state, authError: action.payload };
    case "GET_USER_NAME":
      return { ...state, name: action.payload };
    case "SHOW_LOGIN_FORM":
      return { ...state, authError: null };
    case "SHOW_SIGNUP_FORM":
      return { ...state, authError: null };

    default:
      return state;
  }
};

export default authReducer;
