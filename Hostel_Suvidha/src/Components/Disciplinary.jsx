import React from 'react';
import bg from '../assets/loginbg.png';  // Adjust the path to your background image
import FormValue1 from './FormValue1';  // Adjust the path to the FormValue component
import Disciplinary2 from '../assets/Disciplinary_logo.png'

 const Disciplinary = ()=>{
  return (
    <div className="text-white pr-4">
    <div className="flex flex-row mt-[50px] items-center">
      <h1 className="font-extrabold text-3xl pr-2">
        DISCIPLINARY
      </h1>
      <div className="h-[40px] w-[40px]">
        <img src={Disciplinary2} alt="Displinary" />
      </div>
    </div>
    <div className=''>
    <FormValue1 backgroundImage={bg} />
    </div>
  </div>
  )
}
export default Disciplinary;