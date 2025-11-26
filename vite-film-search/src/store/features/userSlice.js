import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getFirebaseErrorMessage, resetUserPassword, updateUserData, userLogOut, userSignIn, userSignUp, } from "services";
const initialState = {
    name: null,
    email: null,
    id: null,
    isAuth: false,
    isLoading: false,
    error: "",
};
// Async thunks
export const signUp = createAsyncThunk("user/signUp", async (userData, { rejectWithValue }) => {
    try {
        return await userSignUp(userData);
    }
    catch (error) {
        const firebaseError = error;
        return rejectWithValue(getFirebaseErrorMessage(firebaseError));
    }
});
export const signIn = createAsyncThunk("user/signIn", async (userData, { rejectWithValue }) => {
    try {
        return await userSignIn(userData);
    }
    catch (error) {
        const firebaseError = error;
        return rejectWithValue(getFirebaseErrorMessage(firebaseError));
    }
});
export const userSignOut = createAsyncThunk("user/signOut", async (_, { rejectWithValue }) => {
    try {
        await userLogOut();
    }
    catch (error) {
        const firebaseError = error;
        return rejectWithValue(getFirebaseErrorMessage(firebaseError));
    }
});
export const resetPassword = createAsyncThunk("user/resetPassword", async (email, { rejectWithValue }) => {
    try {
        await resetUserPassword(email);
        return email;
    }
    catch (error) {
        const firebaseError = error;
        return rejectWithValue(getFirebaseErrorMessage(firebaseError));
    }
});
export const updateUserProfile = createAsyncThunk("user/updateProfile", async (userData, { rejectWithValue }) => {
    try {
        await updateUserData(userData);
    }
    catch (error) {
        const firebaseError = error;
        return rejectWithValue(getFirebaseErrorMessage(firebaseError));
    }
});
// Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.id = action.payload.id;
            state.isAuth = !!action.payload.id;
        },
        clearUser: (state) => {
            state.name = null;
            state.email = null;
            state.id = null;
            state.isAuth = false;
            state.error = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signUp.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        });
        builder.addCase(signUp.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.name = payload.name;
            state.email = payload.email;
            state.id = payload.id;
            state.isAuth = true;
            toast.success(`${payload.name} is logged`);
        });
        builder.addCase(signUp.rejected, (state, { payload }) => {
            state.isLoading = false;
            if (payload) {
                state.error = payload;
                toast.error(payload);
            }
        });
        builder.addCase(signIn.pending, (state) => {
            state.isLoading = true;
            state.error = "";
        });
        builder.addCase(signIn.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.name = payload.name;
            state.email = payload.email;
            state.id = payload.id ?? state.id;
            state.isAuth = true;
            toast.success(`${payload.name} sign in`);
        });
        builder.addCase(signIn.rejected, (state, { payload }) => {
            state.isLoading = false;
            if (payload) {
                state.error = payload;
                toast.error(payload);
            }
        });
        builder.addCase(userSignOut.fulfilled, (state) => {
            toast.success("Logout is success");
            state.isAuth = false;
            state.name = null;
            state.email = null;
            state.id = null;
        });
        builder.addCase(userSignOut.rejected, (state, { payload }) => {
            if (payload) {
                state.error = payload;
                toast.error(payload);
            }
        });
        builder.addCase(resetPassword.fulfilled, (_, { payload }) => {
            toast.success(`You will receive an email ${payload} with a link to reset your password!`);
        });
        builder.addCase(resetPassword.rejected, (_, { payload }) => {
            if (payload)
                toast.error(payload);
        });
        builder.addCase(updateUserProfile.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateUserProfile.fulfilled, (state) => {
            state.isLoading = false;
            toast.success("Your Profile updated");
        });
        builder.addCase(updateUserProfile.rejected, (state, { payload }) => {
            state.isLoading = false;
            if (payload)
                toast.error(payload);
        });
    },
});
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
