import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { assets } from '../assets/assets';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors,getDoctors } = useContext(AppContext);
  const [docFilter, setDocFilter] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [state, setState] = useState(true)

  const applyFilter = () => {
    if (speciality) {
      setDocFilter(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setDocFilter(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality])

  useEffect(() => {
    if (doctors.length < 1) {
      setState(false)
    } else {
      setState(true)
    }
  }, [doctors])

  useEffect(() => {
    getDoctors()
  }, [])

  return (
    <div>
      <p className='text-gray-600 font-serif text-lg'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={` flex flex-row  pr-3 pl-1 py-1 border rounded text-sm font-bold transition-all sm:hidden ${showFilters ? "bg-black text-white" : ""}`} onClick={() => setShowFilters(prev => !prev)}><img className='w-4' src={assets.threeLine} alt="" />Filter</button>
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilters ? "flex" : "hidden sm:flex"}`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto border border-gray-500 pl-3 pr-16 py-1.5 rounded  transition-all cursor-pointer  hover:scale-105 font-serif ${speciality === 'General physician' ? "bg-black text-white" : ""}`} > General physician </p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto border border-gray-500 pl-3 pr-16 py-1.5 rounded  transition-all cursor-pointer hover:scale-105 font-serif ${speciality === 'Gynecologist' ? "bg-black text-white" : ""}`} >                 Gynecologist      </p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto border border-gray-500 pl-3 pr-16 py-1.5 rounded  transition-all cursor-pointer  hover:scale-105 font-serif ${speciality === 'Dermatologist' ? "bg-black text-white" : ""}`} >             Dermatologist     </p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto border border-gray-500 pl-3 pr-16 py-1.5 rounded  transition-all cursor-pointer  hover:scale-105 font-serif ${speciality === 'Pediatricians' ? "bg-black text-white" : ""}`} >             Pediatricians     </p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto border border-gray-500 pl-3 pr-16 py-1.5 rounded  transition-all cursor-pointer  hover:scale-105 font-serif ${speciality === 'Neurologist' ? "bg-black text-white" : ""}`} >                   Neurologist       </p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto border border-gray-500 pl-3 pr-16 py-1.5 rounded  transition-all cursor-pointer hover:scale-105 font-serif ${speciality === 'Gastroenterologist' ? "bg-black text-white" : ""}`} >Gastroenterologist</p>
        </div>
        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6'>
          {
            docFilter.length > 0 ?
              docFilter.map((item, idx) => (
                <div onClick={() => (navigate(`/appointment/${item._id}`))} key={idx} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all hover:translate-y-[-10px] duration-500 hover:scale-105'>
                  <img className='bg-blue-50 rounded-xl' src={item.image} alt="" />
                  <div className='p-4'>
                    <div className={`${item.available ? "flex items-center gap-2 text-sm text-green-500 tracking-tight" : "flex items-center gap-2 text-sm text-red-500 tracking-tight"}`}>
                      <p className={`${item.available ? "w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full" : "w-1 h-1 sm:w-2 sm:h-2 bg-red-500 rounded-full"}`}></p><p className='text-xs sm:text-sm'>{item.available ? "available" : "not available"}</p>
                    </div>
                    <p className='text-gray-900 md:text-lg font-medium text-xs sm:text-sm'>{item.name}</p>
                    <p className='text-gray-600 text-xs sm:text-sm md:text-lg'>{item.speciality}</p>
                  </div>
                </div>
              ))
              :
              state == false ?
                <>
                  <div></div>
                  <div className='w-full text-red-500 font-serif mx-4 text-center'>
                    <p className='md:text-lg flex flex-col justify-center items-center'>There Is Probelm In Network<img className='w-80 max-h-30 my-1' src={assets.broken_img} alt="" /> That's Why Doctors Are Not Shown Please Try Later !!!</p>
                  </div>
                </>
                : ' '

          }
        </div>
      </div>
    </div>
  )
}

export default Doctors