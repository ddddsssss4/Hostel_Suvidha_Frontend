import React, { useState, useEffect } from 'react';
import dashboard_bg from '../assets/dashboard_bg.png';
import '../App.css';
import axios from 'axios';
import Spinner from './Spinner'; // Import the Spinner component

const StaffDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [staffData, setStaffData] = useState({});
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const storedData = localStorage.getItem('loginData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        const { accessToken, admin } = parsedData.data;
        setStaffData(admin);

        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        axios.get(`${backendUrl}/admins/getAllComplaints`)
          .then((response) => {
            const unresolvedComplaints = response.data.data.filter(
              (complaint) => complaint.status !== 'Resolved'
            );
            setComplaints(unresolvedComplaints);
          })
          .catch((error) => {
            console.error("Error fetching complaints:", error);
          })
          .finally(() => {
            setLoading(false); // Set loading to false when data fetching is complete
          });
      } catch (e) {
        console.error("Error parsing login data from localStorage", e);
        setLoading(false); // Set loading to false if there's an error
      }
    } else {
      setLoading(false); // No stored data, stop loading
    }
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-400";
      case "Completed":
        return "text-green-400";
      case "InProgress":
        return "text-blue-400";
      default:
        return "text-white";
    }
  };

  if (loading) {
    return <Spinner />; // Display Spinner component while loading
  }

  return (
    <div className="relative flex flex-col md:flex-row w-full h-full overflow-hidden">
      <div className="flex flex-col md:flex-row w-full relative z-10">
        
        {/* Left side */}
        <div className="flex flex-col w-full md:w-[60%] p-4 relative z-10">
          <h1 className="text-3xl font-extrabold text-white pt-8">STAFF DASHBOARD</h1>

          {/* Staff Info Card */}
          <div className="pt-4 w-full md:w-[75%] text-white text-2xl">
            <div 
              className="max-w-[500px] h-60 rounded-3xl bg-cover bg-center relative" 
              style={{ backgroundImage: `url(${dashboard_bg})` }}
            >
              <div className="absolute top-5 left-5 h-20 w-20 rounded-full z-20 border-4 border-[#FF824C] overflow-hidden">
                <img src={"https://www.treasurebox.co.nz/pub/media/wysiwyg/cmspage/david.png"} className="w-full h-full object-cover" alt="Staff" />
              </div>
              <div className="absolute bottom-0 left-0 p-4 text-white text-3xl font-extrabold">
                <div className="text-lg text-[#FF824C]">{staffData.role}</div>
                {staffData.fullName}
              </div>
            </div>
          </div>

          {/* Assigned Complaints Section */}
          <a href='/staff/complaints' className="text-xl font-extrabold text-blue-500 mb-4 mt-8">ASSIGNED COMPLAINTS</a>

          <div className="w-full md:w-[full] bg-[#202528] rounded-xl overflow-x-auto shadow-black h-[36vh] overflow-y-auto custom-scroll">
            <table className="min-w-full hidden md:table text-left border-collapse">
              <thead className="sticky top-0 bg-gray-800 z-10">
                <tr>
                  <th className="px-4 py-2 text-gray-200">Title</th>
                  <th className="px-4 py-2 text-gray-200">Description</th>
                  <th className="px-4 py-2 text-gray-200">Status</th>
                  <th className="px-4 py-2 text-gray-200">Room Number</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((complaint) => (
                  <tr key={complaint._id} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-white">{complaint.title}</td>
                    <td className="px-4 py-2 text-white">{complaint.description}</td>
                    <td className={`px-3 py-1 rounded-full ${getStatusClass(complaint.status)}`}>
                      {complaint.status}
                    </td>
                    <td className="px-4 py-2 text-white">{complaint.roomNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Mobile view */}
            <div className="md:hidden">
              {complaints.map((complaint) => (
                <div key={complaint._id} className="bg-[#202528] p-4 mb-4 rounded-xl shadow-md">
                  <div className="text-white font-bold text-lg">{complaint.title}</div>
                  <div className="text-white text-sm">Description: {complaint.description}</div>
                  <div className={`text-white text-sm ${getStatusClass(complaint.status)}`}>Status: {complaint.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Recent Updates */}
        <div className="w-full md:w-[40%] p-4 mt-8 pr-8 relative z-10">
          <h2 className="text-white text-xl font-bold mb-2 text-right">RECENT UPDATES</h2>
          <div className="bg-[#202528] rounded-lg h-[400px] md:h-[600px] overflow-y-auto">
            {/* Recent updates go here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;
