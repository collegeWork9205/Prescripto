import React from 'react'
import axios from 'axios'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { useState } from 'react'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const DashBoard = () => {
  const { backend_Url, aToken, appointmentCancel, getAllAppointment } = useContext(AdminContext)
  const { slotDateFormat } = useContext(AppContext)
  const [dashData, setDashData] = useState({})
  const dashBoradData = async () => {
    try {
      const { data } = await axios.post(backend_Url + "/api/admin/dashBorad", {}, { headers: { aToken } })
      if (data.success) {
        setDashData(data.dashData)
        console.log(data.dashData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (aToken) {
      dashBoradData();
    }
  }, [])


  return dashData && (
    <div className='w-full md:w-3/2 xl:w-1/2 m-2 sm:m-7'>
      <div className='flex flex-col  gap-3 lg:flex-row sm:gap-5 '>
        <div className='w-full flex flex-row justify-start items-center bg-white px-3 py-4 rounded gap-3 transition-all hover:scale-110 duration-500'>
          <img src={assets.doctor_icon} alt="" />
          <div className='flex flex-col'>
            <p className='text-lg font-normal'>{dashData.doctors}</p>
            <p className='text-sm sm:text-lg text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='w-full flex flex-row justify-start items-center bg-white px-3 py-4 rounded gap-3 transition-all hover:scale-110 duration-500'>
          <img src={assets.appointments_icon} alt="" />
          <div className='flex flex-col'>
            <p className='text-lg font-normal'>{dashData.appointments}</p>
            <p className='text-sm sm:text-lg text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='w-full flex flex-row justify-start items-center bg-white px-3 py-4 rounded gap-3 transition-all hover:scale-110 duration-500'>
          <img src={assets.patients_icon} alt="" />
          <div className='flex flex-col'>
            <p className='text-lg font-normal'>{dashData.patient}</p>
            <p className='text-md text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='mt-3 sm:mt-10'>
        <div className='flex flex-row gap-4 bg-white border-b border-gray-400 py-3 px-5'>
          <img className='max-sm:w-4' src={assets.list_icon} alt="" />
          <p className='text-xs md:text-lg'>Latest Appointment</p>
        </div>
        <div className='flex flex-col gap-4 bg-white px-2 sm:px-6 py-5 '>
          {
            dashData.latestAppointment ?
              dashData.latestAppointment.map((item, idx) => {
                return (
                  <div key={idx} className='flex flex-row justify-between  border-b py-2 border-gray-300 transition-all hover:bg-gray-200 duration-500'>
                    <div className='flex flex-row gap-3 justify-start items-center ' >
                      <img className='w-8 h-10 sm:w-15 sm:h-15 rounded-full bg-gray-300' src={item.userData.image} />
                      <div >
                        <p className='text-md sm:text-lg font-normal'>{item.userData.name}</p>
                        <p className='max-sm:flex max-sm:flex-col text-xs sm:text-sm text-gray-300'><b>Booking On&nbsp;&nbsp;</b><span className=' text-blue-400 text-xs'>{slotDateFormat(item.slotDate)},{item.slotTime}</span></p>
                      </div>
                    </div>
                    {
                      item.cancelled === true ? <p className='text-red-500 font-medium max-sm:text-xs'>Cancelled</p>
                        : item.isCompleted ? <p className=' text-green-500 font-medium max-sm:text-xs'>Completed</p>
                          : <div> <img onClick={() => appointmentCancel(item._id)} className='w-10 cursor-pointer mt-3 m-auto text-center' src={assets.cancel_icon} alt="" /></div>
                    }
                  </div>
                )
              })
              : <p className='text-center text-red-500'>NO APPOINTMENT fOUND !!</p>
          }
        </div>
      </div>


    </div>
  )
}

export default DashBoard