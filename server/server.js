import express from 'express'
import env from 'dotenv'
import cors from 'cors'
import db from './config/Db.js'
import cookieParser from 'cookie-parser'
import userRouter from './routes/userRoutes.js'
import AuthRouter from './routes/authRouter.js'
import aiRouter from './routes/aiRoutes.js'

env.config()
const app = express()
const port=process.env.PORT||5000
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())
app.use(express.json())
app.use("/user", userRouter);
app.use("/auth", AuthRouter);
app.use("/ai",aiRouter)
app.get('/',(req, res) => {
    res.send("this is server")
})

app.listen(port,async() => {
    db
    console.log("Database connected successfuly")
    console.log("Server is started on port 8000");
})