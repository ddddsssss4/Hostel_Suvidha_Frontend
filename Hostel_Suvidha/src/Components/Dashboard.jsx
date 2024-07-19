import React from 'react';
import dashboard_bg from '../assets/dashboard_bg.png';

const Dashboard = () => (
  <div className="bg-black  flex flex-row ">
    {/* Left side with two vertically stacked divs */}
    <div className="flex flex-col w-[65%] mt-14">
      <div className='text-3xl font-extrabold text-white pl-4 pt-12'>
        DASHBOARD
      </div>
      <div className="pt-4 w-[75%] text-white text-2xl font">
        <div className="w-[90%] relative h-[180px] ml-1" style={{ backgroundImage: `url(${dashboard_bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className='absolute top-2 left-2 h-12 w-12 rounded-full border-4 border-yellow-500'>
            {/* Optional: Add content inside the circle */}
          </div>
          {/* Centered text within the image */}
          <div className="absolute bottom-0 left-0 p-4 text-white text-3xl font-extrabold">
            AMAN KUMAR
          </div>
        </div>
      </div>
      <div className="pl-4 text-3xl font-extrabold">Recent Requests</div>
      <div className="flex justify-center items-center h-96 w-4/5 bg-gray-700 rounded-lg pb-4 mb-2"></div>
    </div>

    {/* Right side div */}
    <div className="w-[35%] bg-black ">
      {/* Add any content you want inside this div */}
      <div className=' bg-red-500'>
      <div className="absolute right-6 bg-red-600 top-0 p-4 text-white text-medium font-extrabold">
            AMAN KUMAR
          </div>
          </div>
          <div className='pt-8 '>
            Recent Updates
          </div>
          <div className='bg-gray-700 h-[590px] rounded-tl-md w-[100%] mt-24 '>
          
          </div>
    </div>
  </div>
);

export default Dashboard;
