export default (state = false, action) => {
    switch (action.type) {
        case "CHECK_IN_GAME":
          return action.payload;
        default:
          return state;
      }
};