import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "../../models/job";

interface BookmarkState {
  bookmarks: number[];
  bookmarkedJobs: Job[];
  isLoading: boolean;
}

const initialState: BookmarkState = {
  bookmarks: [],
  bookmarkedJobs: [],
  isLoading: false,
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
  },
});

export const { toggleBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
