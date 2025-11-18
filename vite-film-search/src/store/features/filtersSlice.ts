import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "store";

export type SortBy = "rating" | "year";

export interface FiltersState {
  sortBy: SortBy;
  title: string;
  genres: string[];
  yearFrom?: string;
  yearTo?: string;
  ratingFrom?: string;
  ratingTo?: string;
  country?: string;
  movieType?: string;
}

const initialState: FiltersState = {
  sortBy: "rating",
  title: "",
  genres: [],
  yearFrom: "",
  yearTo: "",
  ratingFrom: "",
  ratingTo: "",
  country: "",
  movieType: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<FiltersState>>) {
      return { ...state, ...action.payload } as FiltersState;
    },
    clearFilters() {
      return initialState;
    },
    addGenre(state, action: PayloadAction<string>) {
      if (!state.genres.includes(action.payload)) state.genres.push(action.payload);
    },
    removeGenre(state, action: PayloadAction<string>) {
      state.genres = state.genres.filter((g) => g !== action.payload);
    },
  },
});

export const { setFilters, clearFilters, addGenre, removeGenre } = filtersSlice.actions;
export const selectFilters = (state: RootState) => state.filters;
export default filtersSlice.reducer;
