import { MovieCard, Feedback } from "components";
import { InlineSpinner } from "components/InlineSpinner/InlineSpinner";
import type { Movie } from "types";
import { StyledMovieList } from "./styles";

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  error?: string | null;
}
export const MovieList = ({ movies, isLoading, error }: MovieListProps) => {
  if (movies.length === 0 || error) {
    return <Feedback text="Movies not found" />;
  }
  // Deduplicate movies by imdbID to avoid React key collisions when API returns duplicates
  const uniqueMap = new Map<string, Movie>();
  movies.forEach((m) => {
    if (m.imdbID) uniqueMap.set(m.imdbID, m);
  });
  const uniqueMovies = Array.from(uniqueMap.values());

  return (
    <StyledMovieList
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn", duration: 0.5 }}
    >
      {uniqueMovies &&
        uniqueMovies.map(({ imdbID, title, poster }, idx) => (
          // fallback key uses index when imdbID is unexpectedly missing
          <MovieCard key={imdbID ?? `movie-${idx}`} title={title} img={poster} id={imdbID} />
        ))}
      {isLoading && <InlineSpinner />}
    </StyledMovieList>
  );
};
