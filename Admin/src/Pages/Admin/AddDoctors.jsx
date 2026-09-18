import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
import { AdminContext } from '../../Context/AdminContext'

const AddDoctors = () => {
  const { backend_Url, aToken } = useContext(AdminContext)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(false)
  const [password, setPassword] = useState('')
  const [experiance, setExperiance] = useState('1 Year')
  const [fees, setFees] = useState('')
  const [speciality, setSpeciality] = useState('General physician')
  const [education, setEducation] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [about, setAbout] = useState('')

  const onSumbitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!image) {
        toast.error("Image Not Uploaded")
      }
      const formData = new FormData();
      formData.append('name', name)
      formData.append('email', email)
      formData.append('password', password)
      formData.append('degree', education)
      formData.append('experience', experiance)
      formData.append('speciality', speciality)
      formData.append('image', image)
      formData.append('address', JSON.stringify({ line1: address1, line2: address2 }))
      formData.append('fees', Number(fees))
      formData.append('about', about)

      let { data } = await axios.post(backend_Url + '/api/admin/add-doctor', formData, { headers: { aToken } })
      if (data.success) {
        toast.success(data.message)
        setName('')
        setEmail('')
        setImage(false)
        setFees('')
        setAbout('')
        setPassword('')
        setEducation('')
        setAddress1('')
        setAddress2('')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    }

  }

  return (
    <form onSubmit={onSumbitHandler} className='w-full m-5'>
      <p className='font-semibold text-lg mb-5'>Add-Doctors</p>
      <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[90vh] overflow-y-scroll'>
        <div className='flex flex-row items-center gap-4 text-gray-600 mb-8'>
          <label htmlFor="doc-img">
            <img className='w-16 sm:w-25 rounded-full cursor-pointer bg-gray-200' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='doc-img' hidden />
          <p className='text-xs sm:text-lg'>Uplaod Doctor <br /> picture</p>
        </div>
        <div className='flex flex-col lg:flex-row items-start gap-5 sm:gap-10 text-xs sm:text-sm font-medium'>
          <div className='w-full lg:flex-1 flex flex-col gap-5 text-gray-500'>
            <div className='flex-1 flex flex-col gap-2'>
              <p>Doctor Name :</p>
              <input onChange={(e) => setName(e.target.value)} value={name} className=' py-2 border rounded border-gray-300 px-2' type="text" placeholder=' Enter Name' />
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <p>Doctor Email :</p>
              <input onChange={(e) => setEmail(e.target.value)} value={email} className=' py-2 border rounded border-gray-300 px-2' type="email" placeholder=' Enter Email' />
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <p >Doctor Password :</p>
              <input onChange={(e) => setPassword(e.target.value)} value={password} className=' py-2 border rounded border-gray-300 px-2' type="password" placeholder=' Enter Password' />
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <p >Experiance :</p>
              <select onChange={(e) => setExperiance(e.target.value)} value={experiance} className=' py-2 border rounded border-gray-300 text-gray-400' name="" id="">
                <option default>Experiance</option>
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <p >Fees :</p>
              <input onChange={(e) => setFees(e.target.value)} value={fees} className=' py-2 border rounded border-gray-300 text-gray-500 px-2' type="number" placeholder=' Your Fees' />
            </div>
          </div>

          <div className='w-full lg:flex-1 flex flex-col gap-5 text-gray-500 text-xs sm:text-sm'>
            <div className='flex-1 flex flex-col gap-2'>
              <p >Speciality :</p>
              <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='py-2 border rounded border-gray-300 text-gray-400' name="" id="">
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatricians">Pediatricians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <p>Education :</p>
              <input onChange={(e) => setEducation(e.target.value)} value={education} className=' py-2 border rounded border-gray-300 text-gray-500 px-2' type="text" placeholder=' Your Education' />
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <p>Address :</p>
              <input onChange={(e) => setAddress1(e.target.value)} value={address1} className='w-full py-1.5 border rounded border-gray-300 text-gray-500 mb-1 sm:mb-3 px-2' type="text" placeholder=' Line 1 Address' />
              <input onChange={(e) => setAddress2(e.target.value)} value={address2} className='w-full py-1.5 border rounded border-gray-300 text-gray-500 px-2' type="text" placeholder=' Line 2 Address' />
            </div>
          </div>

        </div>
        <div>
          <p className='mt-4 mb-2 text-xs sm:text-sm md:text-lg text-gray-500'>About :</p>
          <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full border border-gray-300 rounded text-gray-500 py-2 px-3 text-xs sm:text-sm' name="text" id="" rows='5'> Tell About Something You ?</textarea>
        </div>
        <button type='submit' className='px-8 py-2 border bg-[#536fff] text-white mt-4 rounded m-auto'>Add-Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctors
