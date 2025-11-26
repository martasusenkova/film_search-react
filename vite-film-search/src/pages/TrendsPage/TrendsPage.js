import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, ButtonTop, MovieList } from "components";
import { useAppSelector, useAppDispatch, getTrends, fetchTrends } from "store";
import { PageBlock } from "ui";
export const TrendsPage = () => {
    const { trends, isLoading, error } = useAppSelector(getTrends);
    const [page, setPage] = useState(1);
    const dispatch = useAppDispatch();
    const handleShowMore = () => setPage((prevPage) => ++prevPage);
    const words = ["bullet", "horror", "avengers", "hero", "predator"];
    const randomSelection = words[Math.floor(Math.random() * words.length)];
    useEffect(() => {
        const requestOption = {
            name: randomSelection,
            page: page,
        };
        dispatch(fetchTrends(requestOption));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page]);
    return (_jsxs(PageBlock, { children: [_jsx(MovieList, { movies: trends, isLoading: isLoading, error: error }), _jsx(ButtonTop, {}), !isLoading && !!trends.length && (_jsx(Button, { text: "Show more", type: "button", option: "secondary", onClick: handleShowMore }))] }));
};
