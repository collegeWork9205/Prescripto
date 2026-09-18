import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext';
import { assets } from '../assets/assets';
import Login from './Login';
import RelatedDoctors from '../Components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios'

const Appointment = () => {

  const { docId } = useParams();
  const { doctors, crncysymbol, token, backend_url, getDoctors } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
  const navigate = useNavigate()
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [SlotTime, setSlotTime] = useState(' ');

  const FetchdocInfo = async () => {
    const DocInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(DocInfo);
  }

  const getAvailableSlot = () => {
    setDocSlot([]);
    //getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting date with idx
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i)

      //setting end time of the date with idx;
      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currDate.getDate()) {
        currDate.setHours(currDate.getHours() > 10 ? currDate.getHours() + 1 : 10)
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })

        let day = currDate.getDate()
        let month = currDate.getMonth() + 1;
        let year = currDate.getFullYear()
        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime;

        //checking on that particular doctor that slot is already booked or not if booked than that time will not be shown to the other
        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        //add slot in array
        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currDate),
            time: formattedTime
          })
        }
        //incr time by 30 minutes
        currDate.setMinutes(currDate.getMinutes() + 30);
      }
      setDocSlot((prev) => ([...prev, timeSlots]))
    }
  }

  //Book Appointment
  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Login To book appointment");
      return navigate('/Login')
    }
    try {
      //geting date "day-month-year"
      const date = docSlot[slotIdx][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1;
      let year = date.getFullYear()
      const slotDate = day + "_" + month + "_" + year
      const slotTime = SlotTime;
      if(slotTime===' '){
        return toast.error("Please select the Time")
      }
      const { data } = await axios.post(backend_url + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getDoctors()
        navigate('/my-appointment')
      } else {
        console.log(data);
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    }
  }

  useEffect(() => {
    FetchdocInfo();
  }, [doctors, docId])

  useEffect(() => {
    if (docInfo != null) {
      getAvailableSlot();
    }
  }, [docInfo])

  useEffect(() => {
    getDoctors()
  }, [])

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-[#536fff] w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 p-8 py-7 rounded-lg bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <p className='flex  items-center gap-2 font-medium text-2xl  text-gray-900'>{docInfo.name} <img className='w-4' src={assets.verified_icon} alt="" /></p>
          <div className='flex  gap-2 items-center text-sm mt-1 text-gray-600 font-medium'>
            <p>{docInfo.degree}-{docInfo.speciality}</p>
            <button className='border rounded-full text-xs px-3 py-1'>{docInfo.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 font-medium text-sm text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-sm text-gray-700  font-serif leading-normal max:w-[700px] mt-2'>{docInfo.about}</p>
          </div>
          <p className='mt-4 text-gray-700 '>Appointment fee: <b className='font-bold text-black'>{crncysymbol}{docInfo.fees}</b></p>
        </div>
      </div>

      <div className='sm:ml-72 sm:pl-4 mt-5 font-normal text-gray-700'>
        <p>Booking slots</p>
        <div className='flex flex-row gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docSlot.length && docSlot.map((item, idx) => (
              <div onClick={() => { setSlotIdx(idx) }} key={idx} className={`rounded-full py-6 min-w-16 text-center ${slotIdx == idx ? 'bg-[#536fff] text-white' : "border border-gray-300"}`}>
                <p  >{item[0] && daysOfWeek[item[0].datetime.getDay()]} </p>
                <p >{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>
        <div className='flex flex-row w-full overflow-x-scroll items-center mt-4 gap-3'>
          {
            docSlot.length && docSlot[slotIdx].map((item, idx) => (
              <p onClick={() => (setSlotTime(item.time))} key={idx} className={`border text-xs font-normal flex-shrink-0 px-4 py-2 rounded-full cursor-pointer ${item.time === SlotTime ? 'bg-[#536fff] text-white' : "border border-gray-300"}`}>
                {item.time.toLowerCase()}
              </p>
            ))
          }
        </div>
        <button onClick={bookAppointment} className='bg-[#536fff] text-white text-sm  px-14 py-3 rounded-3xl my-6 font-serif'>Book An Appointment</button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  )
}

export default Appointment