import loginbg from '../assets/loginbg.png';
const Recognition=()=>{
    return(
        <div className='relative w-6/12 h-screen flex items-center justify-start'>
      <img src={loginbg} className='absolute w-full h-3/12 object-fit z-0 rounded-xl' alt='Login Background' />
      <div className='relative w-3/5 h-screen flex items-center justify-start'>
        <form className='absolute z-10 bg-opacity-80 p-8 rounded-xl max-w-md w-full' style={{ height: 'auto' }}>
          <div className='mb-6'>
            <h1 className='font-poppins text-2xl mb-2 text-white font-bold'>FACE REGISTER</h1>
            <div className='w-20 bg-[#7380EC] h-1 mb-4'></div>
          </div>
          <div className='mb-4'>
            <label className='font-poppins block mb-1 text-white' htmlFor='regNumber'>Upload your face to register</label>
            <input
              type='file'
              id='regNumber'
            //   value={formData.regNumber}
              className='w-full p-2 border rounded mb-4 text-white bg-[#202528]'
            />
            <button type='submit' className='font-poppins w-full p-2 bg-white text-black rounded'>UPLOAD</button>
          </div>
        </form>
      </div>
    </div>
    )
}
export default Recognition;