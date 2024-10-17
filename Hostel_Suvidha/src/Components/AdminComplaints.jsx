import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgelm from '../assets/bgelement.png';
import Spinner from './Spinner';

const AdminComplaints = () => {
    const token = localStorage.getItem("accessToken");
  const [selectedCategory, setSelectedCategory] = useState('Electronic');
  const [complaintsData, setComplaintsData] = useState([]);
  const [loading, setLoading] = useState(true); // State for managing the loader
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const categories = [
    'ALL', 'ELECTRONIC', 'FURNITURE', 'WASHROOM', 'ROOM SERVICE', 
    'DISCIPLINARY', 'WIFI'
  ];

  // Fetch complaints data from the API
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const response = await axios.get('https://hostel-suvidha.onrender.com/api/v1/students/allComplaints',{
                headers: {
                    Authorization: `Bearer ${token}`
                }
        });
        console.log("Fetched Complaints:", response.data.data);
        setComplaintsData(response.data.data);
      } catch (error) {
        console.error("Error fetching complaints data:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or an error occurs
      }
    };

    fetchComplaints();
  }, [backendUrl, token]);

  // Handle status update
  const handleStatusChange = async (complaintId, newStatus) => {
    setIsUpdating(true);
    setError(null);
    try {
      const response = await axios.post(`${backendUrl}/admins/updateComplaintStatus`, {
        complaintId,
        status: newStatus
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        // Update the complaint status in the local state
        setComplaintsData(prevData =>
          prevData.map(complaint =>
            complaint._id === complaintId
              ? { ...complaint, status: newStatus }
              : complaint
          )
        );
        alert("Status updated successfully.");
      } else {
        throw new Error("Failed to update status.");
      }
    } catch (err) {
      console.error("Error updating status:", err);
      setError("Failed to update status. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative text-white px-4 sm:px-0">
      <img 
        src={bgelm} 
        alt="Background Element" 
        className="absolute inset-0 w-full h-full object-cover top-[-6vh] z-[-1]" 
      />
      <div className="flex flex-col min-h-screen gap-6 mt-12">
        <h1 className="font-extrabold text-3xl text-center sm:text-left">
          COMPLAINTS
        </h1>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-4">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`px-8 py-4 min-w-12 rounded-2xl font-bold text-xl ${
                selectedCategory.toUpperCase() === category.toUpperCase() 
                  ? 'border-[#7380EC] border-4'
                  : 'border-gray-600 border'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}

        {/* Complaints Table */}
        {loading ? (
          <Spinner />
        ) : (
        <div className="overflow-x-auto">
          <table className="w-[90%] bg-gray-800 rounded-md">
            <thead>
              <tr className="text-left text-white uppercase text-sm">
                <th className="py-3 px-6">Type of Complaint</th>
                <th className="py-3 px-6">Complaint ID</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Details</th>
              </tr>
            </thead>
            <tbody>
              {complaintsData.map((complaint, index) => (
                selectedCategory === 'ALL' || complaint.complaintType?.toUpperCase() === selectedCategory?.toUpperCase() ? (
                  <tr key={index} className="text-sm font-semibold text-gray-300 border-t border-gray-700">
                    <td className="py-3 px-6">{complaint.complaintType}</td>
                    <td className="py-3 px-6">{complaint.title}</td>
                    <td className="py-3 px-6">
                      <span
                        className={`px-3 py-1 rounded-full font-bold ${
                          complaint.status === 'Pending'
                            ? 'text-yellow-400'
                            : complaint.status === 'Completed'
                            ? 'text-green-400'
                            : 'text-red-400'
                        }`}
                      >
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-blue-400 cursor-pointer">Details</td>
                  </tr>
                ) : null
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;
