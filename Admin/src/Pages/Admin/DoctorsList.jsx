import React, { useContext } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { AdminContext } from '../../Context/AdminContext'
import { toast } from 'react-toastify'

const DoctorsList = () => {
  const { aToken, doctors, getAllDoctors,updateAvailbility} = useContext(AdminContext)

  useEffect(() => {
    if (aToken) {
      getAllDoctors();
    }
  }, [aToken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium '>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {
          doctors.map((item, idx) => (
            <div key={idx} className='max-w-56 border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all hover:translate-y-[-10px] duration-500 hover:scale-105'>
              <img className='bg-blue-50 rounded-xl transition-all hover:bg-[#536fff] duration-500' src={item.image} alt="" />
              <div className='p-4'>
                <p className='text-gray-900 text-xs  sm:text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
                <div className='mt-2 flex gap-1.5 text-sm '>
                <input onChange={()=>updateAvailbility(item._id)}  className='w-4' type="checkbox" checked={item.available} />
                <p className='font-semibold'>Available</p>
              </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList