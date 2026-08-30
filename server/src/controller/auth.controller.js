import authService from "../service/auth.service.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
    const user = await authService.registerUser(req.body);
    return res.status(201).json(
        new ApiResponse(201, "User Register Successfully!", user)
    )
})