import React, { useEffect, useState } from "react";
import bg from '../assets/bgelement.png';
import '../App.css';
const InOut = () => {
    const check =(value)=>{
        if(value==null){
            return true;
        }
        else{
            false;
        }
    }
    const [status,setStatus] = useState("Approved");
    const requests = [
        { time: '09:00 AM', reason: 'Doctor Appointment', status: 'Approved' },
        { time: '12:00 PM', reason: 'Family Event', status: 'Declined' },
        { time: '03:00 PM', reason: 'Meeting with Professor', status: 'Pending' },
      ];
    const [inOutLogs,setInOutLogs] = useState([
        {
          date: "11/8/2024",
          inTime: null,
          outTime: "09:00",
        },
        {
          date: "10/8/2024",
          inTime: "10:15",
          outTime: "14:30",
        },
        {
          date: "09/8/2024",
          inTime: "08:45",
          outTime: "12:00",
        },
        {
          date: "08/8/2024",
          inTime: "11:00",
          outTime: "15:45",
        }])
    const [inStatus,  setInStatus] = useState(inOutLogs[0].inTime == null ? false : true);
    useEffect(()=>{
        if(inOutLogs[0].inTime == null){
            setInStatus(false);
        }
        else{
            setInStatus(true);
        }
    })
  return (
    <div>
        <img 
        src={bg} 
        alt="Background Element" 
        className="absolute inset-0 w-full h-full object-cover z-[-1]" 
      />
        <div className=" text-white h-screen w-full flex flex-col items-center py-6">
            <div className="flex items-center justify-items-start w-full">
                <div className="text-2xl p-5 font-bold">IN & OUT</div>
                <div className="flex items-center bg-[#202528] gap-2 p-3 rounded-lg">
                <span className="font-semibold">Status :</span>
                <div className="flex justify-between">
                <div className={`${inStatus==true?`bg-green-700`:`bg-[#202528]`} text-white font-bold px-3 py-1 rounded-md`}>IN</div>
                <div className={`${inStatus==false?`bg-red-700`:`bg-[#202528]`} text-white font-bold px-3 py-1 rounded-md`}>OUT</div>
                </div>
                </div>
            </div>

            <div className="mt-8 flex gap-8 w-full">
                {/* <div className="flex-1 bg-[#202528] p-6 rounded-xl">
                    <div className="grid grid-cols-3 font-semibold text-lg mb-4">
                        <div className="flex justify-center items-center"><span>Date</span></div>
                        <div className="flex justify-center items-center"><span>Out Time</span></div>
                        <div className="flex justify-center items-center"><span>In Time</span></div>
                    </div>
                    {inOutLogs.map((val)=>(
                        <div>
                        <div className="grid grid-cols-3 justify-center items-center text-lg">
                            <div className="flex justify-center items-center"><span>{val.date}</span></div>
                            <div className="flex justify-center items-center"><span>{val.outTime}</span></div>
                            <div className="flex justify-center items-center"><span>{check(val.inTime)?"⏰":val.inTime}</span></div>
                        </div>
                        <div className="bg-[#1A1818] h-1"></div>
                        </div>
                    ))}
                </div> */}
               <div className="flex justify-center items-top pb-4 mb-2 w-[50%] h-80 bg-[#202528] rounded-3xl overflow-y-auto custom-scroll ml-4 shadow-black border-b-8 border-[#7380EC]">
                    <table className="min-w-full table-auto h-10">
                        <thead>
                        <tr>
                            <th className="px-4 py-4 pl-16 text-gray-200 text-left">Date</th>
                            <th className="px-4 py-4 pl-16 text-gray-200 text-left">OutTime</th>
                            <th className="px-4 py-4 pl-16 text-gray-200 text-left">InTime</th>
                        </tr>
                        </thead>
                        <tbody>
                        {inOutLogs.map((val, i) => (
                            <tr key={i} className="border-b border-gray-700">
                            <td className="px-4 py-3 pl-16 text-white text-left">{val.date}</td>
                            <td className="px-4 py-3 pl-16 text-white text-left">{val.outTime}</td>
                            <td className="px-4 py-3 pl-16 text-white text-left">{check(val.inTime) ? "⏰" : val.inTime}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex ml-5 bg-[#202528] flex-col p-6 rounded-3xl w-[40%] border-b-8 border-[#7380EC]">
    <h2 className="text-xl font-semibold mb-4">OUTPASS / LEAVES</h2>
    <form className="space-y-4">
        <div className="flex justify-between">
            <span>1. Outpass</span>
        </div>
        <div className="space-y-2">
            <label className="block text-sm font-medium">Time:</label>
            <input
                type="text"
                className="bg-gray-700 border-none text-white p-2 rounded-md w-full"
                placeholder="Enter time"
            />
        </div>
        <div className="space-y-2">
            <label className="block text-sm font-medium">Reason:</label>
            <input
                type="text"
                className="bg-gray-700 border-none text-white p-2 rounded-md w-full"
                placeholder="Enter reason"
            />
        </div>
        <button
            type="submit"
            className="bg-[#7380EC] text-white p-2 rounded-md w-full mt-4"
        >
            Submit
        </button>
    </form>
    
    {/* Status section */}
    <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Status</h3>
        <div className="bg-gray-700 p-4 rounded-md text-white">
            <div className="flex justify-between items-center">
                <span className="font-medium">Time: 5:00 PM</span> {/* Dynamic time */}
                {/* Dynamic status color */}
                <span className={`font-bold text-lg ${status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                    {status}
                </span>
            </div>
        </div>
    </div>
</div>



            
 
            </div>
        </div>
    </div>
  );
};

export default InOut;
