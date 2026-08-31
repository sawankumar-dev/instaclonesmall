import { Router } from 'express'
import { verifyJwt } from '../middlewares/verifyJwt.js';
import { createPost, getAllPost } from '../controller/post.controller.js';
import upload from '../config/multer.js';

const postRouter = Router()

postRouter.post("/create-post", verifyJwt, upload.single("image"), createPost)
postRouter.get("/", getAllPost)

export default postRouter;