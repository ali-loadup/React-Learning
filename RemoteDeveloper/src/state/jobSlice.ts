import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_API_URL } from "../lib/constant";
import { Job } from "../models/job";
import {
  setCurrentPage,
  setTotalCountOfResults,
  setTotalNumberOfPages,
} from "./jobSearchSlice";
import { setLoadingForJobsList } from "./uiSlice";

interface JobState {
  activeJobId: number | null;
  debouncedSearchText: string;
  jobs: Job[];
}

const initialState: JobState = {
  activeJobId: null,
  debouncedSearchText: "",
  jobs: [],
};


export const searchJobs = createAsyncThunk(
  "job/searchJobs",
  async (searchText: string, thunkAPI) => {
    const { dispatch } = thunkAPI;

    dispatch(setLoadingForJobsList(true));

    let url = BASE_API_URL;
    if (searchText.length > 0) url += `?search=${searchText}`;
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description);
    }

    dispatch(setLoadingForJobsList(false));
    const data = (await response.json()).jobItems as Job[];

    dispatch(setTotalCountOfResults(data.length));
    dispatch(setTotalNumberOfPages(Math.ceil(data.length / 7)));
    dispatch(setCurrentPage(1));

    return data;
  }
);


const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setActiveJobId: (state, action: PayloadAction<number | null>) => {
      state.activeJobId = action.payload;
    },
    setDebouncedSearchText: (state, action: PayloadAction<string>) => {
      state.debouncedSearchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchJobs.fulfilled, (state, action) => {
      state.jobs = [...action.payload];
    });
  },
});

export const { setActiveJobId, setDebouncedSearchText } = jobSlice.actions;

export default jobSlice.reducer;
