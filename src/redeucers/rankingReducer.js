const initState = {
  record: []
};

const rankingReducer = (state = initState, action) => {
  switch (action.type) {
    case "FETCH_RANKING_RECORD":
      console.log(action.payload);
      return { ...state, record: action.payload };

    default:
      return state;
  }
};

export default rankingReducer;
