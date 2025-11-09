import { Feedback, Spinner, MovieCard } from "components";
import { useEffect } from "react";
import { fetchFavorites, getFavorites, useAppDispatch, useAppSelector } from "store";
import { FavoriteList } from "./styles";

export const FavoritesPage = () => {
  const { favorites, isLoading } = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchFavorites());
  }, [dispatch]);
  if (isLoading) return <Spinner />;
  if (!favorites.length) {
    return <Feedback text="Favorites not found" />;
  }
  // dedupe favorites by imdbID in case duplicates exist
  const uniqueFavorites = Array.from(new Map(favorites.map((f) => [f.imdbID, f])).values());

  return (
    <FavoriteList
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn", duration: 0.5 }}
    >
      {uniqueFavorites &&
        uniqueFavorites.map(({ imdbID, title, poster, genres, imdbRating }, idx) => (
          <MovieCard
            key={imdbID ?? `fav-${idx}`}
            title={title}
            img={poster}
            id={imdbID}
            genres={genres}
            rating={imdbRating}
            favorite
          />
        ))}
    </FavoriteList>
  );
};
