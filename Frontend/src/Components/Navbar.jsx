import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, Link } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'

const Navbar = () => {
    const { token, setToken } = useContext(AppContext)
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const {userData}=useContext(AppContext)
    const [show, setShow] = useState('')

    const logout = () => {
        setToken(false)
        localStorage.removeItem('token')
    }
    return (
        <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 '>
            <img onClick={() => (navigate('/'))} className='w-50 cursor-pointer' src={assets.logo} alt="" />
            <ul className='hidden md:flex items-start gap-5 font-medium'>
                <NavLink to='/'>
                    <li className='py-1'>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden ' />
                </NavLink>
                <NavLink to='/doctors'>
                    <li className='py-1'>ALL DOCTORS</li>
                    <hr className='border-none outline-none h-0.5  bg-[#5F6FFF]  w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/about'>
                    <li className='py-1'>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden' />
                </NavLink>
                <NavLink to='/contact'>
                    <li className='py-1'>CONTACT US</li>
                    <hr className='border-none outline-none h-0.5 bg-[#5F6FFF] w-3/5 m-auto hidden' />
                </NavLink>
            </ul>
            <div className='flex items-center gap-4'>
                {
                    token != false
                        ? <div className='flex justify-center items-center gap-2 cursor-pointer group relative'>
                            <img onClick={() => setShow(true)} className='w-12 h-12 rounded-full' src={userData.image} alt="" />
                            <img className='w-2.5 rounded-full' src={assets.dropdown_icon} alt="" />
                            <div className={`${show === true ? "group:block absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-40 " : "hidden"}`}>
                                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-2 p-2'>
                                    <div className='flex justify-between'>
                                        <p onClick={() => (navigate('my-profile'))} className='hover:text-black cursor-pointer'>My Profile</p>
                                        <img onClick={()=>setShow(false)} className='w-5 border border-gray-700' src={assets.cross_icon} alt="" />
                                    </div>
                                    <p onClick={() => (navigate('my-appointment'))} className='hover:text-black cursor-pointer'>My Appointment</p>
                                    <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                                </div>
                            </div >
                        </div>
                        : <button onClick={() => (navigate('/login'))} className='bg-[#5F6FFF] text-white px-6 py-2 rounded-lg font-light hidden md:block transition-shadow duration-500 hover:shadow-lg hover:shadow-black' >Create Account</button>
                }
                <img onClick={() => setShowMenu(true)} src={assets.menu_icon} className='w-6 md:hidden' alt="" />
                <div className={`${showMenu === true ? "fixed w-1/2" : "h-0 w-0"} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden  transition-all `}>
                    <div className='flex flex-row items-center justify-between px-2 py-5 bg-white rounded border border-gray-300 '>
                        <p className='w-26 text-lg font-serif font-normal bg-[#536fff] py-1 text-white text-center'>Welcome !</p>
                        <img className='w-5 border border-gray-700' onClick={() => setShowMenu(false)} src={assets.cross_icon} alt="" />
                    </div>
                    <ul className='flex flex-col gap-3 px-3 items-start mt-5 text-lg font-medium font-serif  rounded bg-[#536fff]' >
                        <NavLink to='/' onClick={() => { setShowMenu(false), scrollTo(0, 0) }} className='mt-5 text-white '><p className='px-4 py-2 rounded inline-block'>Home</p> </NavLink>
                        <NavLink to='/doctors' onClick={() => { setShowMenu(false), scrollTo(0, 0) }} className=' text-white '><p className='px-4 py-2 rounded inline-block'>Doctors</p></NavLink>
                        <NavLink to='/about' onClick={() => { setShowMenu(false), scrollTo(0, 0) }} className=' text-white '><p className='px-4 py-2 rounded inline-block'>About Us</p></NavLink>
                        <NavLink to='/contact' onClick={() => { setShowMenu(false), scrollTo(0, 0) }} className='mb-5 text-white '><p className='px-4 py-2 rounded inline-block'>Contact Us</p></NavLink>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
