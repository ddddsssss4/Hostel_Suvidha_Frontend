import loginbg from '../assets/loginbg.png';
import inp from '../assets/input.png';  

const Recognition=()=>{
    return(
        <div className='relative w-6/12 h-screen flex items-center justify-start'>
      <img src={loginbg} className='absolute w-full h-3/12 object-fit z-0 rounded-xl' alt='Login Background' />
      <div className='relative w-3/5 h-screen flex items-center justify-start'>
        <form className='absolute z-10 bg-opacity-80 p-8 rounded-xl max-w-md w-full' style={{ height: 'auto' }}>
          <div className='mb-6 -mt-14'>
            <h1 className='font-poppins text-4xl scroll mb-2 text-white font-bold'>FACE REGISTER</h1>
            <div className='w-20 bg-[#7380EC] h-1 mb-4'></div>
          </div>
          <div className=' mt-10'>
            <label className='font-poppins block mb-3 text-white' htmlFor='regNumber'>Upload your face to register</label>
            <div class="relative w-full ">
              <div className='border border-gray-400 rounded-md h-10 mb-5 p-1 '>
                <img className='h-8 w-8' src={inp} alt="image" />
              <input
                type='file'
                id='regNumber'
                class='w-full pl-10 pr-14 p-2 border rounded mb-4 text-white bg-[#202528] focus:outline-none opacity-0'
              />

              <span class="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400">
                UPLOAD
              </span>
              </div>
            </div>
            <button type='submit' className='font-poppins w-full p-2 bg-white text-black rounded'>UPLOAD</button>
          </div>
        </form>
      </div>
    </div>
    )
}
export default Recognition;