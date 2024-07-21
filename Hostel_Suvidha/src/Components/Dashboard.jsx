import React from 'react';
import dashboard_bg from '../assets/dashboard_bg.png';
import adminpic from "../assets/adminpic.jpg";
import bg from '../assets/bgelement.png';

const Dashboard = () => (
  <div>
  <img 
      src={bg} 
      alt="Background Element" 
      className="absolute inset-0 w-full h-full object-cover z-0" 
    />

  <div className="relative flex flex-row w-full h-full overflow-hidden">
    {/* Background Image */}
    
    {/* Content Overlay */}
    <div className="flex flex-row w-full relative z-10">
      {/* Left side with two vertically stacked divs */}
      <div className="flex flex-col w-[60%] mt-8  p-4 relative z-10">
        <div className='text-3xl font-extrabold text-white pt-12'>
          DASHBOARD
        </div>
        <div className="pt-4 w-[75%] text-white text-2xl font">
          <div 
            className="max-w-[500px]  relative h-[280px] rounded-3xl bg-cover bg-center" 
            style={{ backgroundImage: `url(${dashboard_bg})` }}
          >
            <div className='absolute top-5 left-5 h-20 w-20 rounded-full z-20 border-4 border-[#FF824C] overflow-hidden'>
              <img src={adminpic} className='w-full h-full object-cover' alt="Admin" />
            </div>

            {/* Centered text within the image */}
            <div className="absolute bottom-0 left-0 p-4 text-white text-3xl font-extrabold">
              <div className='text-lg text-[#FF824C]'>STUDENT</div>
              AMAN KUMAR
            </div>
          </div>
        </div>
        <div className="text-xl font-extrabold text-white mb-4 mt-8 ">RECENT REQUESTS</div>
        <div className="flex justify-center items-center h-80 w-5/6 bg-[#202528] rounded-3xl pb-4 mb-2"></div>
      </div>

      {/* Right side div */}
      <div className="w-[40%] p-4 relative z-10 pr-8 ">
        <div className="flex  justify-end align- items-center gap-3">
          <div className="text-white text-sm font-extrabold  text-lg ">
            <span className='text-[#FF824C] text-sm'>STUDENT </span>
            <br />
            AMAN KUMAR
          </div>
          <div className='relative h-12 w-12 rounded-full z-20 overflow-hidden'>
            <img src={adminpic} className='absolute top-0 left-0 w-full h-full object-cover mb-' alt="Admin" />
            <div className='bg-green w-[12px] h-[12px]'></div>
          </div>
        </div>

        <div className='mt-6 flex flex-col w-[100%]'>
          <div className='pt-6 text-white text-xl font-bold mb-2 font-poppins text-right '>
            RECENT UPDATES
          </div>
          <div className='bg-[#202528] rounded-3xl  h-[700px]'></div>
        </div>
      </div>
    </div>
  </div>
  </div>
);

export default Dashboard;
