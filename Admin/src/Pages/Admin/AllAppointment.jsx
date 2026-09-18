import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AdminContext } from '../../Context/AdminContext'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'


const AllAppointment = () => {
  const { getAllAppointment, appointments, aToken, appointmentCancel } = useContext(AdminContext)
  const { slotDateFormat, getAge, currency } = useContext(AppContext)



  useEffect(() => {
    if (aToken) {
      getAllAppointment();
      console.log(appointments)
    }
  }, [aToken])


  return appointments && (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All appointments</p>
      <div className='bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, idx) => (
          <div className='flex max-sm:flex-col flex-wrap justify-center text-xs sm:text-sm max-sm:gap-1 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] sm:items-center sm:justify-items-start text-gray-500 py-3 px-2 sm:px-6 border-b hover:bg-gray-200' key={idx}>
             <p className='flex gap-3 font-medium max-sm:border-b text-lg max-sm:bg-[#536fff] max-sm:pl-2 max-sm:py-1 max-sm:text-white'><b className='hidden max-sm:block max-sm:text-white'>&gt; &nbsp;Appointment</b>{idx + 1}</p>
            <div className='flex  gap-2 justify-start items-center mt-3'>
              <b className='sm:hidden max-sm:text-lg'>Patient :</b>
              <img className='max-sm:w-7 max-sm:h-7 w-10 h-10 sm:w-10 rounded-full' src={item.userData.image} />
              <p className='max-sm:text-md'>{item.userData.name}</p>
            </div>
            <p className='max-sm:text-lg'><b className='sm:hidden max-sm:text-lg'>Age&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;</b>{getAge(item.userData.dob)}</p>
            <p className='text-xs'><b className='sm:hidden max-sm:text-lg'>Date &nbsp;: </b>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
            <div className='flex  flex-row justify-start items-center gap-1 text-xs sm:text-md'>
              <b className='sm:hidden max-sm:text-lg  max-sm:mt-1'>Doctor&nbsp;:</b>
              <img className='w-7 sm:w-10 rounded-full bg-gray-200' src={item.docData.image} alt="" />
              <p className='text-xs'>{item.docData.name}</p>
            </div>
            <p className='max-sm:text-lg max-sm:mt-1'><b className='sm:hidden text-lg'>Fees &nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{currency}{item.docData.fees}</p>
            {
              item.cancelled === true ? <p className='text-center m-auto border-2 border-red-500 px-2 py-2 font-bold text-red-400 transition-all hover:bg-red-300 hover:text-white hover:font-bold hover:border-white duration-500 mt-3'>Cancelled</p>
                : item.isCompleted ? <p className='text-center m-auto border-2 border-green-400 px-2 py-2 font-bold text-green-400 transition-all hover:bg-green-300 hover:text-white hover:font-bold hover:border-white duration-500 mt-3'>Completed</p>
                  : <div> <img onClick={() => appointmentCancel(item._id)} className='w-10 cursor-pointer mt-3 m-auto text-center' src={assets.cancel_icon} alt="" /></div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllAppointment