import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../Context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { backend_url, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()
  const [state, setState] = useState('sign up')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const onChangeHandler = async (event) => {
    event.preventDefault();
    try {
      console.log(name, email, password);
      if (state === 'sign up') {
        const { data } = await axios.post(backend_url + '/api/user/register', { name, email, password })
        if (data.success) {
          localStorage.setItem("token", data.token)
          setToken(data.token)
          toast.success("Registered succesfully")
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backend_url + '/api/user/login', { email, password })
        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
          toast.success("Registered succesfully")
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onChangeHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col items-start gap-3 m-auto p-8 rounded-xl min-w-[340px] sm:min-w-96 text-zinc-600 text-sm shadow-lg transition-all hover:shadow-olive-700 hover:scale-105 duration-500'>
        <p className='text-2xl  font-semibold'>{state === 'sign up' ? 'Create Account' : 'Login'}</p>
        <p className='font-semibold'>Please {state === 'sign up' ? 'Create Account' : 'Login'} to book appointment</p>
        {
          state === 'sign up' && <div className='w-full'>
            <p className=''>Full Name</p>
            <input className='border border-[#536fff] rounded w-full p-2 mt-1 ' type="text" onChange={(e) => setName(e.target.value)} value={name} required />
          </div>
        }
        <div className='w-full'>
          <p className=''>Email</p>
          <input className='border border-[#536fff] rounded w-full p-2 mt-1 ' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
        </div>
        <div className='w-full'>
          <p className=''>Password</p>
          <input className='border border-[#536fff] rounded w-full p-2 mt-1 ' type="password" onChange={(e) => { setPassword(e.target.value); console.log(password) }} value={password} required />
        </div>
        <button type='submit' className='w-full bg-[#536fff] text-white py-2 mt-2'>{state === 'sign up' ? 'Create Account' : 'Login'}</button>
        {
          state === 'sign up'
            ? <p className='font-semibold'>Already have an account ?<span className='text-[#536fff] cursor-pointer underline' onClick={() => (setState('Login'))}> Login here</span></p>
            : <p className='font-semibold'>Create a new account ? <span className='text-[#536fff] cursor-pointer underline' onClick={() => (setState('sign up'))}> click here</span></p>
        }
      </div>
    </form>
  )

}

export default Login