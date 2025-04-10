import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { JobExpanded } from "../models/jobExpanded";
import { BASE_API_URL } from "../lib/constant";
import { setLoadingForJobContent, setLoadingForJobsList } from "./uiSlice";
import { handleError } from "../utils/errorHandler";
import { Job } from "../models/job";
import {
  setCurrentPage,
  setTotalCountOfResults,
  setTotalNumberOfPages,
} from "./jobSearchSlice";

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

// type JobItemApiResponse = {
//   public: boolean;
//   jobItem: JobExpanded;
// };

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

export const fetchSingleJob = createAsyncThunk(
  "job/fetchJobSingleJob",

  async (id: number, thunkAPI): Promise<JobExpanded> => {
    const { dispatch } = thunkAPI;
    dispatch(setLoadingForJobContent(true));

    const response = await fetch(`${BASE_API_URL}/${id}`);
    if (!response.ok) {
      const errorData = await response.json();
      dispatch(setLoadingForJobContent(false));
      handleError(errorData.description);
      throw new Error(errorData.description);
    }
    dispatch(setLoadingForJobContent(false));
    const data = await response.json();
    const jobItem = data?.jobItem;
    return jobItem;
  }
);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setActiveJobId: (state, action: PayloadAction<number | null>) => {
      state.activeJobId = action.payload;
      console.log("setActiveJobId", state.activeJobId);
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

// export default function useSingleJob(id: number | null) {
//   const { data, isInitialLoading } = useQuery(
//     ["job-item", id],
//     () => (id ? fetchJobSingleJob(id) : null),
//     {
//       staleTime: 5000,
//       refetchOnWindowFocus: false,
//       retry: false,
//       enabled: !!id,
//       onError: handleError,
//     }
//   );
//   const jobItem = data?.jobItem;
//   const isLoading = isInitialLoading;
//   return { jobItem, isLoading };
// }
