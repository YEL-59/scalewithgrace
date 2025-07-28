import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentRoadmap: null,
};

const roadmapSlice = createSlice({
  name: "roadmap",
  initialState,
  reducers: {
    setRoadmap: (state, action) => {
      state.currentRoadmap = action.payload;
    },
    clearRoadmap: (state) => {
      state.currentRoadmap = null;
    },
  },
});

export const { setRoadmap, clearRoadmap } = roadmapSlice.actions;
export default roadmapSlice.reducer;
