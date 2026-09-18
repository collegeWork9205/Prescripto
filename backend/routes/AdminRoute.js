import upload from "../middleware/multer.js";
import { addDoctors, adminLogin, allDoctors, appointmentAdmin, appointmentCancel, dashboardData } from "../controllers/adminController.js";
import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailiblity } from "../controllers/doctorsController.js";

const adminRouter = express.Router();

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctors);
adminRouter.post('/login', adminLogin)
adminRouter.post('/all-doctors', authAdmin, allDoctors)
adminRouter.post('/change-availbility', authAdmin, changeAvailiblity)
adminRouter.post('/appointments', authAdmin, appointmentAdmin)
adminRouter.post('/cancel-appointment', authAdmin, appointmentCancel)
adminRouter.post('/dashBorad', authAdmin, dashboardData)

export default adminRouter;