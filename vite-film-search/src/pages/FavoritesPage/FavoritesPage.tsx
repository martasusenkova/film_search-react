import { Feedback, MovieCard } from "components";
import { useEffect, useState } from "react";
import { fetchFavorites, getFavorites, useAppDispatch, useAppSelector } from "store";
import { FavoriteList } from "./styles";
import type { MovieInfo } from "types";
const FAVORITES_CACHE_KEY = "favorites_cache";

export const FavoritesPage = () => {
  const { favorites: storeFavorites } = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

  const [favorites, setFavorites] = useState(() => {
    const cached = localStorage.getItem(FAVORITES_CACHE_KEY);
    return cached ? JSON.parse(cached) : [];
  });

  useEffect(() => {
    if (!storeFavorites.length && !favorites.length) {
      dispatch(fetchFavorites());
    }
  }, [dispatch, storeFavorites.length, favorites.length]);

  useEffect(() => {
    if (storeFavorites.length) {
      setFavorites(storeFavorites);
      localStorage.setItem(FAVORITES_CACHE_KEY, JSON.stringify(storeFavorites));
    }
  }, [storeFavorites]);

  if (!favorites.length) {
    return <Feedback text="Favorites not found" />;
  }

  const uniqueFavorites: MovieInfo[] = Array.from(
    new Map(favorites.map((f: MovieInfo) => [f.imdbID, f])).values(),
  ) as MovieInfo[];

  return (
    <FavoriteList
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeIn", duration: 0.2 }}
    >
      {uniqueFavorites.map(({ imdbID, title, poster, genres, imdbRating }, idx) => (
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
