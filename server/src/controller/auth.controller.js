import config from "../config/config.js";
import authService from "../service/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

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