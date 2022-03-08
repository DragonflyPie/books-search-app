import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    category: "all",
    orderBy: "relevance",
    page: "1",
  },
  reducers: {
    updateSearchParams(state, action) {
      state.query = action.payload.query;
      state.category = action.payload.category;
      state.orderBy = action.payload.orderBy;
    },
  },
});

export const { updateSearchParams } = searchSlice.actions;

export default searchSlice.reducer;