import React, { useContext, useEffect, useState } from 'react'
import { AdminContext } from '../Context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorsContext } from '../Context/DoctorsContext'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const {setAToken, backend_Url } = useContext(AdminContext)
    const  {setDToken,backendUrl}=useContext(DoctorsContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backend_Url + '/api/admin/login', { email, password })
                if (data.success) {
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    toast.success("You Are Logged-In")
                } else {
                    toast.error(data.message)
                }

            } else {
                const { data } = await axios.post(backend_Url + '/api/doctor/docLogin', { email, password })
                if (data.success) {
                    localStorage.setItem('dToken', data.token);
                    setDToken(data.token);
                    toast.success("You Are Logged-In")
                } else {
                    toast.error(data.message)
                }
            }
        } catch (error) {
            console.log(error.message);
            toast.error(error.message)
        }
    }
    return (
        <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
            <div className='flex flex-col items-start m-auto gap-4 p-8 min-w-[340px] sm:min-w-96 border border-[#DADADA]  rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
                <p className='text-start text-2xl font-semibold m-auto'><span className='text-[#536fff]'>{state}</span> Login</p>
                <div className='w-full '>
                    <p className='text-sm font-semibold'>Email :</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} className='w-full mt-1 p-2 border border-[#DADADA] rounded' type="email" placeholder='Hai , Admin Enter email' required />
                </div>
                <div className='w-full'>
                    <p className='text-sm font-semibold'>Password :</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} className='w-full mt-1 p-2 border border-[#DADADA] rounded' type="password" placeholder='Hai , Admin Enter Password' required />
                </div>
                <button className='w-full border rounded-md py-2 px-8 bg-[#536fff] text-white m-auto mt-2'>Login</button>
                {
                    state === 'Admin'
                        ? <p className='text-sm font-semibold'>Doctors Login ?  <span onClick={() => setState('Doctors')} className='text-sm font-semibold text-blue-600 underline cursor-pointer'>click here</span></p>
                        : <p className='text-sm font-semibold'>Admin Login ?  <span onClick={() => setState('Admin')} className='text-sm font-semibold text-blue-600 underline cursor-pointer' >click here</span></p>
                }
            </div>
        </form>
    )
}

export default Login