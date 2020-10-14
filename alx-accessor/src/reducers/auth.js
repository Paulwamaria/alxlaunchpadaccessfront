import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_TRUE,
  AUTHENTICATED_FALSE,
  LOGOUT,
} from "../types/Types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: false,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_TRUE:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      localStorage.setItem("refresh", payload.refresh);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
      };
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      return {
        ...state,
        isAuthenticated: false,
        access: null,
        refresh: null,
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case AUTHENTICATED_FALSE:
      return {
        ...state,
        isAuthenticated: false,
      };
    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
