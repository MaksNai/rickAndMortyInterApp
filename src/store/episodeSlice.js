import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEpisodes = createAsyncThunk(
  "episodes/fetchEpisodes",
  async (filters, { getState }) => {
    const {
      episodes: { filters: currentFilters },
    } = getState();
    const queryParams = new URLSearchParams({
      ...currentFilters,
      ...filters,
    }).toString();

    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode/?${queryParams}`,
    );
    return response.data;
  },
);

export const fetchEpisodesByIds = createAsyncThunk(
  "episodes/fetchByIds",
  async (episodeIds) => {
    const requests = episodeIds.map((id) =>
      axios.get(`https://rickandmortyapi.com/api/episode/${id}`),
    );
    const responses = await Promise.all(requests);
    return responses.map((response) => response.data);
  },
);

export const fetchEpisodeById = createAsyncThunk(
  "episodes/fetchEpisodeById",
  async (episodeId) => {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode/${episodeId}`
    );
    return response.data;
  }
);


const initialState = {
  maxPage: 1,
  entities: [],
  loading: "idle",
  episodesByIDs: [],
  currentEpisode: null,
  characters: [],
  error: null,
  filters: JSON.parse(localStorage.getItem("episodeFilters")) || {
    name: "",
  },
};

const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    setEpisodeFilter(state, action) {
      const { filterName, value } = action.payload;
      state.filters[filterName] = value;
      localStorage.setItem("episodeFilters", JSON.stringify(state.filters));
    },
    resetEpisodeFilters(state) {
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
        const newEpisodes = new Map(
          state.entities.map((episode) => [episode.id, episode]),
        );
        action.payload.results.forEach((episode) => {
          newEpisodes.set(episode.id, episode);
        });

        state.entities = Array.from(newEpisodes.values());
        state.maxPage = action.payload.info.pages;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEpisodesByIds.pending, (state) => {
        state.loading = "loading";
      })
      .addCase(fetchEpisodesByIds.fulfilled, (state, action) => {
        state.currentEpisode = action.payload;
        state.loading = "succeeded";
      })
      .addCase(fetchEpisodesByIds.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchEpisodeById.fulfilled, (state, action) => {
        state.currentEpisode = action.payload;
        state.loading = "succeeded";
      });
  },
});

export const { setEpisodeFilter, resetEpisodeFilters } = episodesSlice.actions;

export const selectAllEpisodes = (state) => state.episodes.entities;
export const selectEpisodeFilters = (state) => state.episodes.filters;
export const selectFilteredEpisodes = createSelector(
  [selectAllEpisodes, selectEpisodeFilters],
  (entities, filters) => {
    return entities.filter((episode) => {
      const filterString = filters.name.toLowerCase();
      return (
        episode.name.toLowerCase().includes(filterString) ||
        episode.episode.toLowerCase().includes(filterString)
      );
    });
  },
);

export const selectEpisodesByIds = createSelector(
  [selectAllEpisodes, (state, episodeIds) => episodeIds],
  (episodes, episodeIds) => {
    return episodes.filter((episode) =>
      episodeIds.includes(String(episode.id)),
    );
  },
);

export default episodesSlice.reducer;
