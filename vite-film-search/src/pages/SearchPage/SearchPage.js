import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, ButtonTop, MovieList } from "components";
import { useEffect, useState } from "react";
import { fetchSearchMovies, getSearchMovies, useAppDispatch, useAppSelector } from "store";
import { useParams, useSearchParams } from "react-router-dom";
import { PageBlock } from "ui";
export const SearchPage = () => {
    const { name } = useParams();
    const [searchParams] = useSearchParams();
    const year = searchParams.get("year");
    const type = searchParams.get("type");
    const [page, setPage] = useState(1);
    const handleShowMore = () => {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        setPage((prevPage) => ++prevPage);
    };
    const dispatch = useAppDispatch();
    useEffect(() => {
        if ((year || type) && name) {
            dispatch(fetchSearchMovies({ name, year, type, page }));
        }
        else
            name && dispatch(fetchSearchMovies({ name, page }));
    }, [dispatch, name, page, year, type]);
    const { movies, isLoading, error } = useAppSelector(getSearchMovies);
    return (_jsxs(PageBlock, { children: [_jsx(MovieList, { movies: movies, isLoading: isLoading, error: error }), _jsx(ButtonTop, {}), !error && !isLoading && movies.length >= 9 && (_jsx(Button, { text: "Show more", type: "button", option: "secondary", onClick: handleShowMore }))] }));
};
