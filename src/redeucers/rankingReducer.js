const initState = {
  dataFromSong: []
};

const rankingReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_RANKING_RECORD_FROM_SONG":
      console.log(action.payload);
      return { ...state, dataFromSong: action.payload };

    default:
      return state;
  }
};

export default rankingReducer;
