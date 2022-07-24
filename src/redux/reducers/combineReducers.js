import { combineReducers } from "redux";
import reducer from "./profilePicReducer";

let reducers = combineReducers({
    userDetails: reducer
})

export default reducers 