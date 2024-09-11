import React from 'react';
import bgelement from '../assets/bgelement.png';
import Electronic from '../assets/Electronic_comp.png';
import Furniture from '../assets/futrniture_comp.png';
import Washroom from '../assets/washroom_comp.png';
import Service from '../assets/room_service_comp.png';
import Wifi from '../assets/WFI_comp.png';
import Disciplinary from '../assets/Disciplinary_comp.png';
import { useNavigate } from 'react-router-dom';
import misscnew from '../assets/misscnew.png';
import grevances from '../assets/grevnew.png';

const Complaints = () => {
  const navigate = useNavigate();

  const goToComplaint = (route) => {
    navigate(`/Complaints/${route}`);
  };

  return (
    <div>
  <h1 className="mt-24 text-white text-3xl font-extrabold pb-6">COMPLAINTS</h1>
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-8/12 hover:cursor-pointer">
    <div onClick={() => goToComplaint('Electronic')}>
      <img className="w-full object-cover" src={Electronic} alt="Electronic Complaints" />
    </div>
    <div onClick={() => goToComplaint('Furniture')}>
      <img className="w-full object-cover" src={Furniture} alt="Furniture Complaints" />
    </div>
    <div onClick={() => goToComplaint('Washroom')}>
      <img className="w-full object-cover" src={Washroom} alt="Washroom Complaints" />
    </div>
    <div onClick={() => goToComplaint('RoomService')}>
      <img className="w-full object-cover" src={Service} alt="Service Complaints" />
    </div>
    <div onClick={() => goToComplaint('Wifi')}>
      <img className="w-full object-cover" src={Wifi} alt="Wifi Complaints" />
    </div>
    <div onClick={() => goToComplaint('Disciplinary')}>
      <img className="w-full object-cover" src={Disciplinary} alt="Disciplinary Complaints" />
    </div>
    <div onClick={() => goToComplaint('Miscellaneous')}>
      <img className="w-full object-cover" src={misscnew} alt="Miscellaneous Complaints" />
    </div>
    <div onClick={() => goToComplaint('Grievances')}>
      <img className="w-full object-cover" src={grevances} alt="Grievances Complaints" />
    </div>
  </div>
</div>

  );
};

export default Complaints;
