import React, { useEffect, useState } from "react";
import axios from "axios";
import bg from '../assets/bgelement.png';
import '../App.css';
import clock from '../assets/clock.svg';

const InOut = () => {
    const token = localStorage.getItem("accessToken");
    const regNumber = localStorage.getItem("regNumber");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [inOutLogs, setInOutLogs] = useState([]);
    const [inStatus, setInStatus] = useState(false);

    const formatDate = (isoString) => {
        const date = new Date(isoString);
      
        // Extracting UTC date and time components
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1; // Months are zero-based
        const year = date.getUTCFullYear();
      
        let hours = date.getUTCHours();
        const minutes = date.getUTCMinutes().toString().padStart(2, "0");
        const seconds = date.getUTCSeconds().toString().padStart(2, "0");
        const ampm = hours >= 12 ? 'PM' : 'AM';
      
        hours = hours % 12 || 12;
      
        return `${day}/${month}/${year} ${hours}:${minutes} ${ampm} UTC`;
      };

    const fetchIGateEntries = async () => {
        try {
            const response = await axios.get(
                `${backendUrl}/gate/allGateEnteriesByStudent/${regNumber}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const fetchedEntries = response.data.data.map(entry => ({
                date: formatDate(entry.createdAt).split(' ')[0],
                inTime: entry.status === "In" ? formatDate(entry.createdAt).split(' ')[1]+" "+formatDate(entry.createdAt).split(' ')[2] : null,
                outTime: entry.status === "Out" ? formatDate(entry.createdAt).split(' ')[1]+" "+formatDate(entry.createdAt).split(' ')[2] : null,
            }));

            setInOutLogs(fetchedEntries);
            if (fetchedEntries.length > 0) {
                const latestEntry = fetchedEntries[0];
                setInStatus(latestEntry.inTime !== null);
            }
            console.log("Fetched API Response:", response.data);
        } catch (error) {
            console.error("Error fetching all gate entries:", error);
        }
    };

    const check = (value) => value == null;

    useEffect(() => {
        fetchIGateEntries();
    }, []);


    return (
        <div>
            <img
                src={bg}
                alt="Background Element"
                className="absolute inset-0 w-full h-full object-cover z-[-1]"
            />
            <div className="text-white h-screen w-full flex flex-col py-6">
                <div className="flex items-center w-full">
                    <div className="text-2xl p-5 font-bold">IN & OUT</div>
                    <div className="flex items-center bg-[#202528] gap-2 p-3 rounded-lg">
                        <span className="font-semibold">Status :</span>
                        <div className="flex justify-between">
                            <div className={`${inStatus ? `bg-green-700` : `bg-[#202528]`} text-white font-bold px-3 py-1 rounded-md`}>IN</div>
                            <div className={`${!inStatus ? `bg-red-700` : `bg-[#202528]`} text-white font-bold px-3 py-1 rounded-md`}>OUT</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex gap-8 w-full">
                    <div className="flex justify-center items-top pb-4 mb-2 w-[50%] h-80 bg-[#202528] rounded-md overflow-y-auto custom-scroll ml-4 shadow-black border-t-8 border-[#7380EC]">
                        <table className="min-w-full table-auto h-10">
                            <thead>
                                <tr>
                                    <th className="px-4 py-4 pl-16 text-gray-200 text-left">Date</th>
                                    <th className="px-4 py-4 pl-16 text-gray-200 text-left">OutTime</th>
                                    <th className="px-4 py-4 pl-16 text-gray-200 text-left">InTime</th>
                                </tr>
                            </thead>
                            <tbody>
                                {inOutLogs.map((val, i) => (
                                    <tr key={i} className="border-b border-gray-700">
                                        <td className="px-4 py-3 pl-16 text-white text-left">{val.date}</td>
                                        <td className="px-4 py-3 pl-16 text-white text-left">{val.outTime || "N/A"}</td>
                                        <td className="px-4 py-3 pl-16 text-white text-left">
                                            {check(val.inTime) ? (
                                                <img src={clock} alt="Clock" className="inline w-6 h-6 ml-2" />
                                            ) : val.inTime}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InOut;
