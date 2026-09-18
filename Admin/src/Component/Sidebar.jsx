import React, { useContext } from 'react'
import { AdminContext } from '../Context/AdminContext'
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { DoctorsContext } from '../Context/DoctorsContext';

const Sidebar = () => {
    const { aToken } = useContext(AdminContext);
    const { dToken } = useContext(DoctorsContext)
    return (
        <div className='min-h-screen bg-white border-r'>
            {
                aToken && <ul className='text-[#515151] mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-2 md:px-9 min-w-32 max-sm:min-w-15 max-lg:min-w-25 xl:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#536fff]' : ''}`} to={'/admin-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p className='text-xs sm:text-sm max-lg:hidden'>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-2 md:px-9 min-w-32 max-sm:min-w-15 max-lg:min-w-25 xl:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#536fff]' : ''}`} to={'/all-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p className='text-xs sm:text-sm max-lg:hidden'>Appointments</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-2 md:px-9 min-w-32 max-sm:min-w-15 max-lg:min-w-25 xl:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#536fff]' : ''}`} to={'/add-doctor'}>
                        <img src={assets.add_icon} alt="" />
                        <p className='text-xs sm:text-sm max-lg:hidden'>Add Doctor</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-2 md:px-9 min-w-32 max-sm:min-w-15 max-lg:min-w-25 xl:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#536fff]' : ''}`} to={'/doctor-list'}>
                        <img src={assets.people_icon} alt="" />
                        <p className='text-xs sm:text-sm max-lg:hidden'>Doctors List</p>
                    </NavLink>
                </ul>
            }
            {
                dToken && <ul className='text-[#515151] mt-5'>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-2 md:px-9 max-sm:min-w-10 max-lg:min-w-25 xl:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#536fff]' : ''}`} to={'/doctor-dashboard'}>
                        <img src={assets.home_icon} alt="" />
                        <p className='text-xs sm:text-sm max-lg:hidden'>Dashboard</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-2 md:px-9 max-sm:min-w-10 max-lg:min-w-25 xl:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#536fff]' : ''}`} to={'/doctor-appointments'}>
                        <img src={assets.appointment_icon} alt="" />
                        <p className='text-xs sm:text-sm max-lg:hidden'>Appointments</p>
                    </NavLink>
                    <NavLink className={({ isActive }) => `flex items-center gap-3 py-3.5 px-2 md:px-9 max-sm:min-w-10 max-lg:min-w-25 xl:min-w-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#536fff]' : ''}`} to={'/doctor-profile'}>
                        <img src={assets.add_icon} alt="" />
                        <p className='text-xs sm:text-sm max-lg:hidden'>Profile</p>
                    </NavLink>
                </ul>
            }
        </div>
    )
}

export default Sidebar
