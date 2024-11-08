import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';

const AdminComplaints = () => {
  const token = localStorage.getItem("accessToken");
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [complaintsData, setComplaintsData] = useState([]);
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
      try {
        const response = await axios.get(`${backendUrl}/admins/getAllComplaints`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Fetched Complaints:", response.data.data);
        setComplaintsData(response.data.data);
      } catch (error) {
        console.error("Error fetching complaints data:", error);
        setError("Failed to fetch complaints. Please try again later.");
      }
    };

    fetchComplaints();
  }, [backendUrl, token]);

  // Handle status update


  // Filtered complaints based on selected category
  const filteredComplaints = complaintsData.filter(complaint =>
    selectedCategory === 'ALL' || complaint.complaintType?.toUpperCase() === selectedCategory.toUpperCase()
  );

  return (
    <div className="relative text-white px-4 sm:px-0">
      <div className="flex flex-col min-h-full gap-6 mt-12">
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
        <div className="w-[90%] overflow-x-auto h-80 custom-scroll">
          <table className="w-full bg-gray-800 rounded-md">
            <thead className='sticky top-0 bg-gray-800'>
              <tr className="text-left text-white uppercase text-sm">
                <th className="py-3 px-6">Type of Complaint</th>
                <th className="py-3 px-6">Title</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length > 0 ? (
                filteredComplaints
                  .sort((a, b) => (a.status === 'Resolved') - (b.status === 'Resolved'))
                  .map(complaint => (
                    <tr key={complaint._id} className="text-sm font-semibold text-gray-300 border-t border-gray-700">
                      <td className="py-3 px-6">{complaint.complaintType}</td>
                      <td className="py-3 px-6">{complaint.title}</td>
                      <td className={`px-3 py-1 rounded-full font-bold ${
                        complaint.status === 'Pending' ? 'text-yellow-400'
                          : complaint.status === 'InProgress' ? 'text-blue-400'
                          : complaint.status === 'Resolved' ? 'text-green-400'
                          : 'text-red-400'
                      }`}>
                        {complaint.status}
                      </td>
                      <td className="py-3 px-6 text-blue-400 cursor-pointer">
                        {complaint.status !== 'Resolved' && <a href={`/admins/complaints/${complaint._id}`}>Details</a>}
                      </td>
                    </tr>
                  ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-6 text-gray-400">
                    No complaints in this category.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Loading Indicator */}
        {isUpdating && (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default AdminComplaints;
