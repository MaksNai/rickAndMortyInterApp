export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
}

export interface CharacterCardProps {
  character: Character;
}

export interface CharactersCardProps {
  characters: Character[];
}

export interface CharacterState {
  maxPage: number;
  entities: Character[]; 
  charactersByIds: Character[];
  loading: boolean | null;
  error: string | null | undefined;
  hasMore: boolean;
  filters: {
    name: string;
    species: string;
    status: string;
    gender: string;
  };
}

interface LocationState {
  maxPage: number;
  entities: Character[]; 
  locationsByIds: Character[];
  loading: boolean | null;
  error: string | null;
  hasMore: boolean;
  filters: {
    name: string;
    type: string;
    dimension: string;
  };
}

interface EpisodeState {
  maxPage: number;
  entities: Character[]; 
  episodesByIds: Character[];
  loading: boolean | null;
  error: string | null;
  hasMore: boolean;
  filters: {
    name: string;
  };
}

export interface AppState {
  characters: CharacterState;
  locations: LocationState;
  episodes: EpisodeState;
}

export interface SelectFilterLabel {
  label: string;
  items: string[];
}

export interface FetchCharactersPayload {
  results: Character[];
  info: {
    pages: number;
    next: string | null;
  };
}

export interface FetchCharactersArgs {
  page?: number;
}

export interface RootState {
  characters: CharacterState;
}