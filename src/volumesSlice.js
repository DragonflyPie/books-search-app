import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import key from "./apiKey";

const createSearchQuery = (query, category, orderBy, page) => {
  return `https://www.googleapis.com/books/v1/volumes?q=${query.replace(
    / /g,
    "+"
  )}${
    category !== "all" ? `+subject:${category}` : ""
  }&orderBy=${orderBy}&startIndex=${
    page * 10 - 9
  }&maxResults=10&fields=totalItems,items(id,volumeInfo(description,imageLinks,authors,categories,title))&key=${key}`;
};

const searchInitialState = {
  status: "idle",
  error: null,
  totalItems: null,
  volumes: [],
};

export const fetchVolumes = createAsyncThunk(
  "search/volumes",
  async (_, { getState }) => {
    const searchParams = await getState().search;
    const searchQuery = await createSearchQuery(
      searchParams.query,
      searchParams.category,
      searchParams.orderBy,
      searchParams.page
    );
    const response = await fetch(searchQuery);
    const data = response.json();
    return data;
  }
);
const volumesSlice = createSlice({
  name: "volumes",
  initialState: searchInitialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchVolumes.fulfilled, (state, action) => {
      state.volumes = action.payload.items;
      state.status = "succeeded";
    });
    builder.addCase(fetchVolumes.rejected, (state, action) => {
      state.error = action.error.message;
      state.status = "failed";
    });
    builder.addCase(fetchVolumes.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export default volumesSlice.reducer;
