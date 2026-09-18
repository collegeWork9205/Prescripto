import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import { bookAppointment, CancelAppointment, getAppointment, getProfile, paymentRazorpay, RegisterUser, UpdateProfile, VerifyRazorpay } from "../controllers/UserController.js";
import { loginUser } from "../controllers/UserController.js";
import authUser from "../middleware/authUser.js";
import upload from "../middleware/multer.js";

const userRouter = express.Router()

userRouter.post('/register', RegisterUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile', authUser, getProfile)
userRouter.post('/update-profile', upload.single('image'), authUser, UpdateProfile)
userRouter.post('/book-appointment', authUser, bookAppointment)
userRouter.get('/get-appointment', authUser, getAppointment)
userRouter.post('/cancel-appointment', authUser, CancelAppointment)
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
userRouter.post('/verifyRazorpay', authUser, VerifyRazorpay)


export default userRouter