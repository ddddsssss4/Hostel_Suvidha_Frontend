import React from 'react';
import bg from '../assets/loginbg.png'; 
import FormValue1 from './FormValue1';
import miscpng from '../assets/miscpng.png';

function Miscellaneous() {
    return (
        <div className="text-white pr-4">
        <div className="flex flex-row mt-[50px] items-center">
          <h1 className="font-extrabold text-3xl pr-2">
            MISCELLANEOUS
          </h1>
          <div className="h-[40px] w-[40px]">
            <img src={miscpng} alt="Displinary" />
          </div>
        </div>
        <div className=''>
          <FormValue1 backgroundImage={bg} />
        </div>
      </div>
    )
}

export default Miscellaneous;