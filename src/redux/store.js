import { applyMiddleware, legacy_createStore as createStore,} from "redux";
import thunk from "redux-thunk"
import reducers from './reducers/combineReducers'
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/profilePicReducer";

const store = configureStore({reducer : {
    userDetails : reducer
}})
export default store;