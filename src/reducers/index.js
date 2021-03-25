import audioControlReducer from "./soundControl";
import notificationMessageReducer from "./notificationMessage";
import {combineReducers} from "redux";


export default combineReducers({audioControl: audioControlReducer, notificationMessage: notificationMessageReducer})


