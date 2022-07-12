import express from "express"
import { otpGenerator } from "./otpGenerate/controller"
import { tokenGenerator } from "./otpGenerate/controller"
import { tokenDecode } from "./otpGenerate/controller"
const router = express.Router()
router.post('/contact',otpGenerator)
router.post('/contact/:phoneNumber',tokenGenerator)
router.post('/contact1',tokenDecode)
export default router