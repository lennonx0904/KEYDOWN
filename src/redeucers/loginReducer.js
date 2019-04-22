export default (state = { userName:'', email:'' }, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.payload;
    default:
      return state;
  }
};
