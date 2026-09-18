import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../Context/AppContext'
import { useState } from 'react'
import { useEffect } from 'react'
import { assets } from '../assets/assets'

const TopDoctors = () => {
    const navigate = useNavigate();
    const { doctors, getDoctors } = useContext(AppContext);
    const [state, setState] = useState(true)
    // const [placeholder, setPlaceholder] = useState("");
    // let text = "Simply browse through our extensive list of trusted doctors.";
    // useEffect(() => {
    //     let isDelete = false;
    //     let idx = 0;
    //     let isPaused = false;

    //     const interval = setInterval(() => {
    //         if (isPaused) return;
    //         if (!isDelete) {
    //             setPlaceholder(text.substring(0, idx + 1));
    //             idx++;
    //             if (idx === text.length) {
    //                 isPaused=true;
    //                 setTimeout(() => {
    //                     isDelete = true;
    //                     isPaused=false;
    //                 }, 2000);
    //             }
    //         } else {
    //             setPlaceholder(text.substring(0, idx - 1));
    //             idx--;
    //             if (idx === 0) {
    //                 isPaused=true;
    //                 setTimeout(() => {
    //                     isDelete = false;
    //                     isPaused=false;
    //                 }, 2000);
    //             }
    //         }
    //     }, 120)
    //     return () => clearInterval(interval);
    // }, [])

    useEffect(() => {
        getDoctors()
    }, [])

    useEffect(() => {
        if (doctors.length < 1) {
            setState(false)
        }else{
            setState(true)
        }
    }, [doctors])

    return (
        <div className='flex flex-col items-center gap-4 mt-6 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium text-[#536fff]'>Top Doctors to Book</h1>
            <p className='sm:w-1/3 text-sm text-center font-serif'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {
                    doctors ?
                        doctors.slice(0, 10).map((item, idx) => (
                            <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} key={idx} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all hover:translate-y-[-10px] duration-500 hover:scale-105'>
                                <img className='bg-blue-50 rounded-xl' src={item.image} alt="" />
                                <div className='p-4'>
                                    <div className={`${item.available ? "flex items-center gap-2 text-sm text-green-500 tracking-tight" : "flex items-center gap-2 text-sm text-red-500 tracking-tight"}`}>
                                        <p className={`${item.available ? "w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full" : "w-1 h-1 sm:w-2 sm:h-2 bg-red-500 rounded-full"}`}></p><p className='text-xs sm:text-sm'>{item.available ? "available" : "not available"}</p>
                                    </div>
                                    <p className='text-gray-900 text-xs  sm:text-lg font-medium '>{item.name}</p>
                                    <p className='text-gray-600 text-xs  sm:text-lg'>{item.speciality}</p>
                                </div>
                            </div>
                        ))
                        : ' '

                }
            </div>
            {
                state == false ?
                    <div className='text-red-500 font-serif mx-4 text-center'>
                        <p className='md:text-2xl flex flex-col justify-center items-center'>There Is Probelm In Network<img className='w-80 max-h-30 my-1' src={assets.broken_img} alt="" /> That's Why Doctors Are Not Shown Please Try Later !!!</p>
                    </div>
                    : ' '
            }
            {
              state==false?''
              :<button onClick={() => { navigate(`/doctors`); scrollTo(0, 0) }} className='bg-blue-100 py-3 px-6 rounded-xl mt-10 transition-all duration-500 hover:scale-110'>more</button>
            }
        </div>
    )
}

export default TopDoctors