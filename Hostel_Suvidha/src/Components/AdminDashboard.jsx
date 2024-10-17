import React, { useState, useEffect } from 'react';
import dashboard_bg from '../assets/dashboard_bg.png';
import adminpic from "../assets/adminpic.jpg"; // Use admin's profile picture
import bg from '../assets/bgelement.png';
import '../App.css';
import axios from 'axios'; // Import axios for API requests

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [messages, setMessages] = useState([
    { sender: "AIT PUNE", text: "All students should be present in the CG lab.", imageUrl: "https://th.bing.com/th/id/OIP.PkrwrLwaq68CaqLPn7jBIwHaHa?rs=1&pid=ImgDetMain", isActive: true },
    { sender: "ADMIN", text: "Council meet tomorrow at 8:45 PM.", imageUrl: "https://www.treasurebox.co.nz/pub/media/wysiwyg/cmspage/david.png" },
  ]);

  useEffect(() => {
    const storedData = localStorage.getItem('loginData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { accessToken, refreshToken, student } = parsedData.data;

        // Set authorization header with the access token for axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Fetch complaints from API
        axios.get(`${backendUrl}/students/allComplaints`)
          .then((response) => {
            setComplaints(response.data.data); // Assuming the API returns an array of complaints
          })
          .catch((error) => {
            console.error("Error fetching complaints:", error);
          });
      } catch (e) {
        console.error("Error parsing login data from localStorage", e);
      }
    }
  }, []);

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
  {/* Background image */}
  <img src={bg} alt="Background Element" className="absolute inset-0 w-full h-full object-cover z-0" />

  {/* Main content */}
  <div className="flex flex-col md:flex-row w-full relative z-10">
    {/* Left side */}
    <div className="flex flex-col w-full md:w-[60%] p-4 relative z-10">
      <h1 className="text-3xl font-extrabold text-white pt-8">ADMIN DASHBOARD</h1>

      {/* Admin Info Card */}
      <div className="pt-4 w-full md:w-[75%] text-white text-2xl">
        <div 
          className="max-w-[500px] h-60 rounded-3xl bg-cover bg-center relative" 
          style={{ backgroundImage: `url(${dashboard_bg})` }}
        >
          <div className="absolute top-5 left-5 h-20 w-20 rounded-full z-20 border-4 border-[#FF824C] overflow-hidden">
            <img src={adminpic} className="w-full h-full object-cover" alt="Admin" />
          </div>
          <div className="absolute bottom-0 left-0 p-4 text-white text-3xl font-extrabold">
            <div className="text-lg text-[#FF824C]">ADMIN</div>
            AMAN KUMAR
          </div>
        </div>
      </div>

      {/* Recent Complaints Section */}
      <h2 className="text-xl font-extrabold text-white mb-4 mt-8">RECENT COMPLAINTS</h2>

      {/* Table for larger screens */}
      <div className="w-full md:w-full bg-[#202528] rounded-xl overflow-x-auto shadow-black h-[300px] overflow-y-auto custom-scroll">
      <table className="min-w-full hidden md:table text-left border-collapse">
              <thead className="sticky top-0 bg-gray-800 z-10">
                <tr>
                  <th className="px-4 py-2 text-gray-200 ">Title</th>
                  <th className="px-4 py-2 text-gray-200">Description</th>
                  <th className="px-4 py-2 text-gray-200">Status</th>
                  <th className="px-4 py-2 text-gray-200">Room Number</th>
                  <th className="px-4 py-2 text-gray-200">Details</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint._id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{complaint.title}</td>
                    <td className="px-4 py-2 text-white">{complaint.description}</td>
                    <td className={`px-3 py-1 rounded-full bg-transparent border-none focus:outline-none ${
                          complaint.status === 'Pending'
                            ? 'text-yellow-400'
                            : complaint.status === 'InProgress'
                            ? 'text-blue-400'
                            : complaint.status === 'Resolved'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}>
                      {complaint.status}
                    </td>
                    <td className="px-4 py-2 text-white">{complaint.roomNumber}</td>
                    <td className="px-4 py-2">
                      <a
                        href={`/complaints/${complaint._id}`}
                        className="text-blue-500 hover:underline"
                      >
                        Details
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

      {/* Card View for smaller screens */}
      <div className="md:hidden">
        {complaints.map((complaint) => (
          <div key={complaint._id} className="bg-[#202528] p-4 mb-4 rounded-xl shadow-md">
            <div className="text-white font-bold text-lg">{complaint.title}</div>
            <div className="text-white text-sm">Description: {complaint.description}</div>
            <div className={`text-white text-sm ${getStatusClass(complaint.status)}`}>Status: {complaint.status}</div>
            <a
              href={`/complaints/${complaint._id}`}
              className="text-blue-500 hover:underline"
            >
              Details
            </a>
          </div>
        ))}
      </div>
    </div>
    </div>

    {/* Right side - Recent Updates */}
    <div className="w-full md:w-[40%] p-4 mt-8 pr-8 relative z-10">
      <h2 className="text-white text-xl font-bold mb-2 text-right">RECENT UPDATES</h2>
      <div className="bg-[#202528] rounded-lg h-[400px] md:h-[600px] overflow-y-auto">
        <div className="flex flex-col space-y-4 p-4 bg-[#202528] rounded-xl max-w-md mx-auto">
          {messages.map((message, index) => (
            <div key={index} className="flex space-x-4 items-start">
              <div className="relative">
                <div
                  className="w-12 h-12 bg-cover rounded-full"
                  style={{ backgroundImage: `url(${message.imageUrl})` }}
                ></div>
                {message.isActive && (
                  <span className="absolute bottom-0 right-0 block w-3 h-3 rounded-full ring-2 ring-[#FF824C] bg-green-400"></span>
                )}
              </div>
              <div className="text-white">
                <div className="font-bold">{message.sender}</div>
                <p className="text-sm">{message.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default AdminDashboard;
