import { createSlice } from "@reduxjs/toolkit"
import { getAllPostAction } from "./postAction";

const postSlice = createSlice({
    name: "post",
    initialState: {
        posts: null,
        isLoading: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllPostAction.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllPostAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.posts = action.payload;
            })
            .addCase(getAllPostAction.rejected, (state) => {
                state.isLoading = false
            })
    }
})

export default postSlice;