import express from "express"
import multer from 'multer';
import { uploadFile } from "./service/storage.service.js";
import postModel from "./models/post.model.js";
import authRouter from "./routes/auth.routes.js";

const app = express()
app.use(express.json())

const storage = multer.memoryStorage()
const upload = multer({ storage });

app.use("/api/v1/auth", authRouter)
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Server is Healthy!"
    })
})

app.post("/create-post", upload.single("image"), async (req, res) => {
    const result = await uploadFile(req.file.buffer);
    const newPost = await postModel.create({
        image: result.url,
        caption: req.body.caption,
    })
    return res.status(201).json({
        success: true,
        message: "Post created successfully!",
        post: newPost
    })
})

export default app;