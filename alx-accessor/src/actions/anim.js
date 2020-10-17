import { GET_ANIME_SUCCESS, GET_ANIME_FAIL } from "../types/Types";
import axios from "axios";

// GET ANIME ACTION
export const getAnime = (category) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/vnd.api+json",
      Authorization: `Bearer ${process.env.REACT_APP_KITSU_TOKEN}`,
    },
  };

  try {
    const response = await axios.get(
      `${process.env.REACT_APP_KITSU_URL}/anime?filter[categories]=${category}`,
      config
    );
    dispatch({
      type: GET_ANIME_SUCCESS,
      payload: response.data.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ANIME_FAIL,
    });
  }
};
