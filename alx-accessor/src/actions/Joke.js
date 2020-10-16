import Axios from "axios";
import { GET_JOKE_SUCCESS, GET_JOKE_FAIL } from "../types/Types";

// GET JOKE ACTION
export const getJokes = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await Axios.get(
      "https://official-joke-api.appspot.com/jokes/ten",
      config
    );
    dispatch({
      type: GET_JOKE_SUCCESS,
      payload: response.data,
    });
  } catch (err) {
    dispatch({
      type: GET_JOKE_FAIL,
    });
  }
};
