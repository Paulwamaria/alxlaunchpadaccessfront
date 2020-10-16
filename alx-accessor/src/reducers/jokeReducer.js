import { GET_JOKE_SUCCESS, GET_JOKE_FAIL } from "../types/Types";

const initialState = {
  dataLoaded: false,
  jokes: [{
    "id": 246,
    "type": "general",
    "setup": "What does a clock do when it's hungry?",
    "punchline": "It goes back four seconds!"
    },],
};

const jokeReucer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_JOKE_SUCCESS:
      return {
        ...state,
        dataLoaded: true,
        jokes: payload,
      };
    case GET_JOKE_FAIL:
      return {
        ...state,
        dataLoaded: false,
        jokes: null,
      };
    default:
      return state;
  }
};

export default jokeReucer;
