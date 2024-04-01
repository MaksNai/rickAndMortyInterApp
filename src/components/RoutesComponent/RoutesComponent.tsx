import { Route, Routes, Navigate } from "react-router-dom";
import { FC } from "react";
import {
  MainCharacters,
  MainLocations,
  MainEpisodes,
  MainCharacterDetail,
  MainLocationDetail,
  MainEpisodeDetail,
  ErrorPage,
} from "..";

export const RoutesComponent: FC = () => (
  <Routes>
    <Route
      path="/rickAndMortyInterApp/characters"
      element={<MainCharacters />}
      errorElement={<ErrorPage />}
    />
    <Route
      path="/rickAndMortyInterApp/locations"
      element={<MainLocations />}
      errorElement={<ErrorPage />}
    />
    <Route
      path="/rickAndMortyInterApp/episodes"
      element={<MainEpisodes />}
      errorElement={<ErrorPage />}
    />
    <Route
      path="/rickAndMortyInterApp/characters/:characterId"
      element={<MainCharacterDetail />}
      errorElement={<ErrorPage />}
    />
    <Route
      path="/rickAndMortyInterApp/locations/:locationId"
      element={<MainLocationDetail />}
      errorElement={<ErrorPage />}
    />
    <Route
      path="/rickAndMortyInterApp/episodes/:episodeId"
      element={<MainEpisodeDetail />}
      errorElement={<ErrorPage />}
    />
    <Route
      path="/rickAndMortyInterApp/"
      element={<Navigate to="/rickAndMortyInterApp/characters" replace />}
      errorElement={<ErrorPage />}
    />
  </Routes>
);
