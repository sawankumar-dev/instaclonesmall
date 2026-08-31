import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi, myProfileApi, registerUserApi } from "../api/authApi";

export const loginUserAction = createAsyncThunk("/auth/login", async (data, thunkAPI) => {
    try {
        const response = await loginUserApi(data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.data?.message || "Error in Login user Action")
    }
})

export const registerUserAction = createAsyncThunk("/auth/register", async (data, thunkAPI) => {
    try {   
        const response = await registerUserApi(data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.data?.message || "Error in Register user Action")
    }
})
export const myProfileAction = createAsyncThunk("/auth/me", async (_, thunkAPI) => {
    try {   
        const response = await myProfileApi();
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.data?.message || "Error in Register user Action")
    }
})