import { legacy_createStore as createStore, applyMiddleware } from "redux";
import storeReducer from "./reducer";
import { thunk } from "redux-thunk";

const store = createStore(storeReducer, applyMiddleware(thunk));

export default store;
