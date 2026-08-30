import { Router } from 'express'
import { loginUser, myProfile, registerUser } from '../controller/auth.controller.js'
import validate from '../validator/validate.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'
import { verifyJwt } from '../middlewares/verifyJwt.js'

const authRouter = Router()

authRouter.post("/register",validate(registerSchema), registerUser)
authRouter.post("/login", validate(loginSchema), loginUser)
authRouter.get("/me", verifyJwt, myProfile)

export default authRouter