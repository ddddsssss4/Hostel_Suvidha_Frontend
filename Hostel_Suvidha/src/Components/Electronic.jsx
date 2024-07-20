import React from 'react';
import Electronic from '../assets/ele_logo.png';  // Adjust the path to your image
import bg from '../assets/loginbg.png';  // Adjust the path to your background image
import FormValue1 from './FormValue1';  // Adjust the path to the FormValue component

const ElectronicComplaints = () => (
  <div className="text-white pr-4">
    <div className="flex flex-row mt-[50px] items-center">
      <h1 className="font-extrabold text-3xl pr-2">
        ELECTRONIC
      </h1>
      <div className="h-[40px] w-[40px]">
        <img src={Electronic} alt="Electronic" />
      </div>
    </div>
    <div className=''>
    <FormValue1 backgroundImage={bg} />
    </div>
  </div>
);

export default ElectronicComplaints;
