import dotenv from 'dotenv'
dotenv.config()


const config = {
    PORT: process.env.PORT,
    ACCESS_TOKEN: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY,
    REFRESH_TOKEN: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY,
    NODE_ENV: process.env.NODE_ENV,
}
export default config