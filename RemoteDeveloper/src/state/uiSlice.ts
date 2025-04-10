import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isLoadingForJobsList: boolean;
  isLoadingForJobContent: boolean;
  isLoadingForBookmarkPopover: boolean;
}

const initialState: UIState = {
  isLoadingForJobsList: false,
  isLoadingForJobContent: false,
  isLoadingForBookmarkPopover: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoadingForJobsList(state, action: PayloadAction<boolean>) {
      state.isLoadingForJobsList = action.payload;
    },
    setLoadingForJobContent(state, action: PayloadAction<boolean>) {
      state.isLoadingForJobContent = action.payload;
    },
    setLoadingForBookmarkPopover(state, action: PayloadAction<boolean>) {
      state.isLoadingForBookmarkPopover = action.payload;
    },
  },
});

export const {
  setLoadingForJobsList,
  setLoadingForJobContent,
  setLoadingForBookmarkPopover,
} = uiSlice.actions;

export default uiSlice.reducer;
