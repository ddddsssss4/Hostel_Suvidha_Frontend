import React from 'react';
import bgelement from '../assets/bgelement.png';
import Electronic from '../assets/Electronic_comp.png';
import Furniture from '../assets/futrniture_comp.png';
import Washroom from '../assets/washroom_comp.png';
import Service from '../assets/room_service_comp.png';
import Wifi from '../assets/WFI_comp.png';
import Disciplinary from '../assets/Disciplinary_comp.png';
import { useNavigate } from 'react-router-dom';

const Complaints = () => {
  const navigate = useNavigate();

  const goToComplaint = (route) => {
    navigate(`/Complaints/${route}`);
  };

  return (
    <div className="">
      
        <h1 className="mt-24 text-white text-3xl font-extrabold pb-6">COMPLAINTS</h1>
        <div className="grid grid-cols-3 grid-rows-3 gap-8 w-[620px] overflow-hidden hover:cursor-pointer">
          <div onClick={() => goToComplaint('Electronic')}><img src={Electronic} alt="Electronic Complaints" /></div>
          <div onClick={() => goToComplaint('Furniture')}><img src={Furniture} alt="Furniture Complaints" /></div>
          <div onClick={() => goToComplaint('Washroom')}><img src={Washroom} alt="Washroom Complaints" /></div>
          <div onClick={() => goToComplaint('RoomService')}><img src={Service} alt="Service Complaints" /></div>
          <div onClick={() => goToComplaint('Wifi')}><img src={Wifi} alt="Wifi Complaints" /></div>
          <div onClick={() => goToComplaint('Disciplinary')}><img src={Disciplinary} alt="Disciplinary Complaints" /></div>
        </div>
      
    </div>
  );
};

export default Complaints;
