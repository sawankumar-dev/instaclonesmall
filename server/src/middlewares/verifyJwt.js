import jwt from 'jsonwebtoken'
import config from '../config/config.js';
import User from '../models/user.model.js';
import ApiError from '../utils/apiError.js';

export const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized request, token not found"
            })
        }
        // token verify
        const decodedToken = jwt.verify(token, config.ACCESS_TOKEN);
              // 3. CRASH PREVENTION: Check karo decoded sahi hai ya nahi
        if (!decodedToken) {
            return res.status(401).json({
                success: false,
                message: "Invalid token payload structure"
            });
        }
        const user = await User.findById(decodedToken._id)
        if(!user) {
            throw new ApiError(401, "Invalid access token")
        }
        req.user = user;
        next()
    } catch (error) {
        next(error)
    }
}