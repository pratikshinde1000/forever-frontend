import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import { useEffect } from 'react';
const Login = () => {

  const { navigate, backendUrl, token, setToken } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState('pratik');
  const [password, setPassword] = useState('12231');
  const [email, setEmail] = useState('pratikshinde1000@gmail.com');

  const handleChange = (event) => {

    const name = event.target.name,
      value = event.target.value;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value)
    } else if (name == 'name') {
      setName(value);
    }

  }


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const data = {
        email,
        password
      }

      if (currentState === 'Sign Up') {

        const response = await axios.post(`${backendUrl}/api/user/register`, { ...data, name });
        console.log('response', response?.data);
        if (response?.data?.success) {
          toast.success('User registed.');
          setToken(response?.data?.token);
          localStorage.setItem('token', response?.data?.token)
        } else {
          toast.error(response?.data?.error || 'Internal Server Error')
        }

      } else {

        const response = await axios.post(`${backendUrl}/api/user/login`, data);
        console.log('response', response?.data);
        if (response?.data?.success) {
          toast.success('Logged In Successful');
          setToken(response?.data?.token);
          localStorage.setItem('token', response?.data?.token)
        } else {
          toast.error(response?.data?.error || 'Internal Server Error')
        }

      }

    } catch (error) {
      console.log('error', error);
      toast.error(error?.response?.data?.error || 'Internal Server Error')
    }
  }

  useEffect(()=> {
    if(token){
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='text-3xl prata-regular'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>
      {currentState === 'Sign Up' && <input type="text" onChange={handleChange} value={name} name='name' placeholder='Name' className='w-full px-3 py-2 border border-gray-800' required />}
      <input type="email" name='email' onChange={handleChange} value={email} placeholder='Email' className='w-full px-3 py-2 border border-gray-800' required />
      <input type="text" name='password' onChange={handleChange} value={password} placeholder='Passsword' className='w-full px-3 py-2 border border-gray-800' required />
      <div className='flex w-full justify-between text-sm'>
        <p className='cursor-pointer'>Forgot Your Password?</p>
        {currentState === 'Sign Up' ? <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login</p> : <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Sign Up</p>}
      </div>
      <button type='submit' className='bg-black text-white py-2 mt-4 px-8 rounded font-light' >{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
    </form>
  )
}

export default Login
