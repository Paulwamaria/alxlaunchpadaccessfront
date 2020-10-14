import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_TRUE,
  AUTHENTICATED_FALSE,
  LOGOUT,
} from "../types/Types";
import axios from "axios";

// CHECK AUTHENTICATION STATUS ACTION
export const checkAuthStatus = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ token: localStorage.getItem("access") });
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );
      if (response.data.code !== "code_not_valid") {
        dispatch({
          type: AUTHENTICATED_TRUE,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FALSE,
        });
      }
    } catch (err) {
      dispatch({
        type: AUTHENTICATED_FALSE,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FALSE,
    });
  }
};

// LOAD USER ACTION
export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );
      console.log(response);
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.log(err.message);
      dispatch({
        type: LOAD_USER_FAIL,
      });
    }
  } else {
    dispatch({
      type: LOAD_USER_FAIL,
    });
  }
};

// LOGIN Action
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email, password });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data,
    });
    //LOAD THE USER AFTER LOGIN
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// logout action
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
