import audioControlReducer from "./soundControl";
import notificationMessageReducer from "./notificationMessage";
import loggedReducer from "./logged";
import { combineReducers } from "redux";
import loadingReducer from "./loading";

export default combineReducers({
  audioControl: audioControlReducer,
  notificationMessage: notificationMessageReducer,
  logged: loggedReducer,
  loading: loadingReducer
});
