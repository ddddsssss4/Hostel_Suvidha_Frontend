import React from 'react';
import bg from '../assets/loginbg.png';  // Adjust the path to your background image
import FormValue1 from './FormValue1';  // Adjust the path to the FormValue component
import WashRoom1 from '../assets/washroom_logo.png'

 const WashRoom = ()=>{
  return (
    <div className="text-white pr-4">
    <div className="flex flex-row mt-[50px] items-center">
      <h1 className="font-extrabold text-3xl pr-2">
        WASHROOM
      </h1>
      <div className="h-[40px] w-[40px]">
        <img src={WashRoom1} alt="WashRoom" />
      </div>
    </div>
    <div className=''>
    <FormValue1 backgroundImage={bg} />
    </div>
  </div>
  )
}
export default WashRoom;