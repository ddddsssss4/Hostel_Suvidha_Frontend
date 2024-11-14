// src/components/StaffComplaintsPage.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ComplaintDetailModal from './ComplaintDetailModal';
import Spinner from './Spinner';

const StaffComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admins/getAllComplaints`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Only keep unresolved complaints
        const unresolvedComplaints = response.data.data.filter(
          (complaint) => complaint.status !== 'Resolved'
        );
        setComplaints(unresolvedComplaints);
      } catch (error) {
        console.error('Failed to load complaints:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [backendUrl, token]);

  const openComplaintDetail = (complaint) => {
    setSelectedComplaint(complaint);
  };

  const handleResolveComplaint = async (complaintId) => {
    try {
      const response = await axios.post(
        `${backendUrl}/staff/resolveComplaint`,
        { complaintId, status: 'Resolved' },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        // Filter out the resolved complaint from the list
        setComplaints((prev) => prev.filter((complaint) => complaint._id !== complaintId));
        setSelectedComplaint(null); // Close the modal after resolving
      }
    } catch (error) {
      console.error('Failed to resolve complaint:', error);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-transparent text-gray-200">
      <h1 className="text-3xl font-bold text-gray-100 my-12">Assigned Complaints</h1>

      {loading ? (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((complaint) => (
            <div
              key={complaint._id}
              className="p-4 border border-gray-700 rounded-lg shadow-md cursor-pointer bg-[#181A1E] hover:bg-[#262930]"
              onClick={() => openComplaintDetail(complaint)}
            >
              <h2 className="font-bold text-xl text-gray-100">{complaint.title}</h2>
              <p className="text-gray-400">{complaint.description}</p>
              <p className="mt-2 text-sm font-semibold">
                Status: <span className="text-yellow-400">{complaint.status}</span>
              </p>
              <p className="mt-2 text-sm text-gray-400">Type: {complaint.complaintType}</p>
            </div>
          ))}
        </div>
      )}

      {selectedComplaint && (
        <ComplaintDetailModal
          complaint={selectedComplaint}
          onClose={() => setSelectedComplaint(null)}
          onResolve={() => handleResolveComplaint(selectedComplaint._id)}
        />
      )}
    </div>
  );
};

export default StaffComplaintsPage;
