import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-600 font-serif'>
        <p>CONTACT <b className='text-black font-bold'>US</b></p>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-10 justify-center mb-28 text-sm'>
        <img className='w-full md:max-w-[360px] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-black duration-200' src={assets.contact_image} alt="" />
        <div className='flex flex-col gap-6 items-start text-gray-600 justify-center'>
            <p className='text-gray-700 font-semibold text-lg'>OUR OFFICE</p>
            <p className='leading-loose'>MANGOL PURI 110083<br />DELHI, NEW DELHI, INDIA</p>
            <p className='leading-loose'>Tel:+91 9205497292<br />Email: ankityadav532302@gmail.com</p>
            <p className='text-gray-700 font-semibold text-lg'>CAREERS AT PRESCRIPTO</p>
            <p>Learn more about our teams and job openings.</p>
            <button className='border border-gray-400 py-3 px-5 text-black  transition-all hover:scale-110 hover:bg-black hover:text-white duration-500'>Explore Jobs</button>
        </div>
      </div>



    </div>
  )
}

export default Contact