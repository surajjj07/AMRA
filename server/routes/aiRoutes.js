import express from 'express'
import { reportReview } from '../controllers/aiController.js'

const aiRouter = express.Router()

aiRouter.post('/reviewreport', reportReview)

export default aiRouter