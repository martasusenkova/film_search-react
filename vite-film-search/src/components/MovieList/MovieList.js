import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MovieCard, Feedback } from "components";
import { InlineSpinner } from "components/InlineSpinner/InlineSpinner";
import { StyledMovieList } from "./styles";
export const MovieList = ({ movies, isLoading, error }) => {
    if (movies.length === 0 || error) {
        return _jsx(Feedback, { text: "Movies not found" });
    }
    // Deduplicate movies by imdbID to avoid React key collisions when API returns duplicates
    const uniqueMap = new Map();
    movies.forEach((m) => {
        if (m.imdbID)
            uniqueMap.set(m.imdbID, m);
    });
    const uniqueMovies = Array.from(uniqueMap.values());
    return (_jsxs(StyledMovieList, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { ease: "easeIn", duration: 0.5 }, children: [uniqueMovies &&
                uniqueMovies.map(({ imdbID, title, poster }, idx) => (
                // fallback key uses index when imdbID is unexpectedly missing
                _jsx(MovieCard, { title: title, img: poster, id: imdbID }, imdbID ?? `movie-${idx}`))), isLoading && _jsx(InlineSpinner, {})] }));
};
