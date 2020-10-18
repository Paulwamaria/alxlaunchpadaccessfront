import { GET_MESSAGES, CREATE_MESSAGE } from "../types/Types";

const initialState = {
  msg: {},
  status: null,
};

const messageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MESSAGES:
      return payload;
    case CREATE_MESSAGE:
      return (state = payload);
    default:
      return state;
  }
};

export default messageReducer;
