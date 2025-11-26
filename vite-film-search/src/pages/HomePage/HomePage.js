import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, ButtonTop, MovieList } from "components";
import { fetchHomeMovies, getMovies, useAppDispatch, useAppSelector } from "store";
import { PageBlock } from "ui";
export const HomePage = () => {
    const { movies, isLoading, error } = useAppSelector(getMovies);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(1);
    const handleShowMore = () => setPage((prevPage) => ++prevPage);
    const words = ["spider", "star wars", "alien", "Transformers", "evil"];
    const randomSelection = words[Math.floor(Math.random() * words.length)];
    useEffect(() => {
        const requestOption = {
            name: randomSelection,
            page: page,
        };
        dispatch(fetchHomeMovies(requestOption));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page]);
    return (_jsxs(PageBlock, { children: [_jsx(MovieList, { movies: movies, isLoading: isLoading, error: error }), _jsx(ButtonTop, {}), !isLoading && !!movies.length && (_jsx(Button, { text: "Show more", type: "button", option: "secondary", onClick: handleShowMore }))] }));
};
