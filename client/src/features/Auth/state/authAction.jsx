import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginUserApi } from "../api/authApi";

export const loginUserAction = createAsyncThunk("/auth/login", async (data, thunkAPI) => {
    try {
        const response = await loginUserApi(data);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.data?.message || "Error in Login user Action")
    }
})