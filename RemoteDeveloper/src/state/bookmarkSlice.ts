import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Job } from "../models/job";
import { setLoadingForBookmarkPopover } from "./uiSlice";
import { BASE_API_URL } from "../lib/constant";

interface BookmarkState {
  bookmarks: number[];
  bookmarkedJobs: Job[];
}

const initialState: BookmarkState = {
  bookmarks: [],
  bookmarkedJobs: [],
};



export const fetchBookmarkedJobs = createAsyncThunk(
  "bookmark/fetchBookmarkedJobs",
  async (bookmarks: number[], thunkAPI) => {
    const { dispatch } = thunkAPI;

    dispatch(setLoadingForBookmarkPopover(true));

    const responses: Job[] = await Promise.all(
      bookmarks.map((id) =>
        fetch(`${BASE_API_URL}/${id}`).then((res) => res.json())
      )
    ).finally(() => {
      dispatch(setLoadingForBookmarkPopover(false));
    });

    return responses;
  }
);

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
