import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    theme: "dark",
};
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state, { payload }) => {
            state.theme = payload;
        },
    },
});
export default themeSlice.reducer;
export const { toggleTheme } = themeSlice.actions;
