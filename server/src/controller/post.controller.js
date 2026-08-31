import postModel from "../models/post.model.js";
import { uploadFile } from "../service/storage.service.js";
import asyncHandler from "../utils/asyncHandler.js";

export const createPost = asyncHandler( async (req, res) => {
    const result = await uploadFile(req.file.buffer);
    const newPost = await postModel.create({
        user: req.user._id,
        image: result.url,
        caption: req.body.caption,
    })
    return res.status(201).json({
        success: true,
        message: "Post created successfully!",
        post: newPost
    })
})

export const getAllPost = asyncHandler(async (req, res) => {
    const posts = await postModel.find().populate("user", "name email");
    return res.status(200).json({
        success: true,
        message: "Post fetched successfully",
        posts,
    })
})