import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ROUTE } from "router";
import { generatePath } from "react-router-dom";
import { StyledMovieCard, Poster, Title, Genres, Rate, FavoriteButton } from "./styles";
import { RouterLink } from "components";
import { BookMarkIcon } from "assets";
import { Icon } from "components";
import { deleteFavorite, removeFavoriteLocal, useAppDispatch } from "store";
export const MovieCard = ({ id, title, img, genres, rating, favorite }) => {
    const dispatch = useAppDispatch();
    const handleFavorite = () => {
        if (!id)
            return;
        // optimistic UI: remove locally first so the card disappears instantly
        dispatch(removeFavoriteLocal(id));
        dispatch(deleteFavorite(id)).catch(() => {
            // On failure we could re-fetch favorites or show a message; userSlice already shows toast on error.
        });
    };
    return (_jsxs(StyledMovieCard, { children: [rating && _jsx(Rate, { children: rating }), favorite && (_jsx(FavoriteButton, { "$active": Boolean(favorite), onClick: handleFavorite, children: _jsx(Icon, { icon: BookMarkIcon }) })), _jsxs(RouterLink, { to: generatePath(`${ROUTE.HOME + ROUTE.MOVIE}`, { id }), children: [img === "N/A" ? (_jsx(Poster, { loading: "lazy", src: `https://via.placeholder.com/250.png?text=${title}`, alt: "Not found" })) : (_jsx(Poster, { loading: "lazy", src: img, alt: `poster ${title}` })), _jsx(Title, { children: title }), genres && (_jsx(Genres, { children: genres.map((genre) => (_jsx("span", { children: genre }, genre))) }))] })] }));
};
