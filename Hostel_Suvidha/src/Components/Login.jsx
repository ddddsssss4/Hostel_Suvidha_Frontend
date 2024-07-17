import React, { useState } from 'react';
import loginbg from '../assets/loginbg.png';

const Login = () => {
  // State object for form inputs
  const [formData, setFormData] = useState({
    regNumber: '',
    password: ''
  });

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:5000/api/v1/students/login', null, {
        headers: {
          'regNumber': formData.regNumber,
          'password': formData.password
        }
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };


  // Handler for input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  return (
    <div className='relative w-6/12 h-screen flex items-center justify-start'>
      <img src={loginbg} className='absolute w-full h-3/12 object-fit z-0 rounded-xl' alt='Login Background' />
      <div className='relative w-3/5 h-screen flex items-center justify-start'>
        <form onSubmit={handleSubmit} className='absolute z-10 bg-opacity-80 p-8 rounded-xl max-w-md w-full' style={{ height: 'auto' }}>
          <div className='mb-6'>
            <h1 className='font-poppins text-2xl mb-2 text-white font-bold'>LOGIN</h1>
            <div className='w-20 bg-[#7380EC] h-1 mb-4'></div>
          </div>
          <div className='mb-4'>
            <label className='font-poppins block mb-1 text-white' htmlFor='regNumber'>Registration Number</label>
            <input
              type='text'
              id='regNumber'
              value={formData.regNumber}
              onChange={handleChange}
              className='w-full p-2 border rounded mb-4 bg-[#202528]'
            />
            <label className='font-poppins block mb-1 text-white' htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full p-2 border rounded mb-4 bg-[#202528]'
            />
            <div className='font-poppins text-right mb-4 text-white'>Forgot Password?</div>
            <button type='submit' onClick={handleSubmit}  className='font-poppins w-full p-2 bg-white text-black rounded'>LOGIN</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
