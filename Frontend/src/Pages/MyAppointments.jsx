import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MyAppointments = () => {
  const { doctors, backend_url, token, getDoctors } = useContext(AppContext);
  const [appointment, setAppointment] = useState([])
  const navigate = useNavigate()
  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "June", "july", "Aug", "Sep", "Oct", , "Nov", "Dec"]


  const GetAppointment = async () => {
    try {
      const { data } = await axios.get(backend_url + "/api/user/get-appointment", { headers: { token } })
      if (data.success) {
        setAppointment(data.data.reverse())
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  const slotDateFormat = (slotDate) => {
    let datearray = slotDate.split("_")
    return datearray[0] + " " + months[datearray[1]] + " " + datearray[2];
  }


  const CancelAppointment = async (appointId) => {
    try {
      const { data } = await axios.post(backend_url + "/api/user/cancel-appointment", { appointId }, { headers: { token } })
      console.log(data)
      if (data.success) {
        toast.success(data.message)
        GetAppointment()
        getDoctors()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }
  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: " Paying Doctor for Apppointment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        console.log(response)
        try {
          const { data } = await axios.post(backend_url + "/api/user/verifyRazorpay", response, { headers: { token } })
          if (data.success) {
            toast.success(data.message)
            GetAppointment()
            navigate('/my-appointment')
          }
        } catch (error) {
          console.log(error.message)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const appointmentRazorpay = async (appointId) => {
    try {
      const { data } = await axios.post(backend_url + "/api/user/payment-razorpay", { appointId }, { headers: { token } })
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      GetAppointment()
    }
  }, [token])

  return appointment && (
    <div>
      <p className='pb-3 mt-12 font-bold text-lg text-zinc-700 border-b border-gray-300 ' >My Appointment</p>
      <div >
        {
          appointment.map((item, idx) => (
            <div key={idx} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b  border-gray-300'>
              <div>
                <img className='w-32 bg-indigo-50' src={item.docData.image} alt="" />
              </div>
              <div className='flex-1 text-sm text-zinc-500'>
                <p className='text-neutral-800 font-semibold text-lg'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-neutral-700 mt-3'>Address :</p>
                <p className='text-xs mt-1.5'>{item.docData.address.line1}</p>
                <p className='text-xs'>{item.docData.address.line2}</p>
                <p className='text-xs mt-2 font-normal'><span className='text-sm text-neutral-700 font-medium'>Date & Time : </span>{slotDateFormat(item.slotDate)} | {item.slotTime}</p>
              </div>
              <div></div>
              <div className='flex flex-col gap-2 justify-center'>
                {item.isCompleted && <button className='py-2 px-2 rounded bg-green-500 text-white border sm:min-w-48 sm:max-w-48 transition-all hover:bg-white hover:text-green-500 duration-300'>Completed</button>}
                {!item.cancelled && item.payment && !item.isCompleted && <button className='py-2 px-2 rounded bg-green-500 text-white border sm:min-w-48 sm:max-w-48 transition-all hover:bg-white hover:text-green-500 duration-300'>Paid Successfully</button>}
                {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-center bg-neutral-100 border-neutral-300 py-2 px-2 rounded  border sm:m-w-48 transition-all hover:bg-[#536fff] hover:text-white duration-300'>Pay Online</button>}
                {!item.cancelled && !item.isCompleted && <button onClick={() => CancelAppointment(item._id)} className='text-sm text-center bg-neutral-100 border-neutral-300 py-2 px-2 rounded  border sm:m-w-48 transition-all hover:bg-red-600 hover:text-white duration-300'>Cancel Appointment</button>}
                {item.cancelled && !item.isCompleted && <button className='sm:m-w-48 text-red-500 border border-red-500 py-2 px-2 rounded  transition-all hover:bg-red-600 hover:text-white duration-300'>Appointment Cancelled</button>}
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments