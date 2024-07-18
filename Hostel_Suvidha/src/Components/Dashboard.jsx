import React from 'react';

const Dashboard = () => (
  <div className="bg-white h-full flex flex-row">
    {/* Left side with two vertically stacked divs */}
    <div className="flex flex-col w-1/3">
      <div className="bg-gray-200 flex-grow p-4 m-2">Top Div</div>
      <div className="bg-gray-400 flex-grow p-4 m-2">Bottom Div</div>
    </div>

    {/* Right side div */}
    <div className="bg-gray-600 flex-grow p-4 m-2 w-2/3">
      Right Div
    </div>
  </div>
);

export default Dashboard;
