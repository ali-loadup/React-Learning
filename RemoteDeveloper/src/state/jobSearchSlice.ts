import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortBy } from "../types/sortBy";

interface JobSearchState {
  currentPage: number;
  sortBy: SortBy;
  totalCountOfResults: number;
  totalNumberOfPages: number;
}

const initialState: JobSearchState = {
  currentPage: 1,
  sortBy: "relevant",
  totalCountOfResults: 0,
  totalNumberOfPages: 0,
};

const jobSearchSlice = createSlice({
  name: "jobSearch",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setSortBy(state, action: PayloadAction<SortBy>) {
      state.sortBy = action.payload;
    },
    setTotalCountOfResults(state, action: PayloadAction<number>) {
      state.totalCountOfResults = action.payload;
    },
    setTotalNumberOfPages(state, action: PayloadAction<number>) {
      state.totalNumberOfPages = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setSortBy,
  setTotalCountOfResults,
  setTotalNumberOfPages,
} = jobSearchSlice.actions;
export default jobSearchSlice.reducer;
