import { jsx as _jsx } from "react/jsx-runtime";
import { Feedback, Spinner, MovieCard } from "components";
import { useEffect, useState } from "react";
import { fetchFavorites, getFavorites, useAppDispatch, useAppSelector } from "store";
import { FavoriteList } from "./styles";
const FAVORITES_CACHE_KEY = "favorites_cache";
export const FavoritesPage = () => {
    const { favorites: storeFavorites, isLoading } = useAppSelector(getFavorites);
    const dispatch = useAppDispatch();
    const [favorites, setFavorites] = useState(() => {
        // получаем из localStorage при первом рендере
        const cached = localStorage.getItem(FAVORITES_CACHE_KEY);
        return cached ? JSON.parse(cached) : [];
    });
    useEffect(() => {
        // если в store нет данных и кэша пусто — загружаем с сервера
        if (!storeFavorites.length && !favorites.length) {
            dispatch(fetchFavorites());
        }
    }, [dispatch, storeFavorites.length, favorites.length]);
    // синхронизируем локальный стейт с store после загрузки
    useEffect(() => {
        if (storeFavorites.length) {
            setFavorites(storeFavorites);
            localStorage.setItem(FAVORITES_CACHE_KEY, JSON.stringify(storeFavorites));
        }
    }, [storeFavorites]);
    if (isLoading && !favorites.length)
        return _jsx(Spinner, {});
    if (!favorites.length) {
        return _jsx(Feedback, { text: "Favorites not found" });
    }
    const uniqueFavorites = Array.from(new Map(favorites.map((f) => [f.imdbID, f])).values());
    return (_jsx(FavoriteList, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { ease: "easeIn", duration: 0.2 }, children: uniqueFavorites.map(({ imdbID, title, poster, genres, imdbRating }, idx) => (_jsx(MovieCard, { title: title, img: poster, id: imdbID, genres: genres, rating: imdbRating, favorite: true }, imdbID ?? `fav-${idx}`))) }));
};
