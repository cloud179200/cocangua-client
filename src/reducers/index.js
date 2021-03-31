import audioControlReducer from "./soundControl";
import notificationMessageReducer from "./notificationMessage";
import userReducer from "./user";
import { combineReducers } from "redux";

export default combineReducers({
  audioControl: audioControlReducer,
  notificationMessage: notificationMessageReducer,
  user: userReducer
});
