import React, { useState, useEffect } from "react";
import dashboard_bg from "../assets/dashboard_bg.png";
import "../App.css";
import axios from "axios";
import Spinner from "./Spinner"; // Ensure you have a Spinner component

const LaundryStaffDashboard = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [staffData, setStaffData] = useState({});
  const [previousClothes, setPreviousClothes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const storedData = localStorage.getItem("loginData");
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          const { accessToken, admin } = parsedData.data;
          setStaffData(admin);

          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

          // Use dummy data for now
          const dummyData = [
            {
              clothes: 12,
              status: "Pending",
              returnStatus: "Pending",
              createdAt: "2024-11-12T10:30:00Z",
            },
            {
              clothes: 20,
              status: "Completed",
              returnStatus: "Returned",
              createdAt: "2024-11-10T14:20:00Z",
            },
            {
              clothes: 8,
              status: "Washing",
              returnStatus: "Not Requested",
              createdAt: "2024-11-08T16:45:00Z",
            },
          ];
          setPreviousClothes(dummyData);
        } catch (error) {
          console.error("Error parsing login data:", error);
        }
      } else {
        console.warn("No login data found in localStorage.");
      }
      setLoading(false); // Stop loading after processing
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />; // Replace with your spinner component
  }

  return (
    <div className="relative flex flex-col md:flex-row w-full h-full overflow-hidden">
      <div className="flex flex-col md:flex-row w-full relative z-10">
        {/* Left Side */}
        <div className="flex flex-col w-full md:w-[60%] p-4 relative z-10">
          <h1 className="text-3xl font-extrabold text-white pt-8">STAFF DASHBOARD</h1>

          {/* Staff Info Card */}
          <div className="pt-4 w-full md:w-[75%] text-white text-2xl">
            <div
              className="max-w-[500px] h-60 rounded-3xl bg-cover bg-center relative"
              style={{ backgroundImage: `url(${dashboard_bg})` }}
            >
              <div className="absolute top-5 left-5 h-20 w-20 rounded-full z-20 border-4 border-[#FF824C] overflow-hidden">
                <img
                  src="https://www.treasurebox.co.nz/pub/media/wysiwyg/cmspage/david.png"
                  className="w-full h-full object-cover"
                  alt="Staff"
                />
              </div>
              <div className="absolute bottom-0 left-0 p-4 text-white text-3xl font-extrabold">
                <div className="text-lg text-[#FF824C]">Staff</div>
                {staffData.fullName || "N/A"}
              </div>
            </div>
          </div>

          {/* Assigned Complaints Section */}
          <a href="/laundry/staff/complaints" className="text-xl font-extrabold text-blue-500 mb-4 mt-8">
            ASSIGNED COMPLAINTS
          </a>

          {/* Laundry Table */}
          <div className="w-full md:w-full bg-[#202528] rounded-xl overflow-x-auto shadow-black h-[36vh] overflow-y-auto custom-scroll">
            <table className="min-w-full text-left border-collapse bg-[#171A1C]">
              <thead className="bg-gray-800 sticky top-0 z-10">
                <tr>
                  <th className="px-4 py-2 text-gray-200">Total Clothes</th>
                  <th className="px-4 py-2 text-gray-200">Status</th>
                  <th className="px-4 py-2 text-gray-200">Return Status</th>
                  <th className="px-4 py-2 text-gray-200">Date</th>
                </tr>
              </thead>
              <tbody>
                {previousClothes.map((entry, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-700 transition"
                  >
                    <td className="px-4 py-2 text-white">{entry.clothes || "N/A"}</td>
                    <td
                      className={`px-4 py-2 font-bold ${
                        entry.status === "Completed"
                          ? "text-green-500"
                          : entry.status === "Pending"
                          ? "text-yellow-400"
                          : "text-blue-400"
                      }`}
                    >
                      {entry.status || "Pending"}
                    </td>
                    <td
                      className={`px-4 py-2 font-bold ${
                        entry.returnStatus === "Returned"
                          ? "text-green-500"
                          : entry.returnStatus === "Not Requested"
                          ? "text-gray-500"
                          : "text-yellow-400"
                      }`}
                    >
                      {entry.returnStatus || "Pending"}
                    </td>
                    <td className="px-4 py-2 text-white">
                      {entry.createdAt
                        ?.split("T")[0]
                        .split("-")
                        .reverse()
                        .join("/") || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side - Recent Updates */}
        <div className="w-full md:w-[40%] p-4 mt-8 pr-8 relative z-10">
          <h2 className="text-white text-xl font-bold mb-2 text-right">RECENT UPDATES</h2>
          <div className="bg-[#202528] rounded-lg h-[400px] md:h-[600px] overflow-y-auto">
            {/* Add recent updates logic here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaundryStaffDashboard;
