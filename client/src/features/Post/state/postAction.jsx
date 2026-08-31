import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllPostApi } from "../api/postApi";

export const getAllPostAction = createAsyncThunk("/post/getAllPost", async (_, thunkAPI) => {
    try {
        const response = await getAllPostApi();
        return response.posts
    } catch (error) {
        return thunkAPI.rejectWithValue(error.data?.message || "Error in Get all post")
    }
})