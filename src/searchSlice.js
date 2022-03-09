import { createSlice } from "@reduxjs/toolkit";
const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    category: "all",
    orderBy: "relevance",
    page: 1,
  },
  reducers: {
    updateSearchParams(state, action) {
      state.query = action.payload.query;
      state.category = action.payload.category;
      state.orderBy = action.payload.orderBy;
    },
    updatePage(state) {
      state.page++;
    },
  },
});

export const { updateSearchParams, updatePage } = searchSlice.actions;

export default searchSlice.reducer;
