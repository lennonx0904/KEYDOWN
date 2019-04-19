export default (state = false, action) => {
  switch (action.type) {
    case "SHOW_SIGNUP_FORM":
      return action.payload;
    default:
      return state;
  }
};
