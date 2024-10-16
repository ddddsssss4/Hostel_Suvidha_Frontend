import React, { useState } from 'react';
import loginbg from '../assets/loginbg.png'; // Import background image
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'; // Import your spinner component

const RegisterStudent = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    fullName: '',
    password: '',
    regNumber: '',
    hostel: '',
    roomNumber: '',
    profileImage: null,
  });

  const [loading, setLoading] = useState(false); // State to track loading

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setStudentData((prev) => ({ ...prev, profileImage: files[0] }));
    } else {
      setStudentData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when form submission starts

    const formData = new FormData();
    formData.append('fullName', studentData.fullName);
    formData.append('password', studentData.password);
    formData.append('regNumber', studentData.regNumber);
    formData.append('hostel', studentData.hostel);
    formData.append('roomNumber', studentData.roomNumber);
    formData.append('profileImage', studentData.profileImage);

    try {
      const response = await axios.post(`${backendUrl}/students/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });

      console.log('Registration Response:', response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error('Registration Error:', error);
    } finally {
      setLoading(false); // Set loading to false after the request is complete
    }
  };

  return (
    <div className='relative w-full h-screen flex items-center justify-center bg-black'>
      <img src={loginbg} className='absolute w-full h-full object-fit z-0 rounded-xl' alt='Login Background' />
      <div className='relative w-3/5 h-1/4 flex items-center justify-start'>
        <form onSubmit={handleSubmit} className='absolute z-10 bg-opacity-80 p-8 rounded-xl max-w-md w-full'>
          <div className='mb-6'>
            <h1 className='font-poppins text-2xl mb-2 text-white font-bold'>REGISTER</h1>
            <div className='w-20 bg-[#7380EC] h-1 mb-4'></div>
          </div>
          <div className='mb-4'>
            <label className='font-poppins block mb-1 text-white' htmlFor='fullName'>Full Name</label>
            <input
              type='text'
              name='fullName'
              value={studentData.fullName}
              onChange={handleChange}
              className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
            />
            <label className='font-poppins block mb-1 text-white' htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              value={studentData.password}
              onChange={handleChange}
              className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
            />
            <label className='font-poppins block mb-1 text-white' htmlFor='regNumber'>Registration Number</label>
            <input
              type='text'
              name='regNumber'
              value={studentData.regNumber}
              onChange={handleChange}
              className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
            />
            <label className='font-poppins block mb-1 text-white' htmlFor='hostel'>Hostel</label>
            <input
              type='text'
              name='hostel'
              value={studentData.hostel}
              onChange={handleChange}
              className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
            />
            <label className='font-poppins block mb-1 text-white' htmlFor='roomNumber'>Room Number</label>
            <input
              type='text'
              name='roomNumber'
              value={studentData.roomNumber}
              onChange={handleChange}
              className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
            />
            <label className='font-poppins block mb-1 text-white' htmlFor='profileImage'>Profile Image</label>
            <input
              type='file'
              name='profileImage'
              onChange={handleChange}
              className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
            />
            <button
              type='submit'
              className='font-poppins w-full p-2 bg-white text-black rounded'
              disabled={loading} // Disable the button while loading
            >
              REGISTER
            </button>
            {loading && <Spinner />} {/* Show the spinner if loading is true */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterStudent;
