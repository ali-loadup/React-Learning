import { combineReducers } from "@reduxjs/toolkit";
import bookmarkReducer from "./bookmarkSlice";
import jobReducer from "./jobSlice";
import uiReducer from "./uiSlice";
import jobSearchReducer from "./jobSearchSlice";

const rootReducer = combineReducers({
  job: jobReducer,
  bookmark: bookmarkReducer,
  ui: uiReducer,
  jobSeacrh: jobSearchReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
