import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobState {
  activeJobId: number | null;
  loading: boolean;
}

const initialState: JobState = {
  activeJobId: null,
  loading: false,
};

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setActiveJobId: (state, action: PayloadAction<number | null>) => {
      state.activeJobId = action.payload;
      console.log("setActiveJobId", state.activeJobId);
    },
  },
});

export const { setActiveJobId } = jobSlice.actions;

export default jobSlice.reducer;
