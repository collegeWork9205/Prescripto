import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../Context/AdminContext'
import { useNavigate } from 'react-router-dom';

import { DoctorsContext } from '../Context/DoctorsContext'
const Navbar = () => {
    const { aToken, setAToken } = useContext(AdminContext);
    const { dToken, setDToken } = useContext(DoctorsContext);
    const navigate = useNavigate();
    const logout = () => {
        navigate('/');
        aToken && setAToken('')
        aToken && localStorage.setItem('aToken', '')
    }
    const logoutdoc = () => {
        navigate('/');
        dToken && setDToken('')
        dToken && localStorage.setItem('dToken', '')
    }
    return (
        <div className='flex flex-row items-center justify-between border-b px-4 sm:px-10 py-3 bg-white'>
            <div className='flex flex-row gap-2 justify-end text-xs items-end'>
                <img className='w-30 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
                <p className='border rounded-full px-2.5 py-0.5 text-[#536fff] border-black font-extrabold '>{aToken ? 'Admin' : 'Doctor'}</p>
            </div>
            {
                aToken ?
                    <button onClick={logout} className='bg-[#536fff] px-10 py-2 text-white rounded text-sm'>Logout</button>
                    : <button onClick={logoutdoc} className='bg-[#536fff] px-10 py-2 text-white rounded text-sm'>Logout</button>
            }
        </div>
    )
}

export default Navbar