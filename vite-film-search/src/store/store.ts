import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./features/favoritesSlice";
import movieReducer from "./features/movieSlice";
import moviesReducer from "./features/moviesSlice";
import searchReducer from "./features/searchSlice";
import themeReducer from "./features/themeSlice";
import trendsReducer from "./features/trendsSlice";
import userReducer from "./features/userSlice";
import filtersReducer from "./features/filtersSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    movie: movieReducer,
    movies: moviesReducer,
    search: searchReducer,
    theme: themeReducer,
    trends: trendsReducer,
    filters: filtersReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
