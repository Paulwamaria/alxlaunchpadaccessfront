import { combineReducers } from "redux";
import authReducer from "./auth";
import jokeReducer from "./jokeReducer";
import animReducer from "./kitsuReducer";

const rootReducer = combineReducers({
  authReducer,
  jokeReducer,
  animReducer,
});

export default rootReducer;
