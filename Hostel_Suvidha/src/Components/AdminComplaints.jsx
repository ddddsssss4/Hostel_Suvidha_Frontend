import React, { useState } from 'react';
import bgelm from '../assets/bgelement.png';


const AdminComplaints = () => {
  const [selectedCategory, setSelectedCategory] = useState('Electronic');

  const complaintsData = [
    { id: 12357, type: 'Electronic', status: 'Pending' },
    { id: 12357, type: 'Electronic', status: 'Completed' },
    { id: 12357, type: 'Electronic', status: 'Completed' },
    { id: 12357, type: 'Electronic', status: 'Declined' },
    { id: 12357, type: 'Electronic', status: 'Pending' },
    { id: 12357, type: 'Electronic', status: 'Completed' },
    { id: 12357, type: 'Disciplinary', status: 'Declined' },
    { id: 12357, type: 'Room Service', status: 'Pending' },
    { id: 12357, type: 'Wifi', status: 'Completed' },
    { id: 12358, type: 'Furniture', status: 'Completed' },
    { id: 12359, type: 'Furniture', status: 'Declined' },
    { id: 12360, type: 'Washroom', status: 'Pending' },
    { id: 12361, type: 'Washroom', status: 'Completed' },
  ];

  const categories = [
    'ELECTRONIC', 'FURNITURE', 'WASHROOM', 'ROOM SERVICE', 
    'DISCIPLINARY', 'WIFI'
  ];

  return (
    <div className="relative text-white px-4 sm:px-0">
        <img 
            src={bgelm} 
            alt="Background Element" 
            className="absolute inset-0 w-full h-full object-cover top-[-6vh] z-[-1]" 
        />
        <div className="flex flex-col min-h-screen gap-6 mt-12">
            <h1 className="font-extrabold text-3xl text-center sm:text-left">
            COMPLAINT
            </h1>

            {/* Categories */}
            <div className="flex flex-wrap gap-3 mb-4">
                {categories.map((category, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-8 py-4 min-w-12 rounded-2xl font-bold text-xl ${selectedCategory.toUpperCase() === category.toUpperCase() ? 'border-[#7380EC] border-[4px]' : 'border-gray-600 border-[1px]'}`}
                >
                    {category}
                </button>
                ))}
            </div>

            {/* Complaints Table */}
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
                    selectedCategory === 'ALL' || complaint.type.toUpperCase() === selectedCategory.toUpperCase() ? (
                        <tr key={index} className="text-sm font-semibold text-gray-300 border-t border-gray-700">
                        <td className="py-3 px-6">{complaint.type}</td>
                        <td className="py-3 px-6">{complaint.id}</td>
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
        </div>
    </div>
  );
};

export default AdminComplaints;
