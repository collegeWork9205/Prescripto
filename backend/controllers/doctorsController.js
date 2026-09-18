import doctorModel from '../modals/doctorModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import appointmentModel from '../modals/appointmentModel.js';

const changeAvailiblity = async (req, res) => {
    try {
        const { docId } = req.body;
        const doc = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !doc.available })
        res.json({ success: true, message: "availability Changed" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
const DoctorsList = async (req, res) => {
    try {
        const list = await doctorModel.find({}).select(["-password,-email"])
        res.json({ success: true, list })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


const doctorLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: "Invalid Credential" })
        }
        const isMatch = await bcrypt.compare(password, doctor.password)
        if (isMatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid Credential" })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

//api to get all appoitnment for the specific doctor panel
const appointmentDoctor = async (req, res) => {
    try {
        const docId = req.docId;
        const appointments = await appointmentModel.find({ docId: docId })
        res.json({ success: true, appointments })
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error.message)
    }
}
//api to complete  appointment for the specific doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointId } = req.body;
        const appointmentData = await appointmentModel.findById(appointId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointId, { isCompleted: true })
            res.json({ success: true, message: "Appointment Completed" })
        } else {
            res.json({ success: false, message: "Mark Failed" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error.message)
    }
}

//api to cancel appopintment
const appointmentCancelled = async (req, res) => {
    try {
        const docId = req.docId;
        const { appointId } = req.body;
        const appointmentData = await appointmentModel.findById(appointId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointId, { cancelled: true })
            res.json({ success: true, message: "Appointment cancelled" })
        } else {
            res.json({ success: false, message: "Error" })
        }
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error.message)
    }
}


//api to pass dashboard data

const dashBoardData = async (req, res) => {
    try {
        const docId = req.docId

        const appointments = await appointmentModel.find({ docId: docId })

        let earning = 0;

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earning += item.amount;
            }
        })

        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashboardData = {
            earning,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointment: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashboardData })
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error.message)
    }
}

//api to find the doctor profile
const DoctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const Doctor = await doctorModel.findById(docId).select("-password")
        res.json({ success: true, Doctor })
    } catch (error) {
        res.json({ success: false, message: error.message })
        console.log(error.message)
    }
}

//api to update profile
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const { fees, address, available } = req.body;
        const Doctor = await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
        res.json({ success: true, message: "Updated SuccessFully" })
    } catch (error) {
        res.json({ success: false, message: error })
        console.log(error)
    }
}
export { changeAvailiblity, DoctorsList, doctorLogin, appointmentDoctor, appointmentComplete, appointmentCancelled, dashBoardData, DoctorProfile, updateDoctorProfile };