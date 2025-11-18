import type { RootState } from "store";
import type { Movie } from "types";

const parseYear = (yearStr?: string) => {
  if (!yearStr) return NaN;
  const match = yearStr.match(/\d{4}/);
  return match ? parseInt(match[0], 10) : NaN;
};

const applyFilters = (movies: Movie[], filters: RootState["filters"]) => {
  if (!movies) return [];
  let result = movies.slice();

  // title filter (substring)
  if (filters.title && filters.title.trim()) {
    const q = filters.title.trim().toLowerCase();
    result = result.filter((m) => m.title && m.title.toLowerCase().includes(q));
  }

  // movie type filter
  if (filters.movieType) {
    result = result.filter(
      (m) => m.type && m.type.toLowerCase() === String(filters.movieType).toLowerCase(),
    );
  }

  // year range filter
  const from = filters.yearFrom ? parseInt(filters.yearFrom, 10) : NaN;
  const to = filters.yearTo ? parseInt(filters.yearTo, 10) : NaN;
  if (!isNaN(from) || !isNaN(to)) {
    result = result.filter((m) => {
      const y = parseYear(m.year);
      if (isNaN(y)) return false;
      if (!isNaN(from) && y < from) return false;
      if (!isNaN(to) && y > to) return false;
      return true;
    });
  }

  // sort
  if (filters.sortBy === "year") {
    result.sort((a, b) => parseYear(b.year) - parseYear(a.year));
  } else {
    // default sort by title
    result.sort((a, b) => a.title.localeCompare(b.title));
  }

  return result;
};

export const getFilteredMovies = (state: RootState) => {
  const movies = state.movies.movies;
  const filters = state.filters;
  return {
    movies: applyFilters(movies, filters),
    isLoading: state.movies.isLoading,
    error: state.movies.error,
  };
};

export const getFilteredSearchMovies = (state: RootState) => {
  const movies = state.search.movies;
  const filters = state.filters;
  return {
    movies: applyFilters(movies, filters),
    isLoading: state.search.isLoading,
    error: state.search.error,
  };
};
