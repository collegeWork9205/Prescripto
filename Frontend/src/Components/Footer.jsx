import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className='md:mx-10'>
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img className='mb-5 w-30 ' src={assets.logo} alt="" />
                    <p className='w-full sm:w-xl md:w-sm text-gray-600 text-sm leading-5 font-serif '>Skip the crowded waiting rooms and long phone queues! Prescripto brings seamless healthcare right to your fingertips. Whether you need an in-person clinic visit, our app connects you with certified medical specialists in minutes.</p>
                </div>
                <div>
                    <h1 className='font-semibold mb-5'>COMPANY</h1>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li className='text-sm  hover:scale-101 hover:text-blue-500' onClick={() => { navigate('/'); scrollTo(0, 0) }}>Home</li>
                        <li className='text-sm  hover:scale-101 hover:text-blue-500' onClick={() => { navigate('/about'); scrollTo(0, 0) }}>About us</li>
                        <li className='text-sm  hover:scale-101 hover:text-blue-500' onClick={() => { navigate('/contact'); scrollTo(0, 0) }}>Contact Us</li>
                        <li className='text-sm  hover:scale-101 hover:text-blue-500'>Privacy policy</li>
                    </ul>
                </div>
                <div >
                    <h2 className='font-semibold mb-5'>GET IN TOUCH</h2>
                    <ul  className='flex flex-col gap-2 text-gray-600'>
                        <li className='text-sm '>+91 9205497292</li>
                        <li className='text-sm '>ankityadav532302@gmail.com</li>
                    </ul>
                </div>
            </div>
            <div className='text-center mb-5'>
                <hr className='opacity-60 mb-5' />
                <p className='text-sm  font-normal'>Copyright © 2024 GreatStack - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer