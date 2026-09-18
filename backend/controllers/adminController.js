import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 } from 'cloudinary'
import doctorModel from '../modals/doctorModel.js'
import connectCluadinary from '../config/claudinary.js'
import jwt from 'jsonwebtoken'
import { toast } from 'react-toastify'
import appointmentModel from '../modals/appointmentModel.js'
import userModel from '../modals/userModel.js'



// Api For Adding Doctors

const addDoctors = async (req, res) => {
     try {
          const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
          const imagefile = req.file;

          //Checking All data is Aavilable or Not 
          if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
               return res.json({ success: false, message: "Missing Details" });
          }
          //validating email
          if (!validator.isEmail(email)) {
               return res.json({ success: false, message: "Please enter Valid email" });
          }
          //validating password
          if (password.length < 8) {
               return res.json({ success: false, message: "Password Must be atleast 8 character" });
          }
          if (!validator.isStrongPassword(password)) {
               return res.json({ success: false, message: "The Password Must follow the Basic Password rule" })
          }
          //hashing doctors paasword
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          console.log(hashedPassword);

          //uplaod image to claudinary
          const imageUplaod = await v2.uploader.upload(imagefile.path, { resource_type: "image" })
          const imageUrl = imageUplaod.secure_url;

          const doctorData = {
               name,
               email,
               password: hashedPassword,
               speciality,
               image: imageUrl,
               degree,
               experience,
               about,
               fees,
               address: JSON.parse(address),
               date: Date.now()
          }
          const exists = await doctorModel.findOne({ email });
          if (exists) {
               return res.json({ success: false, message: "Email Or User Already exists" })
          }
          const newDoctor = new doctorModel(doctorData);
          newDoctor.save();
          res.json({ success: true, message: "Doctor Added" })

     } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message })
          toast.error(error.message)
     }
}

const adminLogin = async (req, res) => {
     try {
          const { email, password } = req.body;
          if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
               const token = jwt.sign(email + password, process.env.JWT_SECRET)
               res.json({ success: true, token })
          } else {
               return res.json({ success: false, message: "Invaild Credentials" })
          }
     } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message })
     }
}

const allDoctors = async (req, res) => {
     try {
          const doctors = await doctorModel.find({}).select('-password')
          res.json({ success: true, doctors })
     } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message })
     }
}


//api to fetch all appointment
const appointmentAdmin = async (req, res) => {
     try {
          const appointments = await appointmentModel.find({});
          res.json({ success: true, appointments })
     } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message })
     }
}


const appointmentCancel = async (req, res) => {
     try {
          const { appointId } = req.body;
          const appointmentData = await appointmentModel.findById(appointId)

          await appointmentModel.findByIdAndUpdate(appointId, { cancelled: true });

          //releasing appointment from doctors 
          const { docId, slotDate, slotTime } = appointmentData;
          const docData = await doctorModel.findById(docId)
          const slots_booked = docData.slots_booked;
          slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
          await doctorModel.findByIdAndUpdate(docId, { slots_booked })
          res.json({ success: true, message: "Appointment Cancelled By Doctor" })
     } catch (error) {
          console.log(error.message)
          res.json({ success: false, message: error.message })
     }
}

//api to get dashboard data for admin panel

const dashboardData = async (req, res) => {
     try {
          const doctors = await doctorModel.find({})
          const users = await userModel.find({})
          const appointments = await appointmentModel.find({})

          const dashData = {
               doctors: doctors.length,
               patient: users.length,
               appointments: appointments.length,
               latestAppointment: appointments.reverse().slice(0, 5)
          }
          res.json({ success: true, dashData })
     } catch (error) {
          console.log(error.message)
          res.json({ success: false, message: error.message })
     }
}

export { addDoctors, adminLogin, allDoctors, appointmentAdmin, appointmentCancel, dashboardData }