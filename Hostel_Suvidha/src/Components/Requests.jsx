import React from "react";

const Requests = () =>{
  return (
<div className="mt-8 flex gap-8 w-full">
  <div className="flex flex-col items-start pb-4 mb-2 w-[50%] h-80 bg-[#202528] rounded-md overflow-y-auto custom-scroll ml-4 shadow-lg border-t-8 border-[#7380EC]">
    <h2 className="text-2xl font-semibold m-4 text-white">Requests for Room Service</h2>

    <div className="flex flex-col space-y-4 w-full px-6">
      <div className="flex flex-col">
        <label className="text-sm text-white mb-1" htmlFor="date">Select Date</label>
        <input
          id="date"
          type="date"
          className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7380EC] bg-gray-700 text-white"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-sm text-white mb-1" htmlFor="time">Select Time</label>
        <input
          id="time"
          type="time"
          className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7380EC] bg-gray-700 text-white"
        />
      </div>
    </div>
  </div>
</div>

  )
 
}
export default Requests;