import express from "express";
import authAdmin from "../middleware/authAdmin.js";
import { appointmentCancelled, appointmentComplete, appointmentDoctor, dashBoardData, doctorLogin, DoctorProfile, DoctorsList, updateDoctorProfile } from "../controllers/doctorsController.js";
import authDoctor from "../middleware/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get('/list', DoctorsList)
doctorRouter.post('/docLogin', doctorLogin)
doctorRouter.get('/docAppointment', authDoctor, appointmentDoctor)
doctorRouter.post('/appointmentComplete', authDoctor, appointmentComplete)
doctorRouter.post('/appointmentCancel', authDoctor, appointmentCancelled)
doctorRouter.post('/doc-dashboard', authDoctor, dashBoardData)
doctorRouter.get('/doc-profile', authDoctor, DoctorProfile)
doctorRouter.post('/docProfile-update', authDoctor, updateDoctorProfile)


export default doctorRouter;