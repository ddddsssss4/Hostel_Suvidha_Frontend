import React, { useState } from 'react';
import loginbg from '../assets/loginbg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner'; // Import your spinner component

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    regNumber: '',
    password: ''
  });
  const [role, setRole] = useState('student'); // State to track selected role
  const [loading, setLoading] = useState(false); // State to track loading
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      const response = await axios.post(`${backendUrl}/${role}/login`, {
        'regNumber': formData.regNumber,
        'password': formData.password
      }, { withCredentials: true });

      console.log('Response:', response.data);
      const { accessToken, refreshToken, student } = response.data.data;

      // Store login data in local storage
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('regNumber', student.regNumber);
      localStorage.setItem('loginData', JSON.stringify({ data: { accessToken, refreshToken, student } }));

      // Navigate based on role
      navigate(`/${role}/dashboard`);
    } catch (error) {
      console.error('There was an error!', error);
    } finally {
      setLoading(false); // Set loading to false after login attempt finishes
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
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

          <div className="mb-4">
            <label className='font-poppins text-white'>Select Role</label>
            <div className="flex space-x-4">
              <label className="text-white">
                <input
                  type="radio"
                  value="student"
                  checked={role === 'student'}
                  onChange={handleRoleChange}
                /> Student
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  value="staff"
                  checked={role === 'staff'}
                  onChange={handleRoleChange}
                /> Staff
              </label>
              <label className="text-white">
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={handleRoleChange}
                /> Admin
              </label>
            </div>
          </div>

          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className='mb-4'>
                <label className='font-poppins block mb-1 text-white' htmlFor='regNumber'>Registration Number</label>
                <input
                  type='text'
                  id='regNumber'
                  value={formData.regNumber}
                  onChange={handleChange}
                  className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
                />
                <label className='font-poppins block mb-1 text-white' htmlFor='password'>Password</label>
                <input
                  type='password'
                  id='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
                />
                <div className='font-poppins text-right mb-4 text-white'>Forgot Password?</div>
                <button
                  type='submit'
                  onClick={handleSubmit}
                  className='font-poppins w-full p-2 bg-white text-black rounded'
                  disabled={loading} // Disable the button while loading
                >
                  LOGIN
                </button>
                <button
                  className='font-poppins w-full p-2 bg-gray-600 text-black rounded mt-4'
                  onClick={() => navigate('/register')}
                  disabled={loading} // Optionally disable the register button while loading
                >
                  Register
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Login;
