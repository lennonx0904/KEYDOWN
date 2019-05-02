const initState = {
  record: []
};

const rankingReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_RANKING_RECORD":
      return { ...state, record: action.payload };
    default:
      return state;
  }
};

export default rankingReducer;
