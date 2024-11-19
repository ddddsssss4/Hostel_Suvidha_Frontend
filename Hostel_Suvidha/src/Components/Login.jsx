import React, { useState } from 'react';
import loginbg from '../assets/loginbg.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useSnackbar } from './SnackbarContext';

const Login = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    regNumber: '',
    username: '',
    password: ''
  });
  const [role, setRole] = useState('students');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        password: formData.password,
        ...(role === 'admins' ? { username: formData.username } : { regNumber: formData.regNumber })
      };

      const response = await axios.post(`${backendUrl}/${role}/login`, payload, { withCredentials: true });
      console.log('Response:', response.data);
      const { accessToken, refreshToken, student } = response.data.data;

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('loginData', JSON.stringify({ data: response.data.data }));
      if (role === 'students') localStorage.setItem('regNumber', student.regNumber);

      navigate(`/${role}/dashboard`);
    } catch (error) {
      showSnackbar('Invalid Credentials !!', 'red');
      console.error('There was an error!', error);
    } finally {
      setLoading(false);
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
    <div className='relative w-[50%] h-screen flex items-center justify-start'>
      <img src={loginbg} className='absolute w-full h-5/12 object-fit z-0 rounded-xl hidden md:block min-h-[500px]' alt='Login Background' />
      <div className='relative w-full md:w-3/5 h-screen flex items-center justify-center px-4'>
        <form
          onSubmit={handleSubmit}
          className='relative z-10 bg-opacity-80 rounded-xl max-w-md w-[80%]'
        >
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
                  value="students"
                  checked={role === 'students'}
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
                  value="admins"
                  checked={role === 'admins'}
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
                {role === 'admins' ? (
                  <>
                    <label className='font-poppins block mb-1 text-white' htmlFor='username'>Username</label>
                    <input
                      type='text'
                      id='username'
                      value={formData.username}
                      onChange={handleChange}
                      className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
                    />
                  </>
                ) : (
                  <>
                    <label className='font-poppins block mb-1 text-white' htmlFor='regNumber'>User Id</label>
                    <input
                      type='text'
                      id='regNumber'
                      value={formData.regNumber}
                      onChange={handleChange}
                      className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
                    />
                  </>
                )}
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
                  className='font-poppins w-full p-2 bg-white text-black rounded'
                  disabled={loading}
                >
                  LOGIN
                </button>
                <button
                  className='font-poppins w-full p-2 bg-white text-black rounded mt-4'
                  onClick={() => navigate('/register')}
                  disabled={loading}
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
