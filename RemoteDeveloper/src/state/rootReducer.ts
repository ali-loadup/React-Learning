import { combineReducers } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmark/bookmarkSlice";
import jobReducer from "./job/jobSlice";

const rootReducer = combineReducers({
  job: jobReducer,
  bookmark: bookmarkReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
