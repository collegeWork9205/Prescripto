import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className='flex bg-[#5F6FFF] rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10'>
            <div className='flex-1 py-8 sm:py-10 md:py-15 lg:py-20 lg:pl-5'>
                <div className='text-xs sm:text-xl font-semibold text-white  sm:text-start'>
                    <p className='md:text-lg lg:text-2xl xl:text-5xl'>Book Appointment</p>
                    <p className='md:mt-4 md:text-sm lg:text-3xl xl:text-5xl'> With 100+ Trusted Doctors</p>
                </div>
                <button onClick={() => {navigate('/login');scrollTo(0,0)}} className='bg-white m-auto text-xs sm:text-sm sm:text-base text-gray-600  px-1 py-2 sm:px-6 sm:py-3 rounded mt-4 lg:mt-12 md:mt-3 transition-all hover:scale-105 duration-500'>create account</button>
            </div>
            <div className='w-[130px]  md:block md:w-1/2 lg:w-[370px] relative'>
                <img className='w-[200px] sm:w-full md:absolute bottom-0 right-0' src={assets.appointment_img} alt="" />
            </div>
        </div>
    )
}

export default Banner