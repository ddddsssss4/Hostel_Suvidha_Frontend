import React, { useEffect, useState } from "react";
import bg from '../assets/bgelement.png';
import '../App.css';
import clock from '../assets/clock.svg';
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
        <div className=" text-white h-screen w-full flex flex-col py-6">
            <div className="flex items-center w-full">
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
               <div className="flex justify-center items-top pb-4 mb-2 w-[50%] h-80 bg-[#202528] rounded-md overflow-y-auto custom-scroll ml-4 shadow-black border-t-8 border-[#7380EC]">
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
                            <td className="px-4 py-3 pl-16 text-white text-left">{check(val.inTime) ? (
                            <img src={clock} alt="Clock" className="inline w-6 h-6 ml-2" />
                            ) : val.inTime}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="flex ml-5 bg-[#202528] flex-col p-6 rounded-3xl w-[40%] border-b-8 border-[#7380EC]"> */}
    {/* <h2 className="text-xl font-semibold mb-4">OUTPASS / LEAVES</h2> */}
    {/* <form className="space-y-4">
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
    </form> */}
    
    {/* Status section */}
    {/* <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Status</h3>
        <div className="bg-gray-700 p-4 rounded-md text-white">
            <div className="flex justify-between items-center">
                <span className="font-medium">Time: 5:00 PM</span> 
                <span className={`font-bold text-lg ${status === 'Approved' ? 'text-green-500' : 'text-red-500'}`}>
                    {status}
                </span>
            </div>
        </div>
    </div> */}
{/* </div> */}



            
 
            </div>
        </div>
    </div>
  );
};

export default InOut;
