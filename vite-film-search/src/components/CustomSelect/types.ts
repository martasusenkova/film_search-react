export type MovieType = "movie" | "series" | "episode";

export interface SelectOption {
  value: MovieType;
  label: string;
}

export const MOVIE_TYPE_VALUES = {
  MOVIES: "movie" as MovieType,
  SERIES: "series" as MovieType,
  EPISODE: "episode" as MovieType,
};

export const MovieType = MOVIE_TYPE_VALUES;
