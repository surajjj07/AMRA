import express from 'express'
import { LogIn, logOut, setProfile, SignUp } from '../controllers/userController.js'
import auth from '../middleware/auth.js'
import { upload } from '../middleware/multer.js'
const userRouter = express.Router()

userRouter.post("/signup", SignUp)
userRouter.post("/login", LogIn)
userRouter.post("logout", logOut);
userRouter.post("profile", auth, upload.single("image"), setProfile);

export default userRouter