import { createContext, useState } from 'react'
// import { doctors } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useEffect } from 'react';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const backend_url = import.meta.env.VITE_BACKEND_URL;
    const crncysymbol = '$';
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false)

    const getDoctors = async () => {
        try {
            const res = await axios.get(backend_url + '/api/doctor/list')
            if (res.data.success) {
                // console.log(res.data.list)
                setDoctors(res.data.list)
            } else {
                toast.error("There is No Doctor")
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const findUserProfileData = async () => {
        try {
            const { data } = await axios.get(backend_url + '/api/user/get-profile', { headers: { token } })
            // console.log(data)
            if (data.success) {
                setUserData(data.data)
            } else {
                toast.error("User not Found")
            }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    
    const value = {
        doctors,
        getDoctors,
        crncysymbol,
        backend_url,
        token,
        setToken,
        userData,
        setUserData,
        findUserProfileData,
    }
    useEffect(() => {
        if (token) {
            findUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;