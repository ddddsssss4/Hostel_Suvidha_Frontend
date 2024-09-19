import React, { useState } from 'react';
import loginbg from '../assets/loginbg.png';
import inp from '../assets/input.png';  

const Recognition = () => {
  const [fileName, setFileName] = useState(''); // State to hold the file name

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setFileName(file.name); // Set the file name to state
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent page refresh on form submit
    // You can handle form submission logic here
    console.log("File uploaded: ", fileName);
  };

  return (
    <div className='relative w-6/12 h-screen flex items-center justify-start'>
      <img src={loginbg} className='absolute w-full h-3/12 object-fit z-0 rounded-xl' alt='Login Background' />
      <div className='relative w-3/5 h-screen flex items-center justify-start'>
        <form className='absolute z-10 bg-opacity-80 p-8 rounded-xl max-w-md w-full' style={{ height: 'auto' }} onSubmit={handleSubmit}>
          <div className='mb-6 -mt-14'>
            <h1 className='font-poppins text-4xl scroll mb-2 text-white font-bold'>FACE REGISTER</h1>
            <div className='w-20 bg-[#7380EC] h-1 mb-4'></div>
          </div>
          <div className='mt-10'>
            <label className='font-poppins block mb-3 text-white' htmlFor='regNumber'>
              Upload your face to register
            </label>
            <div
              className="relative w-full border border-gray-400 rounded-md h-10 mb-5 p-1 flex items-center cursor-pointer"
              onClick={() => document.getElementById('fileInput').click()}
            >
              <img className='h-8 w-8' src={inp} alt="Upload Icon" />
              <input
                type='file'
                id='fileInput'
                className='hidden'
                onChange={handleFileChange} // Call handleFileChange on file selection
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">
                {fileName ? fileName : 'UPLOAD'}
              </span>
            </div>
            <button type='submit' className='font-poppins w-full p-2 bg-white text-black rounded'>
              UPLOAD
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Recognition;
