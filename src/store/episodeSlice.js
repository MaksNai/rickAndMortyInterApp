import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodes = createAsyncThunk(
  "episodes/fetchEpisodes",
  async (queryParams) => {
    const response = await axios.get(
      "https://rickandmortyapi.com/api/episode",
      {
        params: queryParams,
      }
    );
    return response.data;
  }
);
const initialState = {
  entities: [],
  loading: "idle",
  error: null,
  filters: JSON.parse(localStorage.getItem("episodeFilters")) || {
    name: "",
  },
};
const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {
    setFilter(state, action) {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
      localStorage.setItem("episodeFilters", JSON.stringify(state.filters));
    },
    resetFilters(state) {
      state.filters = {};
      localStorage.removeItem("episodeFilters");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = action.payload.results;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setFilter, resetFilters } = episodeSlice.actions;

export const selectAllEpisodes = (state) => state.characters.entities;
export const selectFilters = (state) => state.characters.filters;
export const selectFilteredEpisodes = (state) => {
  const { entities, filters } = state.episode;
  return entities.filter(
    (episode) =>
      !filters.name ||
      episode.name.toLowerCase().includes(filters.name.toLowerCase())
  );
};
export default episodeSlice.reducer;
