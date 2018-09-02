import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const middleWare = [thunk];

const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleWare)
);
//rootreducer
export default store;
