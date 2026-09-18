import React, { useContext, useEffect, useState } from 'react'
import { DoctorsContext } from '../../Context/DoctorsContext'
import { AppContext } from '../../Context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const DoctorProfile = () => {
  const { docProfile, getdocProfile, dToken, setDocProfile, backend_url } = useContext(DoctorsContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)

  const UpdateDocProfile = async () => {
    try {
      // const formdata = new FormData();
      let UpdatedData = {
        fees: docProfile.fees,
        address: docProfile.address,
        available: docProfile.available
      }
      const { data } = await axios.post(backend_url + "/api/doctor/docProfile-update", UpdatedData, { headers: { dToken } })
      if (data.success) {
        toast.success(data.message)
        getdocProfile()
        setIsEdit(false)
      } else {
        toast.error(data)
        console.log(data)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error)
    }
  }

  useEffect(() => {
    if (dToken) {
      getdocProfile()
    }
  }, [])



  return docProfile.address && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='w-full bg-[#536fff]/80 sm:max-w-64 rounded-lg' src={docProfile.image} alt="" />
        </div>
        <div className='flex-1 border border-stone-400 rounded-lg p-8 py-7 bg-white'>
          {/* {doc Information } name,degree,exper. */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docProfile.name}</p>
          <div className='flex items-center mt-1 gap-2 text-gray-600'>
            <p>{docProfile.degree}-{docProfile.speciality}</p>
            <button className='border border-gray-500 px-2 rounded-full text-sm'>{docProfile.experience}</button>
          </div>
          {/* {doctor About} */}
          <div>
            <p className='flex items-center mt-3 text-md font-medium gap-1 text-neutral-800'>About</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docProfile.about}</p>
          </div>
          {
            isEdit ? <p className='text-gray-600 font-medium mt-4'>Appointment Fee : <input className='bg-gray-200 max-w-52 border border-gray-200 rounded py-1 pl-1' type="text" placeholder='Enter new line1 address' onChange={e => setDocProfile(prev => ({ ...prev, fees: e.target.value }))} value={docProfile.fees} /></p>
              : <p className='text-gray-600 font-medium mt-4'>Appointment Fee : <span className='text-gray-800'>{currency} {docProfile.fees}</span></p>
          }
          <div className='flex gap-2 py-2'>
            <p>Address :</p>
            {
              isEdit === true
                ? <p>
                  <input className='bg-gray-200 max-w-52 border border-gray-200 rounded py-1 pl-1' type="text" placeholder='Enter new line1 address' onChange={(e) => setDocProfile(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={docProfile.address.line1} />
                  <br />
                  <input className='bg-gray-200 max-w-52 border border-gray-200 rounded py-1 pl-1 mt-2' type="text" placeholder='Enter new line2 addess' onChange={(e) => setDocProfile(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={docProfile.address.line2} />
                </p>
                : <p className='leading-6 text-sm text-gray-700'>
                  {docProfile.address.line1}
                  <br />
                  {docProfile.address.line2}
                </p>
            }
          </div>
          {
            isEdit ?
              <div className='flex gap-1 pt-2 text-md'>
                <input type="checkbox" onChange={(e) => setDocProfile(prev => ({ ...prev, available: !prev.available }))} checked={docProfile.available} />
                <label className='ml-2' htmlFor="">Available</label>
              </div> : <p className={`w-[200px] text-lg text-center mt-2 ${docProfile.available ? "text-green-500 border border-green-500 px-2 " : "text-red-500 border border-red-500 px-2"}`}>{docProfile.available ? "Available" : "Not Available"}</p>
          }
          {
            isEdit ? <button onClick={UpdateDocProfile} className='w-1/2 border bg-[#536fff]  py-1 text-white rounded-xl mt-4'>Save Changes</button>
              : <button onClick={() => setIsEdit(true)} className='w-1/2 border bg-[#536fff]  py-1 text-white rounded-xl mt-4'>Edit</button>
          }
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile