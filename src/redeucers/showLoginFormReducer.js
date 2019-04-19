export default (state = false, action) => {
    switch (action.type) {
        case "SHOW_LOGIN_FORM":
          return action.payload;
        default:
          return state;
      }
};