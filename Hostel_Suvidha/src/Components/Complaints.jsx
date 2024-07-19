import React from 'react';
import bgelement from '../assets/bgelement.png'
import Electronic from '../assets/Electronic_comp.png'
import Furniture  from  '../assets/futrniture_comp.png'
import Washroom   from   '../assets/washroom_comp.png'
import Service    from   '../assets/room_service_comp.png'
import Wifi       from     '../assets/WFI_comp.png'
import Disciplinary from '../assets/Disciplinary_comp.png'
const Complaints = () => (
<div className='bg-black'>
  <div className="" style={{ backgroundImage: `url(${bgelement})`  }}>
    <h1 className='mt-[50px] text-white text-3xl font-extrabold pb-6'> Complaints</h1>
    <div className='grid grid-cols-3 grid-rows-3 gap-8 w-[620px] hover:cursor-pointer' >
     <div><img src={Electronic}/></div>
     <div><img src={Furniture}/></div>
     <div><img src={Washroom}/></div>
     <div><img src={Service}/></div>
     <div><img src={Wifi}/></div>
     <div><img src={Disciplinary}/></div>
    </div>
    
  </div>
  </div>
);

export default Complaints;
