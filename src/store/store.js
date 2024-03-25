import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "./characterSlice";
import locationsReducer from "./locationsSlice";
import episodeReducer from "./episodeSlice";

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    locations: locationsReducer,
    episodes: episodeReducer,
  },
});
