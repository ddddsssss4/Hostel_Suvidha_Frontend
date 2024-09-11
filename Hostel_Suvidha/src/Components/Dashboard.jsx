import React, { useState } from 'react';
import dashboard_bg from '../assets/dashboard_bg.png';
import adminpic from "../assets/adminpic.jpg";
import bg from '../assets/bgelement.png';
import '../App.css';

const Dashboard = () => {
  const [complaints, setComplaints] = useState([
    { "type": "ELECTRONIC", "complaintID": "12357", "status": "Pending" },
    { "type": "Washroom", "complaintID": "12357", "status": "Completed" },
    { "type": "Hostel", "complaintID": "12357", "status": "Declined" },
    { "type": "Furniture", "complaintID": "12357", "status": "Pending" },
    { "type": "Laundary", "complaintID": "12357", "status": "Pending" },
    { "type": "ELECTRONIC", "complaintID": "12357", "status": "Pending" },
    { "type": "ELECTRONIC", "complaintID": "12357", "status": "Pending" },
    { "type": "Furniture", "complaintID": "12357", "status": "Pending" },
    { "type": "ELECTRONIC", "complaintID": "12357", "status": "Pending" }
  ]);

  const [messages, setMessages] = useState([
    { "sender": "AIT PUNE", "text": "all student should be present in the CG lab.", "imageUrl": "https://th.bing.com/th/id/OIP.PkrwrLwaq68CaqLPn7jBIwHaHa?rs=1&pid=ImgDetMain", "isActive": true },
    { "sender": "ADMIN", "text": "Council meet tomorrow at 8:45 PM.", "imageUrl": "https://www.treasurebox.co.nz/pub/media/wysiwyg/cmspage/david.png" },
    { "sender": "AIT PUNE", "text": "all student should be present in the CG lab.", "imageUrl": "https://th.bing.com/th/id/OIP.PkrwrLwaq68CaqLPn7jBIwHaHa?rs=1&pid=ImgDetMain", "isActive": true },
    { "sender": "AIT PUNE", "text": "all student should be present in the CG lab.", "imageUrl": "https://th.bing.com/th/id/OIP.PkrwrLwaq68CaqLPn7jBIwHaHa?rs=1&pid=ImgDetMain", "isActive": true }
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
    <div className="relative flex flex-col md:flex-row w-full h-full overflow-hidden">
      {/* Background Image */}
      <img 
        src={bg} 
        alt="Background Element" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
      />

      {/* Content Overlay */}
      <div className="flex flex-col md:flex-row w-full relative z-10">
        {/* Left side with two vertically stacked divs */}
        <div className="flex flex-col w-full md:w-[60%] mt-8 p-4 relative z-10">
          <div className='text-3xl font-extrabold text-white pt-12'>
            DASHBOARD
          </div>
          <div className="pt-4 w-full md:w-[75%] text-white text-2xl font">
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
          <div className="w-full md:w-5/6 bg-[#202528] rounded-xl overflow-x-auto shadow-black">
            <table className="min-w-full hidden md:table text-left border-collapse">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-gray-200">Type Of Complaint</th>
                  <th className="px-4 py-2 text-gray-200">Complaint ID</th>
                  <th className="px-4 py-2 text-gray-200">Status</th>
                  <th className="px-4 py-2 text-gray-200">Details</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint.complaintID} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{complaint.type}</td>
                    <td className="px-4 py-2 text-white">{complaint.complaintID}</td>
                    <td className={`px-4 py-2 font-semibold ${getStatusClass(complaint.status)}`}>
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
            <div className="md:hidden">
              {complaints.map((complaint) => (
                <div key={complaint.complaintID} className="bg-[#202528] p-4 mb-4 rounded-xl shadow-md">
                  <div className="text-white font-bold text-lg">{complaint.type}</div>
                  <div className="text-white text-sm">Complaint ID: {complaint.complaintID}</div>
                  <div className={`text-white text-sm ${getStatusClass(complaint.status)}`}>Status: {complaint.status}</div>
                  <a
                    href={`/complaints/${complaint.complaintID}`}
                    className="text-blue-500 hover:underline"
                  >
                    Details
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side div */}
        <div className="w-full md:w-[40%] p-4 relative z-10 pr-8">
          <div className="flex justify-end items-center gap-3">
            <div className="text-white font-extrabold text-lg">
              <span className='text-[#FF824C] text-sm'>STUDENT </span>
              <br />
              AMAN KUMAR
            </div>
            <div className='relative h-12 w-12 rounded-full z-20 overflow-hidden'>
              <img src={adminpic} className='absolute top-0 left-0 w-full h-full object-cover' alt="Admin" />
              <div className='bg-green w-[12px] h-[12px]'></div>
            </div>
          </div>

          <div className='mt-6 flex flex-col w-full'>
            <div className='pt-6 text-white text-xl font-bold mb-2 font-poppins text-right'>
              RECENT UPDATES
            </div>
            <div className='bg-[#202528] rounded-lg h-[400px] md:h-[640px] overflow-y-auto'>
              <div className="flex flex-col space-y-4 p-4 bg-[#202528] rounded-xl max-w-md mx-auto">
                {messages.map((message, index) => (
                  <div key={index} className="flex space-x-4 items-start">
                    <div className="relative">
                      <div
                        className="w-12 h-12 bg-cover rounded-full"
                        style={{ backgroundImage: `url(${message.imageUrl})` }}
                      ></div>
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
  );
};

export default Dashboard;
