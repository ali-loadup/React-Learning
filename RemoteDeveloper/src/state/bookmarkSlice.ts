import {  createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "../models/job";

interface BookmarkState {
  bookmarks: number[];
  bookmarkedJobs: Job[];
}

const initialState: BookmarkState = {
  bookmarks: [],
  bookmarkedJobs: [],
};

const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    toggleBookmark: (state, action: PayloadAction<number>) => {
      const isBookmarked = state.bookmarks.includes(action.payload);
      if (isBookmarked) {
        state.bookmarks = state.bookmarks.filter((id) => id !== action.payload);
      } else {
        state.bookmarks = [...state.bookmarks, action.payload];
      }
    },
    setBookmarkedJobs: (state, action: PayloadAction<Job[]>) => {
      state.bookmarkedJobs = action.payload;
    },
  },
});

export const { toggleBookmark, setBookmarkedJobs } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
