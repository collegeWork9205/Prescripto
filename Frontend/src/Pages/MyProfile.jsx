import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, backend_url, findUserProfileData, token } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false)

  const updateUserData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phone', userData.phone)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      //if Image edit
      image && formData.append('image', image)
      const { data } = await axios.post(backend_url + '/api/user/update-profile', formData, { headers: { token } })
      if (data.success) {
        toast.success(data.message)
        await findUserProfileData()
        setIsEdit(false)
        setImage(false)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }



  return userData && (
    // main div
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
      {
        isEdit === true
          ?
          <label htmlFor="image">
            <div className='inline-block relative cursor-pointer'>
              <img className='w-50 h-30 rounded' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
              <img className='w-25 absolute top-2 left-60 ' src={image ? ' ' : assets.upload_area} alt="" />
            </div>
            <input onChange={(e) => setImage(e.target.files[0])} id='image' type='file' accept='image/*' className='hidden' />
          </label>
          : <img className='w-60 max-h-50 rounded' src={userData.image} alt="" />

      }
      {
        isEdit === true
          ? <input className='bg-gray-200 rounded pl-1  max-w-60 mt-5 border border-gray-300 py-2' type="text" placeholder="Enter Updated name" onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
          : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userData.name}</p>
      }
      <hr className='bg-zinc-800 h-0.5 border-none' />

      {/* second div */}
      <div >
        <p className='text-neutral-500 underline mt-4 text-lg'>CONTACT INFROMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700'>
          <p className='font-medium'>Email : </p>
          <p className='text-blue-600'>{userData.email}</p>
          <p className='font-medium'>Phone : </p>
          {
            isEdit === true
              ? <input className='bg-gray-200 max-w-52 border border-gray-200 rounded py-1 pl-1' type="text" maxLength='10' placeholder='Enter Updated Phone' onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
              : <p className='text-blue-600'>{userData.phone}</p>
          }
          <p className='font-medium'>Address : </p>
          {
            isEdit === true
              ? <p>
                <input className='bg-gray-200 max-w-52 border border-gray-200 rounded py-1 pl-1' type="text" placeholder='Enter new line1 address' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                <br />
                <input className='bg-gray-200 max-w-52 border border-gray-200 rounded py-1 pl-1 mt-2' type="text" placeholder='Enter new line2 addess' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
              </p>
              : <p className='leading-5'>
                {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }
        </div>
      </div>
      {/* third div */}
      <div>
        <p className='text-lg text-neutral-500 underline  mt-3'>BASIC INFORMATION</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-3 mt-3'>
          <p className='text-gray-800 font-medium'>Gender :</p>
          {
            isEdit === true
              ? <select className='border border-gray-300 max-w-20 bg-neutral-200 rounded-sm pl-1 py-1  text-neutral-700' onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                <option value="Male">male</option>
                <option value="Female">female</option>
                <option value="other">other</option>
              </select>
              : <p className='text-gray-700'>{userData.gender}</p>
          }
          <p className='text-gray-800 font-medium'>Birthday :</p>
          {
            isEdit
              ? <input className='max-w-29 bg-gray-200 py-1 pl-1 rounded-sm text-neutral-500' type="date" onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
              : <p className='text-gray-700'>{userData.dob}</p>
          }
        </div>
      </div>
      {/* fourth div       */}
      <div>
        {
          isEdit
            ? <button className='w-1/2 bg-[#536fff] mt-7 py-2 px-1 text-md font-bold text-white border border-gray-400 rounded-xl transition-all  hover:scale-105 duration-500' onClick={updateUserData}>Save Information</button>
            : <button className='w-1/2 bg-[#536fff] mt-7 py-2 px-1 text-md font-bold text-white border border-gray-400 rounded-xl transition-all  hover:scale-105 duration-600' onClick={() => setIsEdit(true)}>Edit</button>
        }
      </div>

    </div>
  )
}

export default MyProfile;