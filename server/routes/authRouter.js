import express from 'express'
import auth from '../middleware/auth.js'
import { getUser } from '../controllers/authController.js'

const AuthRouter = express.Router()

AuthRouter.get("/getuser", auth, getUser);

export default AuthRouter