import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import key from "../apiKey";

const BASE_QUERY = "https://www.googleapis.com/books/v1/volumes";

const FIELDS =
  "totalItems,items(id,volumeInfo(description,publishedDate,imageLinks,authors,categories,title))";

const createSearchQuery = (searchParams) => {
  return `${BASE_QUERY}?q=${removeSpaces(searchParams.query)}${getCategory(
    searchParams.category
  )}&orderBy=${searchParams.orderBy}&startIndex=${getPage(
    searchParams.page
  )}&maxResults=10&fields=${FIELDS}&key=${key}`;
};

const removeSpaces = (query) => {
  return query.replace(/\s/g, "+");
};

const getCategory = (category) => {
  return category === "all" ? "" : `+subject:${category}`;
};

const getPage = (page) => {
  return page * 10 - 9;
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
    const searchQuery = await createSearchQuery(searchParams);
    const response = await fetch(searchQuery);
    const data = await response.json();
    if (response.ok === false) {
      return rejectWithValue(data.error.message);
    } else if (data.totalItems === 0) {
      return rejectWithValue("Nothing was found");
    }
    return data;
  }
);

export const fetchVolumeById = createAsyncThunk(
  "search/volume",
  async (volumeId, { rejectWithValue }) => {
    const response = await fetch(`${BASE_QUERY}/${volumeId}?key=${key}`);
    const data = await response.json();
    if (response.ok === false) {
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
    builder.addCase(fetchVolumes.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchVolumes.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(fetchVolumes.fulfilled, (state, action) => {
      volumesAdapter.upsertMany(state, action.payload.items);
      state.totalItems = action.payload.totalItems;
      state.status = "succeeded";
    });
    builder.addCase(fetchVolumeById.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchVolumeById.rejected, (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    });
    builder.addCase(fetchVolumeById.fulfilled, (state, action) => {
      volumesAdapter.upsertOne(state, action.payload);
      state.status = "succeeded";
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
