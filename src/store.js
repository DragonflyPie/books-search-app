import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import volumesSlice from "./volumesSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    volumes: volumesSlice,
  },
});
