import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);
    const navigate = useNavigate();
    // const [placeholder, setPlaceholder] = useState("");
    // let text = "Simply browse through our extensive list of trusted doctors.....";


    useEffect(() => {
        if (doctors.length && speciality) {
            let RelatedDoc = doctors.filter((doc) => (doc.speciality === speciality && doc._id != docId));
            setRelDoc(RelatedDoc);
        }
    }, [doctors, speciality, docId])


    //Learning type-Writer Effect
    // useEffect(() => {
    //     let isDelete = false;
    //     let idx = 0;
    //     const interval = setInterval(() => {
    //         if (!isDelete) {
    //             setPlaceholder(text.substring(0, idx + 1));
    //             idx++;
    //             if (idx === text.length) {
    //                 isDelete = true;
    //             }
    //         } else {
    //             setPlaceholder(text.substring(0, idx - 1));
    //             idx--;
    //             if (idx === 0) {
    //                 isDelete = false;
    //             }
    //         }
    //     }, 120)
    //     return () => clearInterval(interval);
    // }, [])

    return (
        <div className='flex flex-col items-center gap-3 my-16 text-gray-900 md:mx-10'>
            <h1 className='text-3xl font-medium'>Related Doctors</h1>
            <p className='sm:w-1/2 text-md text-center font-serif opacity-75'>Simply browse through our extensive list of trusted doctors.....</p>
            <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
                {relDoc.slice(0, 5).map((item, idx) => (
                    <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} key={idx} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer transition-all hover:translate-y-[-10px] duration-500 hover:scale-105'>
                        <img className='bg-blue-50 rounded-xl' src={item.image} alt="" />
                        <div className='p-4'>
                            <div className={`${item.available ? "flex items-center gap-2 text-sm text-green-500 tracking-tight" : "flex items-center gap-2 text-sm text-red-500 tracking-tight"}`}>
                                <p className={`${item.available ? "w-1 h-1 sm:w-2 sm:h-2 bg-green-500 rounded-full" : "w-1 h-1 sm:w-2 sm:h-2 bg-red-500 rounded-full"}`}></p><p className='text-xs sm:text-sm'>{item.available ? "available" : "not available"}</p>
                            </div>
                            <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                            <p className='text-gray-600'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => { navigate(`/doctors`); scrollTo(0, 0) }} className='bg-blue-100 py-3 px-6 rounded-xl mt-10 transition-all duration-500 hover:scale-110'>more</button>
        </div>
    )
}

export default RelatedDoctors