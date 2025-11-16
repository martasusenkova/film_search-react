import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import type { Movie, MovieSearchAPI, RequestOption } from "types";
import { moviesApi, transformMovies } from "services";
import { toast } from "react-toastify";

interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
  error: string | null;
}

const initialState: MoviesState = {
  movies: [],
  isLoading: false,
  error: null,
};

export const fetchHomeMovies = createAsyncThunk<
  MovieSearchAPI | undefined,
  RequestOption,
  { rejectValue: string }
>("movies/fetchHomeMovies", async (options, { rejectWithValue }) => {
  try {
    return await moviesApi.getSearchMovies(options);
  } catch (error) {
    const errorResponse = error as AxiosError;
    return rejectWithValue(errorResponse.message);
  }
});

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchHomeMovies.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchHomeMovies.fulfilled, (state, action) => {
      const payload = action.payload;
      if (payload) {
        state.isLoading = false;
        state.error = null;

        if (payload.Response === "True") {
          // If the request asked for page > 1, append; otherwise replace the list.
          const arg = action.meta.arg as RequestOption | undefined;
          const page = arg?.page ?? 1;
          const newMovies = transformMovies(payload.Search);
          if (page > 1) {
            state.movies.push(...newMovies);
          } else {
            state.movies = newMovies;
          }
        }
      }
    });
    builder.addCase(fetchHomeMovies.rejected, (state, { payload }) => {
      if (payload) {
        state.isLoading = false;
        state.error = payload;
        toast.error(payload);
      }
    });
  },
});

export default moviesSlice.reducer;
