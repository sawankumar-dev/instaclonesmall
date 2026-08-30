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
}

export default new AuthService();