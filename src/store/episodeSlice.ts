import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import axios from "axios";

import {
  AppState,
  FetchArgs,
  FetchEpisodePayload,
  EpisodeRootState,
  EpisodeState,
  FilterValue,
  Episode,
} from "../interfaces/interfaces";

import { parseJSON } from './helpers'

export const fetchEpisodes = createAsyncThunk<
  FetchEpisodePayload,
  FetchArgs,
  { state: EpisodeRootState }
>("episodes/fetchEpisodes", async (args, { getState }) => {
  const {
    episodes: { filters },
  } = getState();

  const queryParams = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value) {
      queryParams.set(key, value);
    }
  });

  if (args.page !== undefined) {
    queryParams.set("page", args.page.toString());
  }
  const response = await axios.get(`https://rickandmortyapi.com/api/episode/`, {
    params: Object.fromEntries(queryParams),
  });
  return response.data as FetchEpisodePayload;
});

export const fetchEpisodesByIds = createAsyncThunk<
  Episode[],
  string | string[], 
  { state: EpisodeRootState } 
>(
  "episodes/fetchEpisodesByIds",
  async (episodeIds, { rejectWithValue }) => {
    try {
      const ids = Array.isArray(episodeIds)
        ? episodeIds.join(',')
        : episodeIds;
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode/${ids}`
      );
      return Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


const initialState: EpisodeState = {
  maxPage: 1,
  entities: [],
  episodesByIds: [],
  loading: null,
  error: null,
  hasMore: true,
  filters: parseJSON(localStorage.getItem("episodesFilters"), {
    name: "",
  }),
};

type FilterName = "name";

interface FilterAction {
  filterName: FilterName;
  value: FilterValue;
}

const episodesSlice = createSlice({
  name: "episodes",
  initialState,
  reducers: {
    setEpisodeFilter(state, action: PayloadAction<FilterAction>) {
      const { filterName, value } = action.payload;
      if (typeof filterName === "string") state.filters[filterName] = value;
      localStorage.setItem("episodesFilters", JSON.stringify(state.filters));
    },
    resetEpisodeFilters(state) {
      state.filters = {
        name: "",
      };
      localStorage.removeItem("episodesFilters");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEpisodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEpisodes.fulfilled, (state, action) => {
        state.loading = false;
        const newEpisodes = new Map(
          state.entities.map((episode) => [episode.id, episode])
        );
        action.payload.results.forEach((episode) => {
          newEpisodes.set(episode.id, episode);
        });

        state.entities = Array.from(newEpisodes.values());
        state.maxPage = action.payload.info.pages;
        state.error = null;
        state.hasMore = !!action.payload.info.next;
      })
      .addCase(fetchEpisodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEpisodesByIds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEpisodesByIds.fulfilled, (state, action) => {
        const episodesData = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];

        state.episodesByIds = episodesData;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEpisodesByIds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setEpisodeFilter, resetEpisodeFilters } = episodesSlice.actions;

export const selectAllEpisodes = (state: AppState) => state.episodes.entities;
export const selectEpisodeFilters = (state: AppState) => state.episodes.filters;
export const selectFilteredEpisodes = createSelector<
  [typeof selectAllEpisodes, typeof selectEpisodeFilters],
  Episode[]
>([selectAllEpisodes, selectEpisodeFilters], (episodes, filters) =>
  episodes.filter((episode) =>
    episode.name.toLowerCase().includes(filters.name.toLowerCase())
  )
);

export const selectEpisodesByIds = createSelector<
  [
    typeof selectAllEpisodes,
    (state: AppState, episodeIds: string[]) => string[]
  ],
  Episode[]
>(
  [selectAllEpisodes, (state: AppState, episodeIds: string[]) => episodeIds],
  (episodes, episodeIds) =>
    episodes.filter((episode) => episodeIds.includes(episode.id.toString()))
);

export default episodesSlice.reducer;