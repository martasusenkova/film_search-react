import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch, getMovie, getMovieById, addFavorite, getFavorites, getUser, } from "store";
import { useEffect } from "react";
import { Details, EncyclopedicTable, Genres, Plot, Poster, PosterWrapper, Ratings, StyledDetailsMoviePage, TextCell, WrapperRate, PosterControls, ControlButton, } from "./styles";
import { Feedback, Spinner, Title } from "components";
import { BookMarkIcon, IMDBIcon, ShareIcon } from "assets";
import { Icon } from "components";
export const DetailsPage = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const { movie, isLoading, error } = useAppSelector(getMovie);
    const { isAuth } = useAppSelector(getUser);
    const favState = useAppSelector(getFavorites);
    const favorites = favState.favorites;
    useEffect(() => {
        if (id)
            dispatch(getMovieById(id));
    }, [dispatch, id]);
    const tableValues = [
        { title: "Year", value: movie.year },
        { title: "Released", value: movie.released },
        { title: "BoxOffice", value: movie.boxOffice },
        { title: "Country", value: movie.country },
        { title: "Production", value: movie.production },
        { title: "Actors", value: movie.actors },
        { title: "Director", value: movie.director },
        { title: "Writers", value: movie.writer },
    ];
    const isFavorite = Boolean(movie && favorites.some((f) => f.imdbID === movie.imdbID));
    const handleFavorite = () => {
        dispatch(addFavorite(movie));
    };
    if (isLoading)
        return _jsx(Spinner, {});
    if (error)
        return _jsx(Feedback, { text: "Movie is not found" });
    return (_jsxs(StyledDetailsMoviePage, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { ease: "easeIn", duration: 0.5 }, children: [_jsxs(PosterWrapper, { children: [movie.poster === "N/A" ? (_jsx(Poster, { loading: "lazy", src: `https://via.placeholder.com/250.png?text=${movie.title}`, alt: "feedback image" })) : (_jsx(Poster, { loading: "lazy", src: movie.poster, alt: `poster ${movie.title}` })), _jsxs(PosterControls, { children: [_jsx(ControlButton, { "$active": Boolean(isFavorite), onClick: handleFavorite, disabled: !isAuth, children: _jsx(Icon, { icon: BookMarkIcon }) }), _jsx(ControlButton, { onClick: () => navigator?.share?.({ title: movie.title, url: window.location.href }), children: _jsx(Icon, { icon: ShareIcon }) })] })] }), _jsxs(Details, { children: [_jsx(Genres, { children: movie.genres && movie.genres.map((genre) => _jsx("p", { children: genre }, genre)) }), _jsx(Title, { text: movie.title, option: "H1" }), _jsxs(Ratings, { children: [_jsx(WrapperRate, { "$greenVariant": true, children: movie.imdbRating }), _jsxs(WrapperRate, { children: [_jsx(Icon, { icon: IMDBIcon }), " ", movie.imdbRating] }), _jsx(WrapperRate, { children: movie.runTime })] }), _jsx(Plot, { children: movie.plot }), _jsx(EncyclopedicTable, { children: _jsx("tbody", { children: tableValues.map((row) => (_jsxs("tr", { children: [_jsx(TextCell, { variant: "title", children: row.title }), _jsx(TextCell, { children: row.value })] }, row.title))) }) })] })] }));
};
