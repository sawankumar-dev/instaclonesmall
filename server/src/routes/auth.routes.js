import { Router } from 'express'
import { loginUser, registerUser } from '../controller/auth.controller.js'
import validate from '../validator/validate.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'

const authRouter = Router()

authRouter.post("/register",validate(registerSchema), registerUser)
authRouter.post("/login", validate(loginSchema), loginUser)

export default authRouter