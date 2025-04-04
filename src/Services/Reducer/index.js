import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({ authReducer , postsReducer });

export default rootReducer;