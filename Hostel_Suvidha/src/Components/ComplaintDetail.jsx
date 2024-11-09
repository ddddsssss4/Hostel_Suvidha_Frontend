// src/components/ComplaintDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import bgelm from "../assets/bgelement.png";
import { useSnackbar } from './SnackbarContext';

const ComplaintDetail = () => {
  const { complaintId } = useParams();
  const [complaintData, setComplaintData] = useState(null);
  const [loading, setIsLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [givingFeedback, setGivingFeedback] = useState(false);
  const [feedback, setFeedback] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem('accessToken');
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    const fetchComplaintData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/students/allComplaints`, {
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


  const handleFeedbackSubmit = async () => {
    if (!feedback) {
      showSnackbar("Please enter your feedback before submitting.", "red");
      return;
    }

    setUpdating(true);
    try {
      const response = await axios.post(`${backendUrl}/students/giveFeedback`, {
        complaintId,
        feedback,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        setComplaintData((prev) => ({ ...prev, status: 'Closed' }));
        showSnackbar("Feedback submitted and complaint closed.");
      } else {
        showSnackbar("Failed to submit feedback. Please try again.", "red");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      showSnackbar("Failed to submit feedback. Please try again.", "red");
    } finally {
      setUpdating(false);
      setGivingFeedback(false);
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
          COMPLAINT DETAILS
        </h1>
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

                  {complaintData.status === 'Resolved' ? (
                    givingFeedback ? (
                      <div className="mt-4">
                        <textarea
                          className="w-full p-2 rounded-md bg-gray-700 text-white"
                          placeholder="Enter your feedback here..."
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows={4}
                        />
                        <div className="mt-2 flex gap-2">
                          <button
                            onClick={handleFeedbackSubmit}
                            className="bg-green-600 text-white px-4 py-2 rounded-md"
                            disabled={updating}
                          >
                            {updating ? 'Submitting...' : 'Submit Feedback'}
                          </button>
                          <button
                            onClick={() => setGivingFeedback(false)}
                            className="bg-gray-600 text-white px-4 py-2 rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setGivingFeedback(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md"
                      >
                        Give Feedback
                      </button>
                    )
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-400">No complaint details found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
