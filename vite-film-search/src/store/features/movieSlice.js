import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { moviesApi, transformMovieInfo } from "services";
const initialState = {
    movie: {},
    isLoading: false,
    error: null,
};
export const getMovieById = createAsyncThunk("movies/getMovie", async (id, { rejectWithValue }) => {
    try {
        return await moviesApi.getMovie(id);
    }
    catch (error) {
        const errorResponse = error;
        return rejectWithValue(errorResponse.message);
    }
});
const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getMovieById.pending, (state) => {
            state.error = null;
            state.isLoading = true;
        });
        builder.addCase(getMovieById.fulfilled, (state, { payload }) => {
            state.error = null;
            state.isLoading = false;
            state.movie = transformMovieInfo(payload);
        });
        builder.addCase(getMovieById.rejected, (state, { payload }) => {
            if (payload) {
                state.isLoading = false;
                state.error = payload;
                toast.error(payload);
            }
        });
    },
});
export default movieSlice.reducer;
