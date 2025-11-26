import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFavoriteToStore, deleteFavoriteFromStore, FirebaseErrorMessage, getFavoritesFromStore, getFirebaseErrorMessage, } from "services";
import { toast } from "react-toastify";
// --- вспомогательные функции для кэша в localStorage ---
const FAVORITES_CACHE_KEY = "favorites_cache";
const getFavoritesCache = () => {
    const data = localStorage.getItem(FAVORITES_CACHE_KEY);
    return data ? JSON.parse(data) : [];
};
const setFavoritesCache = (favorites) => {
    localStorage.setItem(FAVORITES_CACHE_KEY, JSON.stringify(favorites));
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const clearFavoritesCache = () => {
    localStorage.removeItem(FAVORITES_CACHE_KEY);
};
const initialState = {
    favorites: getFavoritesCache(),
    isLoading: false,
    deletingIds: [],
    pendingIds: [],
};
// --- Thunks ---
export const addFavorite = createAsyncThunk("favorites/add", async (movieInfo, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const { id } = state.user;
        if (id) {
            await addFavoriteToStore(movieInfo, id);
            return movieInfo;
        }
        return rejectWithValue(FirebaseErrorMessage.UNKNOWN_ERROR);
    }
    catch (error) {
        const firebaseError = error;
        return rejectWithValue(getFirebaseErrorMessage(firebaseError));
    }
});
export const fetchFavorites = createAsyncThunk("favorites/fetch", async (_, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const { id } = state.user;
        if (!id)
            return [];
        const data = await getFavoritesFromStore(id);
        return data;
    }
    catch (error) {
        const firebaseError = error;
        return rejectWithValue(getFirebaseErrorMessage(firebaseError));
    }
});
export const deleteFavorite = createAsyncThunk("favorites/delete", async (movieId, { rejectWithValue, getState }) => {
    try {
        const state = getState();
        const { id } = state.user;
        if (id)
            await deleteFavoriteFromStore(movieId, id);
        return movieId;
    }
    catch (error) {
        const firebaseError = error;
        return rejectWithValue(getFirebaseErrorMessage(firebaseError));
    }
});
// --- Slice ---
const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        removeFavoriteLocal(state, action) {
            const movieId = action.payload;
            state.favorites = state.favorites.filter((f) => f.imdbID !== movieId);
            setFavoritesCache(state.favorites);
        },
    },
    extraReducers(builder) {
        // --- addFavorite ---
        builder.addCase(addFavorite.pending, (state, action) => {
            const movieArg = action.meta.arg;
            if (movieArg && !state.favorites.some((f) => f.imdbID === movieArg.imdbID)) {
                state.favorites.push(movieArg);
                state.pendingIds = state.pendingIds || [];
                state.pendingIds.push(movieArg.imdbID);
                setFavoritesCache(state.favorites);
            }
        });
        builder.addCase(addFavorite.fulfilled, (state, { payload }) => {
            state.pendingIds = state.pendingIds?.filter((id) => id !== payload.imdbID);
            if (!state.favorites.some((f) => f.imdbID === payload.imdbID)) {
                state.favorites.push(payload);
            }
            setFavoritesCache(state.favorites);
            toast.success("Success add to your Favorites");
        });
        builder.addCase(addFavorite.rejected, (state, { payload, meta }) => {
            const movieArg = meta.arg;
            state.pendingIds = state.pendingIds?.filter((id) => id !== movieArg.imdbID);
            state.favorites = state.favorites.filter((f) => f.imdbID !== movieArg.imdbID);
            setFavoritesCache(state.favorites);
            toast.error(String(payload));
        });
        // --- fetchFavorites ---
        builder.addCase(fetchFavorites.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchFavorites.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            if (payload) {
                state.favorites = payload;
                setFavoritesCache(payload);
            }
        });
        builder.addCase(fetchFavorites.rejected, (state, { payload }) => {
            state.isLoading = false;
            toast.error(String(payload));
        });
        // --- deleteFavorite ---
        builder.addCase(deleteFavorite.pending, (state, action) => {
            const movieId = action.meta.arg;
            state.deletingIds = state.deletingIds || [];
            if (!state.deletingIds.includes(movieId))
                state.deletingIds.push(movieId);
        });
        builder.addCase(deleteFavorite.fulfilled, (state, { payload }) => {
            state.favorites = state.favorites.filter((f) => f.imdbID !== payload);
            state.deletingIds = state.deletingIds?.filter((id) => id !== payload);
            setFavoritesCache(state.favorites);
            toast.success("Movie deleted from favorites");
        });
        builder.addCase(deleteFavorite.rejected, (state, { payload, meta }) => {
            state.deletingIds = state.deletingIds?.filter((id) => id !== meta.arg);
            toast.error(String(payload));
        });
    },
});
export default favoritesSlice.reducer;
export const { removeFavoriteLocal } = favoritesSlice.actions;
