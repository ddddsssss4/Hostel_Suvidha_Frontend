import React, { useState } from "react";

const Requests = () => {
  // State management for the form inputs
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    hostelName: "",
    roomNo: ""
  });

  const [medicalFormData, setMedicalFormData] = useState({
    date: "",
    time: "",
    details: ""
  });

  // State for submitted data to be reviewed
  const [submittedFormData, setSubmittedFormData] = useState(null);
  const [submittedMedicalFormData, setSubmittedMedicalFormData] = useState(null);

  // Handle Change for Medical Assistance Form
  const handleChangeMedical = (e) => {
    setMedicalFormData({
      ...medicalFormData,
      [e.target.id]: e.target.value
    });
  };

  // Function to handle input change
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  // Function to handle form submission for room service
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedFormData(formData); // Store submitted data
    console.log("Form data submitted: ", formData);
  };

  // Handle Submit for Medical Assistance
  const handleSubmitMedical = (e) => {
    e.preventDefault();
    setSubmittedMedicalFormData(medicalFormData); // Store submitted medical form data
    console.log("Medical Assistance Data:", medicalFormData);
  };

  return (
    <div className="mt-8 gap-8 w-full">
      <h1 className="font-extrabold text-3xl pl-4 text-center sm:text-left text-white">
        REQUESTS
      </h1>
      <div className="flex flex-wrap gap-14 mt-6">
        <div className="w-[40%] h-full">
        <div className="flex flex-col items-start pb-4 mb-2 w-full h-60 bg-[#202528] rounded-md overflow-y-auto custom-scroll ml-4 shadow-lg border-t-8 border-[#7380EC]">
          <h2 className="text-2xl font-semibold m-4 text-white">Requests for Room Service</h2>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full px-6">
            <div className="flex flex-col">
              <label className="text-sm text-white mb-1" htmlFor="date">Select Date</label>
              <input
                id="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7380EC] bg-gray-700 text-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-white mb-1" htmlFor="time">Select Time</label>
              <input
                id="time"
                type="time"
                value={formData.time}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7380EC] bg-gray-700 text-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-white mb-1" htmlFor="hostelName">Hostel Name</label>
              <input
                id="hostelName"
                type="text"
                placeholder="Hostel Name"
                value={formData.hostelName}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7380EC] bg-gray-700 text-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-white mb-1" htmlFor="roomNo">Room No</label>
              <input
                id="roomNo"
                type="text"
                placeholder="Room No"
                value={formData.roomNo}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7380EC] bg-gray-700 text-white"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-[#7380EC] text-white rounded-md hover:bg-[#5c6ab1] transition duration-300"
            >
              Submit
            </button>
          </form>
        </div>
                  {/* Request for Medical Assistance */}
            <div className="flex flex-col items-start pb-4 mb-2 w-full h-60 bg-[#202528] rounded-md overflow-y-auto custom-scroll ml-4 shadow-lg border-t-8 border-[#7380EC] mt-8">
            <h3 className="text-xl font-semibold m-4 text-white">Medical Assistance</h3>
            <form onSubmit={handleSubmitMedical} className="flex flex-col space-y-4 w-full px-6">
              <div className="flex flex-col">
                <label className="text-sm text-white mb-1" htmlFor="medicalDate">Select Date</label>
                <input
                  id="medicalDate"
                  type="date"
                  value={medicalFormData.date}
                  onChange={handleChangeMedical}
                  className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7380EC] bg-gray-700 text-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-white mb-1" htmlFor="medicalTime">Select Time</label>
                <input
                  id="medicalTime"
                  type="time"
                  value={medicalFormData.time}
                  onChange={handleChangeMedical}
                  className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7380EC] bg-gray-700 text-white"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm text-white mb-1" htmlFor="medicalDetails">Details</label>
                <input
                  id="medicalDetails"
                  type="text"
                  placeholder="Medical details"
                  value={medicalFormData.details}
                  onChange={handleChangeMedical}
                  className="px-4 py-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7380EC] bg-gray-700 text-white"
                />
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-[#7380EC] text-white rounded-md hover:bg-[#5c6ab1] transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col w-full sm:w-[35%] bg-[#202528] rounded-md mr-4 text-white overflow-y-auto custom-scroll p-6 border-t-8 h-[600px] border-[#7380EC] shadow-lg mt-6 sm:mt-0 pt-4">
          <h2 className="font-extrabold text-xl pl-4 text-center sm:text-left text-white">Reviews</h2>
  <div className="flex flex-col gap-4 mb-1">
    {/* Review for Room Service */}
    {submittedFormData && (
      <div className="card p-6 rounded-lg bg-gradient-to-r from-[#1F2427] to-[#2C3134] shadow-md transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-bold text-[#7380EC] mb-4">Room Service Review</h3>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold text-white">Date:</span> {submittedFormData.date}
        </p>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold text-white">Time:</span> {submittedFormData.time}
        </p>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold text-white">Hostel Name:</span> {submittedFormData.hostelName}
        </p>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold text-white">Room No:</span> {submittedFormData.roomNo}
        </p>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold text-white">Status:</span>  
        </p>
      </div>
    )}

    {/* Review for Medical Assistance */}
    {submittedMedicalFormData && (
      <div className="card p-6 rounded-lg bg-gradient-to-r from-[#1F2427] to-[#2C3134] shadow-md transition-all duration-300 hover:shadow-xl">
        <h3 className="text-xl font-bold text-[#7380EC] mb-4">Medical Assistance Review</h3>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold text-white">Date:</span> {submittedMedicalFormData.date}
        </p>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold text-white">Time:</span> {submittedMedicalFormData.time}
        </p>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold text-white">Details:</span> {submittedMedicalFormData.details}
        </p>
        <p className="text-sm text-gray-300 mb-2">
          <span className="font-semibold text-white">Status:</span> 
        </p>
      </div>
    )}
  </div>
        </div>
      </div>
    </div>
  );
  
};

export default Requests;