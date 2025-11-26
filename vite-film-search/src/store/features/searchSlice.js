import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { moviesApi, transformMovies } from "services";
import { toast } from "react-toastify";
const initialState = {
    movies: [],
    isLoading: false,
    error: null,
};
export const fetchSearchMovies = createAsyncThunk("movies/fetchSearchMovies", async (options, { rejectWithValue }) => {
    try {
        return await moviesApi.getSearchMovies(options);
    }
    catch (error) {
        const errorResponse = error;
        return rejectWithValue(errorResponse.message);
    }
});
const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchSearchMovies.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchSearchMovies.fulfilled, (state, { payload }) => {
            if (payload) {
                state.isLoading = false;
                state.error = null;
                state.movies = transformMovies(payload.Search);
            }
        });
        builder.addCase(fetchSearchMovies.rejected, (state, { payload }) => {
            if (payload) {
                state.isLoading = false;
                state.error = payload;
                toast.error(payload);
            }
        });
    },
});
export default searchSlice.reducer;
