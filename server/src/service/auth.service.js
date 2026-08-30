import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

class AuthService {
    async registerUser(userData) {
        const { name, email, password } = userData;

        // Check if account exists or not
        const userExists = await User.findOne({ email });
        if(userExists) {
            throw new ApiError(409, "User already exists!")
        }
        const user = await User.create({
            name,
            email,
            password,
        })
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        user.refreshToken = refreshToken;

        await user.save()
        return {
            user,
            accessToken,
            refreshToken,
        }
    }
    async loginUser(credentials) {
        const { email, password } = credentials;
        const user = await User.findOne({ email })
        if(!user) {
            throw new ApiError(404, "User not found")
        }
        // check password
        const isPasswordCorrect = await user.comparePassword(password);
        if(!isPasswordCorrect) {
            throw new ApiError(401, "Invalid credentials")
        }
        const refreshToken = user.generateRefreshToken();
        const accessToken = user.generateAccessToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false })
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

        return {
            user: loggedInUser,
            accessToken,
            refreshToken,
        }

    }
}

export default new AuthService();