import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import bgelm from "../assets/bgelement.png";

const ComplaintDetail = () => {
  const { complaintId } = useParams();
  const [complaintData, setComplaintData] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/students/allComplaints`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });
        response.data.data.forEach(e => {
          if(e._id==complaintId){
            setComplaintData(e);
          }
        });
      } catch (error) {
        setError('Failed to load complaint data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchComplaintData();
  }, [backendUrl, token]);

  return (
    <div className="relative text-white px-4 sm:px-0">
      <img
        src={bgelm}
        alt="Background Element"
        className="absolute inset-0 w-full h-full object-cover top-[-6vh] z-[-1]"
      />
      <div className="flex flex-col min-h-screen gap-6 mt-12">
        <h1 className="font-extrabold text-3xl text-center sm:text-left">
          COMPLAINT DETAILS
        </h1>
        <div className="flex lg:w-[75vw] flex-col lg:flex-row gap-8 mb-4">
          {loading ? (
            <div className="flex justify-center items-center w-full h-[70vh]">
              <Spinner /> {/* Display spinner while loading */}
            </div>
          ) : (
            <>
              {/* Complaint Detail Card */}
              <div className="p-6 border-t-8 border-[#7380EC] bg-[#202528] lg:w-2/3 rounded-md h-[70vh]">
                {complaintData ? (
                  <div className="space-y-4">
                    <p><strong>Title:</strong> {complaintData.title}</p>
                  <p><strong>Description:</strong> {complaintData.description}</p>
                  <p><strong>Complaint Type:</strong> {complaintData.complaintType}</p>
                  <p>
                    <strong>Status: </strong>
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${
                        complaintData.status === 'Pending'
                          ? 'bg-yellow-400 text-black'
                          : complaintData.status === 'InProgress'
                          ? 'bg-blue-400 text-white'
                          : complaintData.status === 'Resolved'
                          ? 'bg-green-400 text-white'
                          : 'bg-red-400 text-white'
                      }`}
                    >
                      {complaintData.status}
                    </span>
                  </p>
                  <p><strong>Date Submitted:</strong> {new Date(complaintData.createdAt).toLocaleDateString()}</p>
                  <p><strong>Room Number:</strong> {complaintData.roomNumber}</p>
                  {complaintData.image && (
                    <div>
                      <strong>Image:</strong>
                      <img
                        src={complaintData.image}
                        alt="Complaint"
                        className="mt-4 rounded-md border border-gray-700 shadow-md max-h-64"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-400">No complaint details found.</p>
              )}
            </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
