import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/state/authSlice";
import postSlice from "../features/Post/state/postSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        post: postSlice.reducer,
    }
})