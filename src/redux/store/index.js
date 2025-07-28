import { configureStore } from "@reduxjs/toolkit";
import roadmapReducer from "../slices/roadmapSlice";

const store = configureStore({
  reducer: {
    roadmap: roadmapReducer,
  },
});
export default store;
