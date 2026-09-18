import { createContext, useState } from "react";
import { toast } from 'react-toastify'
import axios from 'axios'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const DoctorsContext = createContext();

const DoctorsContextProvider = (props) => {
    const backend_url = "https://prescripto-backend-kjp6.onrender.com"
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [appointments, setAppointments] = useState([])
    const navigate = useNavigate();
    const [dashData, setDashData] = useState([])
    const [docProfile, setDocProfile] = useState([])

    const docAppointments = async () => {
        try {
            const { data } = await axios.get(backend_url + "/api/doctor/docAppointment", { headers: { dToken } })
            console.log(data)
            if (data.success) {
                setAppointments(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    const appointmentComplete = async (appointId) => {
        try {
            const { data } = await axios.post(backend_url + "/api/doctor/appointmentComplete", { appointId }, { headers: { dToken } })
            if (data.success) {
                dashBoardData()
                toast.success("Appointment Completed")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }
    const appointmentCancel = async (appointId) => {
        try {
            const { data } = await axios.post(backend_url + "/api/doctor/appointmentCancel", { appointId }, { headers: { dToken } })
            if (data.success) {
                dashBoardData()
                toast.success("Appointment Cancel")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    const dashBoardData = async () => {
        try {
            const { data } = await axios.post(backend_url + "/api/doctor/doc-dashboard", {}, { headers: { dToken } })
            if (data.success) {
                setDashData(data.dashboardData)
                docAppointments()
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    const getdocProfile = async () => {
        try {
            const { data } = await axios.get(backend_url + "/api/doctor/doc-profile", { headers: { dToken } })
            if (data.success) {
                setDocProfile(data.Doctor)
                console.log(data)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error.message)
        }
    }

    const value = {
        dToken,
        setDToken,
        backend_url,
        docAppointments,
        appointments,
        setAppointments,
        appointmentCancel,
        appointmentComplete,
        dashBoardData,
        dashData,
        setDashData,
        docProfile,
        setDocProfile,
        getdocProfile
    }
    return (
        <DoctorsContext.Provider value={value}>
            {props.children}
        </DoctorsContext.Provider>
    )
}
export default DoctorsContextProvider;
