import { combineReducers } from "redux";
import authReducer from "./auth";
import jokeReducer from "./jokeReducer";

const rootReducer = combineReducers({
  authReducer,
  jokeReducer,
});

export default rootReducer;
