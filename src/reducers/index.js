import audioControlReducer from "./soundControl";
import notificationMessageReducer from "./notificationMessage";
import userReducer from "./user";
import roomReducer from "./room";
import places from "./placesHorse";
import { combineReducers } from "redux";

export default combineReducers({
  audioControl: audioControlReducer,
  user: userReducer,
  notificationMessage: notificationMessageReducer,
  room: roomReducer,
  placesHorse: places,
});
