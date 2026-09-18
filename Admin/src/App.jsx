import React, { useContext } from 'react'
import Login from './Pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from './Context/AdminContext';
import Navbar from './Component/Navbar';
import Sidebar from './Component/Sidebar';
import { Routes, Route } from 'react-router-dom';
import DashBoard from './Pages/Admin/DashBoard';
import AllAppointment from './Pages/Admin/AllAppointment';
import DoctorsList from './Pages/Admin/DoctorsList';
import AddDoctors from './Pages/Admin/AddDoctors';
import { DoctorsContext } from './Context/DoctorsContext';
import DoctorDashBoard from './Pages/Doctors/DoctorDashBoard';
import DoctorAppointment from './Pages/Doctors/DoctorAppointment';
import DoctorProfile from './Pages/Doctors/DoctorProfile';

const App = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorsContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* admin route*/}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<DashBoard />} />
          <Route path='/all-appointments' element={<AllAppointment />} />
          <Route path='/add-doctor' element={<AddDoctors />} />
          <Route path='/doctor-list' element={<DoctorsList />} />

          {/* doctor route*/}
          <Route path='/doctor-dashboard' element={<DoctorDashBoard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointment />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>

  )
    : (
      <>
        <Login />
        <ToastContainer />
      </>
    )
}

export default App