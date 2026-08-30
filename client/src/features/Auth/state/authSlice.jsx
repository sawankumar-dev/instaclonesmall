import { createSlice } from '@reduxjs/toolkit'
import { loginUserAction } from './authAction';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(loginUserAction.pending, (state) => {
            state.isLoading = true
        })
        .addCase(loginUserAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true
            state.user = action.payload;
        })
        .addCase(loginUserAction.rejected, (state) => {
            state.isLoading = false;
        })
    }
})

export default authSlice;