export const transformMovies = (movies) => {
    return movies.map(({ Title, Year, Type, Poster, imdbID }) => ({
        title: Title,
        year: Year,
        type: Type,
        poster: Poster,
        imdbID,
    }));
};
