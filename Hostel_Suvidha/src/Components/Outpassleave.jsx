import React, { useState, useEffect } from 'react';
import bg from '../assets/bgelement.png';
import '../App.css';

function Outpassleave() {
    const [status, setStatus] = useState("Approved");
    const [formType, setFormType] = useState("outpass"); // Dropdown form selection
    const [toggleView, setToggleView] = useState("outpass"); // Controls which details (outpass/leave) to display
    const [outpassData, setOutpassData] = useState([]);
    const [leaveData, setLeaveData] = useState([]);
    const [formInput, setFormInput] = useState({ time: '', reason: '' });

    // Simulate fetching data from an API for Outpass and Leave
    useEffect(() => {
        const fetchOutpassData = async () => {
            setOutpassData([
                { time: '09:00 AM', reason: 'Doctor Appointment', status: 'Approved' },
                { time: '12:00 PM', reason: 'Family Event', status: 'Declined' },
                { time: '03:00 PM', reason: 'Meeting with Professor', status: 'Pending' },
            ]);
        };

        const fetchLeaveData = async () => {
            setLeaveData([
                { date: '11/08/2024', reason: 'Family Function', status: 'Approved' },
                { date: '12/08/2024', reason: 'Sick Leave', status: 'Pending' },
            ]);
        };

        fetchOutpassData();
        fetchLeaveData();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formType === 'outpass') {
            setOutpassData([...outpassData, { time: formInput.time, reason: formInput.reason, status: 'Pending' }]);
        } else {
            setLeaveData([...leaveData, { date: formInput.time, reason: formInput.reason, status: 'Pending' }]);
        }
        setFormInput({ time: '', reason: '' });
    };

    return (
        <div className="relative min-h-screen">
            {/* Ensure background image covers the full screen */}
            <img
                src={bg}
                alt="Background Element"
                className="absolute inset-0 w-full h-full object-cover z-[-1]"
            />
            <div className="p-8 pt-28 gap-8 w-full relative flex flex-row justify-between">
                {/* Form Section */}
                <div className="bg-[#202528] text-white flex-col p-6 rounded-3xl w-[45%] border-b-8 border-[#7380EC] h-[440px] flexible-height">
                    <h2 className="text-xl font-semibold mb-4">OUTPASS / LEAVES FORM</h2>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        {/* Dropdown for selecting outpass or leave */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Select Type:</label>
                            <select
                                className="bg-gray-700 border-none text-white p-2 rounded-md w-full"
                                value={formType}
                                onChange={(e) => setFormType(e.target.value)}
                            >
                                <option value="outpass">Outpass</option>
                                <option value="leave">Leave</option>
                            </select>
                        </div>

                        {/* Time/Date Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">
                                {formType === 'outpass' ? 'Time' : 'Date'}:
                            </label>
                            <input
                                type={formType === 'outpass' ? "text" : "date"} // Change to date input for Leave
                                className="bg-gray-700 border-none text-white p-2 rounded-md w-full"
                                placeholder={formType === 'outpass' ? "Enter time" : "Enter date"}
                                value={formInput.time}
                                onChange={(e) => setFormInput({ ...formInput, time: e.target.value })}
                            />
                        </div>

                        {/* Reason Input */}
                        <div className="space-y-2">
                            <label className="block text-sm font-medium">Reason:</label>
                            <input
                                type="text"
                                className="bg-gray-700 border-none text-white p-2 rounded-md w-full"
                                placeholder="Enter reason"
                                value={formInput.reason}
                                onChange={(e) => setFormInput({ ...formInput, reason: e.target.value })}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="bg-[#7380EC] text-white p-2 rounded-md w-full mt-4"
                        >
                            Submit
                        </button>
                    </form>
                </div>

                {/* Display Section */}
                <div className="flex pt-0 flex-col w-[50%] custom-scroll bg-[#202528] mr-6 text-white overflow-y-scroll p-6 rounded-3xl border-b-8 h-[600px]  border-[#7380EC] flexible-height">
                    {/* Toggle Button Section */}
                    <div className='sticky top-0 pt-8 bg-[#202528] z-10'>
                        <h2 className="text-xl font-semibold mb-4">OUTPASS / LEAVES DETAILS</h2>
                        <div className="flex space-x-4 mb-4">
                            <button
                                onClick={() => setToggleView('outpass')}
                                className={`p-2 w-1/2 ${toggleView === 'outpass' ? 'bg-[#7380EC]' : 'bg-gray-700'} rounded-md text-white`}>
                                Outpass
                            </button>
                            <button
                                onClick={() => setToggleView('leave')}
                                className={`p-2 w-1/2 ${toggleView === 'leave' ? 'bg-[#7380EC]' : 'bg-gray-700'} rounded-md text-white`}>
                                Leave
                            </button>
                        </div>
                    </div>

                    {/* Toggle Content based on selected view */}
                    {toggleView === 'outpass' && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Outpass Details</h3>
                            {outpassData.length > 0 ? (
                                outpassData.map((outpass, index) => (
                                    <div key={index} className="bg-gray-700 p-4 rounded-md text-white mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Time: {outpass.time}</span>
                                            <span
                                                className={`font-bold text-lg ${
                                                    outpass.status === 'Approved'
                                                        ? 'text-green-500'
                                                        : outpass.status === 'Declined'
                                                        ? 'text-red-500'
                                                        : 'text-yellow-500'
                                                }`}
                                            >
                                                {outpass.status}
                                            </span>
                                        </div>
                                        <p>Reason: {outpass.reason}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No Outpass Requests Available</p>
                            )}
                        </div>
                    )}

                    {toggleView === 'leave' && (
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Leave Details</h3>
                            {leaveData.length > 0 ? (
                                leaveData.map((leave, index) => (
                                    <div key={index} className="bg-gray-700 p-4 rounded-md text-white mb-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Date: {leave.date}</span>
                                            <span
                                                className={`font-bold text-lg ${
                                                    leave.status === 'Approved'
                                                        ? 'text-green-500'
                                                        : 'text-yellow-500'
                                                }`}>
                                                {leave.status}
                                            </span>
                                        </div>
                                        <p>Reason: {leave.reason}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No Leave Requests Available</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Outpassleave;
