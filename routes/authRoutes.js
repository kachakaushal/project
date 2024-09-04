import express from "express"
import { ragisterController, loginController } from '../controller/authController.js'

//router object
const router = express.Router()

//routing

//ragister || method post
router.post('/ragister', ragisterController)

//login || post
router.post("/login", loginController)

export default router