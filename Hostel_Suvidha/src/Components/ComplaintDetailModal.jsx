import React from 'react';

const ComplaintDetailModal = ({ complaint, onClose, onResolve }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
      <div className="bg-[#202528] p-6 rounded-lg shadow-lg max-w-md w-full text-gray-100">
        <h2 className="text-2xl font-bold mb-4 text-white">{complaint.title}</h2>
        <p><strong>Description:</strong> {complaint.description}</p>
        <p><strong>Type:</strong> {complaint.complaintType}</p>
        <p><strong>Status:</strong> {complaint.status}</p>
        <p><strong>Room Number:</strong> {complaint.roomNumber}</p>

        {complaint.image && (
          <img
            src={complaint.image}
            alt="Complaint"
            className="mt-4 rounded-md border border-gray-600 shadow-md max-h-64"
          />
        )}

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="mr-3 px-4 py-2 bg-gray-700 text-gray-200 rounded hover:bg-gray-600"
          >
            Close
          </button>
          {complaint.status !== 'Resolved' && (
            <button
              onClick={onResolve}
              className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-600"
            >
              Mark as Resolved
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetailModal;
