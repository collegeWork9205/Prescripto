import validator from 'validator'
import { toast } from 'react-toastify'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import userModel from '../modals/userModel.js'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../modals/doctorModel.js'
import appointmentModel from '../modals/appointmentModel.js'
import razorpay from 'razorpay'

//Register Users

const RegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Please Fill all the details" })
            toast.error("Please Fill all the details")
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter Valid Email" })
            toast.error("Please enter Valid Email")
        }
        if (validator)
            if (password.length < 8) {
                return res.json({ success: false, message: "Password must greater than 8 char" })
                toast.error("Password must greater than 8 char")
            }
        if (!validator.isStrongPassword(password)) {
            return res.json({ success: false, message: "The Password Must follow the Basic Password rule" })
            toast.error("The Password Must follow the Basic Password rule")
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const Userdata = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new userModel(Userdata)
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user doesn't exist" })
        }
        const Is_Match = await bcrypt.compare(password, user.password)
        if (Is_Match) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid Credential" })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const getProfile = async (req, res) => {
    try {
        const userId = req.userId;
        // console.log(userId)
        const data = await userModel.findById(userId).select("-password");
        res.json({ success: true, data })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

const UpdateProfile = async (req, res) => {
    try {
        const userId = req.userId;
        console.log(userId)
        const { name, phone, address, gender, dob } = req.body;
        const imgFile = req.file
        if (!name || !phone || !address || !gender || !dob) {
            return res.json({ success: false, message: "Data Is Missing" })
        }
        await userModel.findByIdAndUpdate(userId, { name, address: JSON.parse(address), gender, dob, phone });

        if (imgFile) {
            const imageUpload = await cloudinary.uploader.upload(imgFile.path, { resource_type: 'image' })
            const imgUrl = imageUpload.secure_url;

            await userModel.findByIdAndUpdate(userId, { image: imgUrl });
        }
        res.json({ success: true, message: "Profile Updated" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


//Api to  Book Appointment 

const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body;
        const userId = req.userId;
        console.log(userId, docId, slotDate, slotTime)
        if (!userId || !docId || !slotDate || !slotTime) {
            return res.json({ success: false, message: "please provide all info" })
        }
        const docData = await doctorModel.findById(docId).select('-password');

        if (!docData.available) {
            return res.json({ success: false, message: "Doctor Not Available" })
        }

        let slot_booked = docData.slots_booked

        //checking for slot availablity
        if (slot_booked[slotDate]) {
            if (slot_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: "Slot Not Available" })
            } else {
                slot_booked[slotDate].push(slotTime);
            }
        } else {
            slot_booked[slotDate] = []
            slot_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')

        delete docData.slot_booked
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotDate,
            slotTime,
            date: Date.now(),

        }

        const NewAppointment = await appointmentModel(appointmentData)
        NewAppointment.save();

        //save new slot in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked: slot_booked })
        res.json({ success: true, message: "Appointment Booked" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

//getting all appointment  with is made by the user
const getAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const data = await appointmentModel.find({ userId })
        if (data) {
            res.json({ success: true, data })
        } else {
            res.json({ success: false, message: data.message })
        }

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


//api is used to cancel appointment

const CancelAppointment = async (req, res) => {
    try {
        const userId = req.userId;
        const { appointId } = req.body;
        const appointmentData = await appointmentModel.findById(appointId)

        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "UnAuthorized Action" })
        }
        await appointmentModel.findByIdAndUpdate(appointId, { cancelled: true });

        //releasing appointment from doctors 

        const { docId, slotDate, slotTime } = appointmentData;
        const docData = await doctorModel.findById(docId)
        const slots_booked = docData.slots_booked;
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appointment Cancelled" })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// api for accepting payment fron razorpay

const razorpayInstanses = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const paymentRazorpay = async (req, res) => {
    try {
        const { appointId } = req.body;
        const appointmentData = await appointmentModel.findById(appointId)
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: true, message: "Payment is Cancelled or not found" })
        }
        console.log(appointmentData.amount)
        // creating option for razorpay
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointId
        }

        // craeting an order
        const order = await razorpayInstanses.orders.create(options)

        res.json({ success: true, order })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}


//api to verify payment of razorpay 

const VerifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;
        const orderInfo = await razorpayInstanses.orders.fetch(razorpay_order_id)
        if (orderInfo.status === "paid") {
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            res.json({ success: true, message: "Payment Successful" })
        } else {
            res.json({ success: false, message: "Payment Failed" })
        }
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}
export { RegisterUser, loginUser, getProfile, UpdateProfile, bookAppointment, getAppointment, CancelAppointment, paymentRazorpay, VerifyRazorpay }