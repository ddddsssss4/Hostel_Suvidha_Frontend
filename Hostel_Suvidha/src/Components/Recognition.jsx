import React, { useState } from 'react';
import axios from 'axios';
import loginbg from '../assets/loginbg.png';
import inp from '../assets/input.png';  

const Recognition = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const token = localStorage.getItem('token');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select an image to upload');
      return;
    }
    const formData = new FormData();
    formData.append('image1', selectedFile);
    console.log('FormData:', selectedFile);

    try {
      const response = await axios.post(`${backendUrl}/face/verifyFaces`,formData, {
        headers: {
          "Content-Type": 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error uploading the file:', error);
    }
  };

  return (
    <div className='relative w-full h-screen flex items-center justify-center bg-gradient-to-b from-gray-800 to-gray-900'>
      <img src={loginbg} className='absolute w-full h-full object-cover z-0 opacity-30' alt='Login Background' />
      <div className='relative w-full mx-2 max-w-md p-8 rounded-xl shadow-lg bg-gray-800 bg-opacity-90 z-10'>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='text-center'>
            <h1 className='font-poppins text-4xl mb-2 text-white font-bold'>FACE REGISTER</h1>
            <div className='w-20 bg-[#7380EC] h-1 mx-auto'></div>
          </div>
          <div className='mt-10'>
            <label className='font-poppins block mb-3 text-white text-center' htmlFor='regNumber'>Upload your face to register</label>
            <div className='relative w-full'>
              <div className='relative border border-gray-500 rounded-md h-12 flex items-center justify-center mb-5'>
                <img className='h-8 w-8 absolute left-3' src={inp} alt="Upload Icon" />
                <input
                  type='file'
                  name='file'
                  id='regNumber'
                  accept="image/*"
                  onChange={handleFileChange}
                  className='w-full h-full block opacity-0 cursor-pointer'
                />
                <span className='absolute text-gray-400 text-lg font-medium'>{selectedFile?.name || 'Upload Image'}</span>
              </div>
            </div>
            <button type='submit' className='font-poppins w-full p-2 bg-[#7380EC] text-white rounded-md hover:bg-[#606be2] transition duration-300'>Upload</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Recognition;
