import { combineReducers } from "redux";
import authReducer from "./auth";
import jokeReducer from "./jokeReducer";
import animReducer from "./kitsuReducer";
import errorReducer from "./error";
import messageReducer from "./messages";

const rootReducer = combineReducers({
  authReducer,
  jokeReducer,
  animReducer,
  errorReducer,
  messageReducer,
});

export default rootReducer;
