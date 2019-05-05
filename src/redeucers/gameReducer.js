const initState = {
  inGame: false,
  playingSongData: null,
  gameOver: false
};

const gameReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_IN_GAME_STATE":
      return { ...state, inGame: action.payload };
    case "FETCH_PLAYING_SONG_DATA":
      return { ...state, playingSongData: action.payload };
    case "SET_GAME_OVER_STATE":
      return { ...state, gameOver: action.payload };
    default:
      return state;
  }
};

export default gameReducer;
