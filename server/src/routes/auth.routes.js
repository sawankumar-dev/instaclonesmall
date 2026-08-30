import { Router } from 'express'
import { registerUser } from '../controller/auth.controller.js'
import validate from '../validator/validate.js'
import { registerSchema } from '../schemas/auth.schema.js'

const authRouter = Router()

authRouter.post("/register",validate(registerSchema), registerUser)

export default authRouter