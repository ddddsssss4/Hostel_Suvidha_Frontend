import React, { useState, useEffect } from 'react';
import dashboard_bg from '../assets/dashboard_bg.png';
import bg from '../assets/bgelement.png';
import '../App.css';
import axios from 'axios'; // Import axios for API requests
import Spinner from './Spinner'; // Import Spinner component

const Dashboard = () => {
  const [studentData, setStudentData] = useState({
    fullName: '',
    profileImage: '',
    hostel: '',
    roomNumber: '',
    regNumber: '',
  });
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [complaints, setComplaints] = useState([]);
  const [messages, setMessages] = useState([
    { sender: "AIT PUNE", text: "All students should be present in the CG lab.", imageUrl: "https://th.bing.com/th/id/OIP.PkrwrLwaq68CaqLPn7jBIwHaHa?rs=1&pid=ImgDetMain", isActive: true },
    { sender: "ADMIN", text: "Council meet tomorrow at 8:45 PM.", imageUrl: "https://www.treasurebox.co.nz/pub/media/wysiwyg/cmspage/david.png" },
  ]);
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    const storedData = localStorage.getItem('loginData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { accessToken, refreshToken, student } = parsedData.data;
        setStudentData(student);

        // Set authorization header with the access token for axios
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        // Fetch complaints from API
        axios.get(`${backendUrl}/students/allComplaints`)
          .then((response) => {
            setComplaints(response.data.data); // Assuming the API returns an array of complaints
          })
          .catch((error) => {
            console.error("Error fetching complaints:", error);
          })
          .finally(() => {
            setLoading(false); // Set loading to false when data fetching is complete
          });
      } catch (e) {
        console.error("Error parsing login data from localStorage", e);
        setLoading(false); // Set loading to false if there is an error
      }
    } else {
      setLoading(false); // Set loading to false if there is no stored data
    }
  }, []);

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

  if (loading) {
    return <Spinner />; // Show Spinner component while loading
  }

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
                <img src={studentData.profileImage} className='w-full h-full object-cover' alt="Profile" />
              </div>

              {/* Centered text within the image */}
              <div className="absolute bottom-0 left-0 p-4 text-white text-3xl font-extrabold">
                <div className='text-lg text-[#FF824C]'>STUDENT</div>
                {studentData.fullName}
              </div>
            </div>
          </div>

          <div className="text-xl font-extrabold text-white mb-4 mt-8">RECENT REQUESTS</div>
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

        {/* Right side div */}
        <div className="w-full md:w-[40%] p-4 relative z-10 pr-8">
          <div className="flex justify-end items-center gap-3">
            <div className="text-white font-extrabold text-lg">
              <span className='text-[#FF824C] text-sm'>STUDENT </span>
              <br />
              {studentData.fullName}
            </div>
            <div className='relative h-12 w-12 rounded-full z-20 overflow-hidden'>
              <img src={studentData.profileImage} className='absolute top-0 left-0 w-full h-full object-cover' alt="Admin" />
              <div className='bg-green w-[12px] h-[12px]'></div>
            </div>
          </div>

          <div className='mt-6 flex flex-col w-full'>
            <div className='pt-6 text-white text-xl font-bold mb-2 font-poppins text-right'>
              RECENT UPDATES
            </div>
            <div className='bg-[#202528] rounded-lg h-[400px] md:h-[600px] overflow-y-auto'>
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
    </div>
  );
};

export default Dashboard;
