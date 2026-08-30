import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"

import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/post", postRouter)

app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is Healthy!"
    })
})

export default app;