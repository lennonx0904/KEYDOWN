const initState = {
  authError: null,
  uid: null,
  name: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      console.log("Loning error !");
      return { ...state, authError: "Login Failed" };
    case "GET_USER_UID":
      return { ...state, uid: action.payload };
    // "LOGIN_SUCCESS" 要刪掉
    case "LOGIN_SUCCESS":
      console.log("Long in Succes !");
      return state;
    case "LOGOUT_SUCCESS":
      console.log("Log out Succes !");
      // if can judge by uid,  remember to change 'return state'
      return state;
    case "SIGH_UP_SUCCESS":
      console.log("signup success and login");
      return { ...state, authError: null };
    case "SIGH_UP_ERROR":
      console.log("signup error ");
      return { ...state, authError: action.payload };
    case "GET_USER_NAME":
      return { ...state, name: action.payload };
    default:
      return state;
  }
};

export default authReducer;
