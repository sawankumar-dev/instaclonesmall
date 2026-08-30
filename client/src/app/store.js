import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/Auth/state/authSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    }
})