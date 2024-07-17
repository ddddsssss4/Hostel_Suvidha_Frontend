import React from 'react';
import bg from '../assets/bgelement.png';
import Login from '../Components/Login';

const LoginPage = () => {
  return (
    <div className='relative'>
      <div className='absolute top-0 left-0 w-full p-8'>
        <h1 className='text-white '><span className='text-3xl font-bold font-poppins '>Hostel</span><span className='text-3xl font-bold font-poppins text-[#FF4343]'>Suvidha</span></h1>
      </div>
      <div className='bg-[#181A1E] w-full h-screen flex items-center justify-center'>
        <img src={bg} alt="Background" className='w-full h-full object-cover' />
      </div>
      <div className='absolute top-0 left-0 w-full h-screen flex items-center justify-center'>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
