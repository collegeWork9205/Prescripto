import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
    const backend_Url = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctorsList] = useState([])
    const [appointments, setAppointments] = useState([])

    const getAllDoctors = async () => {
        try {
            const doc = await axios.post(backend_Url + '/api/admin/all-doctors', {}, { headers: { aToken } })
            if (doc.data.success) {
                setDoctorsList(doc.data.doctors)
            } else {
                toast.error("There is No Doctor")
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const updateAvailbility = async (docId) => {
        try {
            const { data } = await axios.post(backend_Url + '/api/admin/change-availbility', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                console.log(data)
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const getAllAppointment = async () => {
        try {
            const { data } = await axios.post(backend_Url + "/api/admin/appointments", {}, { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments);
                console.log(data.appointments)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const appointmentCancel = async (appointId) => {
        try {
            const { data } = await axios.post(backend_Url + "/api/admin/cancel-appointment", {appointId}, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllAppointment()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    const value = {
        aToken, setAToken,
        backend_Url,
        doctors,
        getAllDoctors,
        updateAvailbility,
        getAllAppointment,
        appointments, setAppointments,
        appointmentCancel
    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider;