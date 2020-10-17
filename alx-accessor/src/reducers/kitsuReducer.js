import { GET_ANIME_SUCCESS, GET_ANIME_FAIL } from "../types/Types";

const initialState = {
  anime: null,
  animLoaded: false,
};

const animReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ANIME_SUCCESS:
      return {
        ...state,
        anime: payload,
        animLoaded: true,
      };
    case GET_ANIME_FAIL:
      return {
        ...state,
        animLoaded: false,
      };
    default:
      return state;
  }
};

export default animReducer;
