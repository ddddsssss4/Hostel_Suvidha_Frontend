import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import bgelm from "../assets/bgelement.png";
import { useSnackbar } from './SnackbarContext';

const AdminComplaintDetail = () => {
  const { complaintId } = useParams();
  const [complaintData, setComplaintData] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [assignedStaff, setAssignedStaff] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('accessToken');
  const { showSnackbar } = useSnackbar();

  const staffOptions = ['Carpenter', 'Electrician', 'Plumber'];

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/admins/getAllComplaints`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          response.data.data.forEach(e => {
            if (e._id === complaintId) {
              setComplaintData(e);
            }
        });
      } catch (error) {
        console.error('Failed to load complaint data:', error);
        showSnackbar('Failed to load complaint data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaintData();
  }, [backendUrl, complaintId, token, showSnackbar]);

    
  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "text-orange-400";
      case "InProgress":
        return "text-blue-400";
      case "Resolved":
        return "text-green-400";
      case "Closed":
        return "text-red-400";
      default:
        return "text-white";
    }
  };

  const handleStatusChange = async (newStatus) => {
    if(newStatus != 'InProgress'){
      showSnackbar("Please wait for the assigned staff to resolve the complaint.", "red");
      return;
    }
    if (!assignedStaff) {
        showSnackbar("Please assign a staff member before updating the status.", "red");
        return;
    }

    setUpdating(true);
    try {
      const response = await axios.post(`${backendUrl}/admins/updateComplaintStatus`, {
        complaintId,
        status: newStatus,
        assignedTo: assignedStaff,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setComplaintData((prev) => ({ ...prev, status: newStatus, assignedTo: assignedStaff }));
        showSnackbar(`Status updated to ${newStatus} and assigned to ${assignedStaff}.`);
      } else {
        showSnackbar("Failed to update status. Please try again.", "red");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      showSnackbar("Failed to update status. Please try again.", "red");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="relative text-white px-4 sm:px-0">
      <div className="flex flex-col min-h-screen gap-6 mt-12">
        <h1 className="font-extrabold text-3xl text-center sm:text-left">COMPLAINT DETAILS</h1>
        <div className="flex lg:w-[75vw] flex-col lg:flex-row gap-8 mb-4">
          {loading ? (
            <div className="flex justify-center items-center w-full h-[70vh]">
              <Spinner />
            </div>
          ) : (
            <div className="p-6 border-t-8 border-[#7380EC] bg-[#202528] lg:w-2/3 rounded-md h-[70vh]">
              {complaintData ? (
                <div className="space-y-4">
                  <p><strong>Title:</strong> {complaintData.title}</p>
                  <p><strong>Description:</strong> {complaintData.description}</p>
                  <p><strong>Complaint Type:</strong> {complaintData.complaintType}</p>
                  <p>
                    <strong>Status: </strong>
                    <span className={`px-3 py-1 ${getStatusClass(complaintData.status)} rounded-full text-md font-semibold`}>
                      {complaintData.status}
                    </span>
                  </p>

                  {/* Staff Assignment Dropdown */}
                  {complaintData.status === 'Pending' && (
                    <div className="mt-4">
                      <label className="block mb-2 font-bold">Assign to:</label>
                      <select
                        value={assignedStaff}
                        onChange={(e) => setAssignedStaff(e.target.value)}
                        className="bg-gray-800 border border-gray-700 rounded-md p-2 text-white"
                      >
                        <option value="">Select a staff member</option>
                        {staffOptions.map((staff, index) => (
                          <option key={index} value={staff}>{staff}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Status Change Buttons */}
                  {complaintData.status === 'Pending' && (
                    <button 
                      onClick={() => handleStatusChange('InProgress')} 
                      disabled={updating} 
                      className="mt-4 bg-blue-500 px-4 py-2 rounded-md"
                    >
                      Move to In Progress
                    </button>
                  )}
                  {complaintData.status === 'InProgress' && (
                    <button 
                      onClick={() => handleStatusChange('Resolved')} 
                      disabled={updating} 
                      className="mt-4 bg-green-500 px-4 py-2 rounded-md"
                    >
                      Resolve
                    </button>
                  )}
                </div>
              ) : (
                <p>Complaint data not available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminComplaintDetail;
