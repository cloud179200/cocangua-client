import { applyMiddleware, createStore, compose } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);
store.subscribe(() => {
  console.log(store.getState());
})
export default store;
