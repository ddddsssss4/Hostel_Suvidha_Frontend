import React, { useState } from 'react';
import dashboard_bg from '../assets/dashboard_bg.png';
import adminpic from "../assets/adminpic.jpg";
import bg from '../assets/bgelement.png';
import '../App.css';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([
    {
      "type": "ELECTRONIC",
      "complaintID": "12357",
      "status": "Pending",
    },
    {
      "type": "ELECTRONIC",
      "complaintID": "12357",
      "status": "Completed"
    },
    {
      "type": "ELECTRONIC",
      "complaintID": "12357",
      "status": "Declined"
    },
    {
      "type": "ELECTRONIC",
      "complaintID": "12357",
      "status": "Pending"
    },
    {
      "type": "ELECTRONIC",
      "complaintID": "12357",
      "status": "Pending"
    },
    {
      "type": "ELECTRONIC",
      "complaintID": "12357",
      "status": "Pending"
    },
    {
      "type": "ELECTRONIC",
      "complaintID": "12357",
      "status": "Pending"
    },
    {
      "type": "ELECTRONIC",
      "complaintID": "12357",
      "status": "Pending"
    },
    {
      "type": "ELECTRONIC",
      "complaintID": "12357",
      "status": "Pending"
    }
  ]);

  const [messages, setMessages] = useState([
    {
      "sender": "AIT PUNE",
      "text": "all student should be present in the CG lab.",
      "imageUrl": "https://th.bing.com/th/id/OIP.PkrwrLwaq68CaqLPn7jBIwHaHa?rs=1&pid=ImgDetMain",
      "isActive": true
    },
    {
      "sender": "ADMIN",
      "text": "Council meet tomorrow at 8:45 PM.",
      "imageUrl": "https://www.treasurebox.co.nz/pub/media/wysiwyg/cmspage/david.png"
    },
    {
      "sender": "AIT PUNE",
      "text": "all student should be present in the CG lab.",
      "imageUrl": "https://th.bing.com/th/id/OIP.PkrwrLwaq68CaqLPn7jBIwHaHa?rs=1&pid=ImgDetMain",
      "isActive": true
    },
    {
      "sender": "AIT PUNE",
      "text": "all student should be present in the CG lab.",
      "imageUrl": "https://th.bing.com/th/id/OIP.PkrwrLwaq68CaqLPn7jBIwHaHa?rs=1&pid=ImgDetMain",
      "isActive": true
    }
  ]);

  // Function to determine the text color based on status
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-400";
      case "Completed":
        return "text-green-400";
      case "Declined":
        return "text-red-400";
      default:
        return "text-white";
    }
  };

  return (
    <div>
      <img 
        src={bg} 
        alt="Background Element" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />

      <div className="relative flex flex-row w-full h-full overflow-hidden">
        {/* Content Overlay */}
        <div className="flex flex-row w-full relative z-10">
          {/* Left side with two vertically stacked divs */}
          <div className="flex flex-col w-[60%] mt-8 p-4 relative z-10">
            <div className='text-3xl font-extrabold text-white pt-12'>
              DASHBOARD
            </div>
            <div className="pt-4 w-[75%] text-white text-2xl font">
              <div 
                className="max-w-[500px] relative h-60 rounded-3xl bg-cover bg-center" 
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

            <div className="text-xl font-extrabold text-white mb-4 mt-8">RECENT REQUESTS</div>
            <div className="flex justify-center items-top pb-4 mb-2 w-5/6 h-80 bg-[#202528] rounded-xl overflow-y-auto custom-scroll shadow-black">
              <table className="min-w-full table-auto h-10">
                <thead >
                  <tr>
                    <th className="px-4 py-2 text-gray-200 pt-4">Type Of Complaint</th>
                    <th className="px-4 py-2 text-gray-200 pt-4">Complaint ID</th>
                    <th className="px-4 py-2 text-gray-200 pt-4">Status</th>
                    <th className="px-4 py-2 text-gray-200 pt-4">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {complaints.map((complaint) => (
                    <tr key={complaint.complaintID} className="border-b border-gray-700">
                      <td className="ps-9 px-4 py-2 text-white">{complaint.type}</td>
                      <td className="px-10 py-2 text-white">{complaint.complaintID}</td>
                      <td className={`ps-10 px-4 py-2 font-semibold ${getStatusClass(complaint.status)}`}>
                        {complaint.status}
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href={`/complaints/${complaint.complaintID}`}
                          className="text-blue-500 hover:underline"
                        >
                          Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right side div */}
          <div className="w-[40%] p-4 relative z-10 pr-8 ">
            <div className="flex justify-end align- items-center gap-3">
              <div className="text-white font-extrabold text-lg">
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
              <div className='pt-6 text-white text-xl font-bold mb-2 font-poppins text-right'>
                RECENT UPDATES
              </div>
              <div className='bg-[#202528] rounded-lg h-[640px] overflow-y-auto custom-scroll'>
              <div className="flex flex-col space-y-4 p-4 bg-[#202528] rounded-xl max-w-md mx-auto">
                {messages.map((message, index) => (
                  <div key={index} className="flex space-x-4 items-start">
                    {/* Add relative class here */}
                    <div className="relative">
                      {/* Profile image */}
                      <div
                        className="w-12 h-12 bg-cover rounded-full"
                        style={{ backgroundImage: `url(${message.imageUrl})` }}
                      ></div>

                      {/* Conditionally render the green dot if the user is active */}
                      {message.isActive && (
                        <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-[#202528] bg-green-500"></span>
                      )}
                    </div>
                    <div>
                      <p className="text-white font-bold">{message.sender}</p>
                      <p className="text-white">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
