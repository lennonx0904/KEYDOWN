const songListReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_SONG_LIST":
      return action.payload;
    default:
      return state;
  }
};

export default songListReducer;