import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_TRUE,
  AUTHENTICATED_FALSE,
  LOGOUT,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
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
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };

    case SIGNUP_FAIL:
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
    case PASSWORD_RESET_SUCCESS:
    case PASSWORD_RESET_FAIL:
    case PASSWORD_RESET_CONFIRM_SUCCESS:
    case PASSWORD_RESET_CONFIRM_FAIL:
    case ACTIVATION_SUCCESS:
    case ACTIVATION_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
