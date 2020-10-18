import { GET_ERRORS } from "../types/Types";

const initialState = {
  msg: {},
  status: null,
};

const errorReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ERRORS:
      return {
        ...state,
        msg: payload.msg,
        status: payload.status,
      };
    default:
      return state;
  }
};

export default errorReducer;
