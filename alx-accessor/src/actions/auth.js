import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  AUTHENTICATED_TRUE,
  AUTHENTICATED_FALSE,
  LOGOUT,
  PASSWORD_RESET_CONFIRM_FAIL,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  SIGNUP_FAIL,
  SIGNUP_SUCCESS,
  ACTIVATION_FAIL,
  ACTIVATION_SUCCESS,
  GET_ERRORS,
  CREATE_MESSAGE,
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
export const loadUser = () => async (dispatch) => {
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
      dispatch({
        type: LOAD_USER_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
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

// SIGNUP ACTION
export const signup = (
  email,
  firstName,
  lastName,
  password,
  rePassword
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    email,
    firstName,
    lastName,
    password,
    re_password: rePassword,
  });

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/`,
      body,
      config
    );
    const msg = {
      AccountDetails:
        "Account details received, please check your email to activate account",
    };
    dispatch({
      type: CREATE_MESSAGE,
      payload: msg,
    });
    dispatch({
      type: SIGNUP_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL,
    });
    const errors = {
      msg: err.response.data,
      status: err.response.status,
    };
    dispatch({
      type: GET_ERRORS,
      payload: errors,
    });
  }
};

// VERIFY ACCOUNT ACTION
export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ uid, token });

  try {
    await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );
    const msg = {
      AccountVerified: "Your account has been verified!",
    };
    dispatch({
      type: ACTIVATION_SUCCESS,
      payload: msg,
    });
  } catch (err) {
    const errors = {
      msg: err.response.data,
      status: err.response.status,
    };
    dispatch({
      type: GET_ERRORS,
      payload: errors,
    });
    dispatch({
      type: ACTIVATION_FAIL,
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
    dispatch(loadUser());
  } catch (err) {
    const errors = {
      msg: err.response.data,
      status: err.response.status,
    };
    dispatch({
      type: GET_ERRORS,
      payload: errors,
    });
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// RESET PASSWORD ACTION
export const resetPassword = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );
    const msg = {
      RequestPassReset: "Request received, kindly check your email to proceed.",
    };
    dispatch({
      type: CREATE_MESSAGE,
      payload: msg,
    });
    dispatch({
      type: PASSWORD_RESET_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    const errors = {
      msg: err.response.data,
      status: err.response.status,
    };
    dispatch({
      type: GET_ERRORS,
      payload: errors,
    });
    dispatch({
      type: PASSWORD_RESET_FAIL,
    });
  }
};

// RESET PASSWORD CONFIRM ACTION
export const resetPasswordConfirm = (
  uid,
  token,
  newPassword,
  reNewPassword
) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({
    uid,
    token,
    new_password: newPassword,
    re_new_password: reNewPassword,
  });
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
      body,
      config
    );
    const message = {
      PassResetConfirm: "Password was changed successfully",
    };
    dispatch({
      type: CREATE_MESSAGE,
      payload: message,
    });
    dispatch({
      type: PASSWORD_RESET_CONFIRM_SUCCESS,
      payload: response.data,
    });
    dispatch({
      type: LOGOUT,
    });
  } catch (err) {
    const errors = {
      msg: err.response.data,
      status: err.response.status,
    };
    dispatch({
      type: GET_ERRORS,
      payload: errors,
    });
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL,
    });
  }
};

// logout action
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
  window.location.reload(true);
};
