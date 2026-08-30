import config from "../config/config.js";
import User from "../models/user.model.js";
import authService from "../service/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import jwt from 'jsonwebtoken';

const options = {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "lax"
}
export const registerUser = asyncHandler(async (req, res) => {
    const { user, accessToken, refreshToken} = await authService.registerUser(req.body);

    res.cookie("accessToken", accessToken, options)
    res.cookie("refreshToken", refreshToken, options)
    return res.status(201).json(
        new ApiResponse(201, "User Register Successfully!", user)
    )
})

export const loginUser = asyncHandler( async (req, res) => {
    const { user, accessToken, refreshToken } = await authService.loginUser(req.body);
    res.cookie("accessToken", accessToken, options)
    res.cookie("refreshToken", refreshToken, options)
    return res.status(200).json(
        new ApiResponse(200, "Login successfully!", user)
    )
})

export const myProfile = asyncHandler(async (req, res) => {
    const user = req.user
    return res.status(200).json(
        new ApiResponse(200, "User Profile fetched successfully!", user)
    )
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies?.refreshToken;
    const { refreshToken, accessToken } = await authService.refreshAccessToken(incomingRefreshToken);
    res.cookie("accessToken", accessToken, options)
    res.cookie("refreshToken", refreshToken, options)
    return res.status(200).json(
        new ApiResponse(200, "Access token refresh successfully")
    )
})