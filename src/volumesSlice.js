import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
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

const volumesAdapter = createEntityAdapter({
  selectId: (volume) => volume.id,
});

const searchInitialState = volumesAdapter.getInitialState({
  status: "idle",
  error: null,
  totalItems: null,
});

export const fetchVolumes = createAsyncThunk(
  "search/volumes",
  async (_, { getState, rejectWithValue }) => {
    const searchParams = await getState().search;
    const searchQuery = await createSearchQuery(
      searchParams.query,
      searchParams.category,
      searchParams.orderBy,
      searchParams.page
    );
    const response = await fetch(searchQuery);
    const data = await response.json();
    if (response.ok === false) {
      console.log(data);
      return rejectWithValue(data.error.message);
    } else if (data.totalItems === 0) {
      return rejectWithValue("Nothing was found");
    }
    return data;
  }
);

export const fetchSingleVolume = createAsyncThunk(
  "search/volume",
  async (volumeId, { rejectWithValue }) => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${key}`
    );
    const data = await response.json();
    if ((response.ok = false)) {
      return rejectWithValue(data.error.message);
    }
    return data;
  }
);
const volumesSlice = createSlice({
  name: "volumes",
  initialState: searchInitialState,
  reducers: {
    resetVolumesState: () => {
      return searchInitialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchVolumes.fulfilled, (state, action) => {
      volumesAdapter.upsertMany(state, action.payload.items);
      state.totalItems = action.payload.totalItems;
      state.status = "succeeded";
    });
    builder.addCase(fetchVolumes.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(fetchVolumes.pending, (state, action) => {
      state.status = "loading";
    });
  },
});

export const {
  selectAll: selectAllVolumes,
  selectById: selectVolumeById,
  selectIds: selectVolumesIds,
} = volumesAdapter.getSelectors((state) => state.volumes);

export const { resetVolumesState } = volumesSlice.actions;

export default volumesSlice.reducer;
