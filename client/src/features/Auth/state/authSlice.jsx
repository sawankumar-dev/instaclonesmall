import { createSlice } from '@reduxjs/toolkit'
import { loginUserAction, myProfileAction, registerUserAction } from './authAction';

const initialState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(loginUserAction.pending, (state) => {
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
        .addCase(registerUserAction.pending, (state) => {
            state.isLoading = true
        })
        .addCase(registerUserAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true
            state.user = action.payload;
        })
        .addCase(registerUserAction.rejected, (state) => {
            state.isLoading = false;
        })
        .addCase(myProfileAction.pending, (state) => {
            state.isLoading = true
        })
        .addCase(myProfileAction.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true
            state.user = action.payload;
        })
        .addCase(myProfileAction.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload
        })
    }
})

export default authSlice;