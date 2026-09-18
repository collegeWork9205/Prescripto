import React, { useContext, useEffect } from 'react'
import { DoctorsContext } from '../../Context/DoctorsContext'
import { AppContext } from '../../Context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointment = () => {
  const { slotDateFormat, getAge, currency } = useContext(AppContext)
  const { docAppointments, appointments, dToken, appointmentCancel, appointmentComplete } = useContext(DoctorsContext)

  useEffect(() => {
    if (dToken) {
      docAppointments()
    }
  }, [dToken])

  return appointments && (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All appointments</p>
      <div className='bg-white border rounded text-sm min-h-[60vh] max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_2fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.reverse().map((item, idx) => (
          <div className='flex max-sm:flex-col flex-wrap justify-center text-xs sm:text-sm max-sm:gap-1 sm:grid sm:grid-cols-[0.5fr_3fr_2fr_1fr_3fr_1fr_1fr] sm:items-center sm:justify-items-start text-gray-500 py-3 px-2 sm:px-8 border-b ' key={idx}>
            <p className='flex gap-3 font-medium max-sm:border-b text-lg max-sm:bg-[#536fff] max-sm:pl-2 max-sm:py-1 max-sm:text-white'><b className='hidden max-sm:block max-sm:text-white'>&gt; &nbsp;Appointment</b>{idx + 1}</p>
            <div className='flex  gap-2 justify-start items-center mt-2 max-sm:border-b transition-all  hover:mb-4 duration-500'>
              <b className='sm:hidden text-lg '>Patient &nbsp;&nbsp;&nbsp;:</b>
              <img className='w-10 h-10 sm:w-10 rounded-full' src={item.userData.image} />
              <p className='max-sm:text-lg text-md text-gray-700'>{item.userData.name}</p>
            </div>
            <p className='max-sm:text-lg text-green-500 font-medium sm:rounded-4xl sm:border sm:px-2  border-gray-500 border-b'><b className='sm:hidden text-lg text-gray-500'>Payment &nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{item.payment ? "Online" : "Cash"}</p>
            <p className=' text-lg max-sm:border-b max-sm:mt-1'><b className='sm:hidden text-lg'>Age&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;</b>{getAge(item.userData.dob)}</p>
            <p className='max-sm:text-lg text-sm max-sm:border-b max-sm:mt-1  text-blue-400'><b className='sm:hidden text-lg  text-gray-500'>Date&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp; &nbsp;</b>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
            <p className='text-sm max-sm:text-lg max-sm:border-b max-sm:mt-1'><b className='sm:hidden text-lg'>Fees &nbsp; &nbsp; :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>{currency}{item.docData.fees}</p>
            {
              item.cancelled === true ? <p className=' mt-2 text-md text-center border-2 border-red-400 px-3 py-2 font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white hover:font-bold hover:border-white duration-500'>Cancelled</p>
                : <div>
                  {
                    !item.isCompleted ?
                      <div className='flex flex-row'>
                        <img onClick={() => appointmentCancel(item._id)} className=' w-12  cursor-pointer mt-3 m-auto text-center px-0' src={assets.cancel_icon} alt="" />
                        <img onClick={() => appointmentComplete(item._id)} className=' w-12  cursor-pointer mt-3 m-auto text-center px-0' src={assets.tick_icon} alt="" /></div>
                      : <p className='text-center m-auto border-2 border-green-400 px-2 py-2 font-bold text-green-400 transition-all hover:bg-green-300 hover:text-white hover:font-bold hover:border-white duration-500 mt-3'>Completed</p>

                  }
                </div>



            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorAppointment