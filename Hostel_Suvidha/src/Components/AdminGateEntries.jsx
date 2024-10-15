import React, { useEffect, useState } from "react";
import axios from "axios";
import bg from '../assets/bgelement.png';
import '../App.css';
import clock from '../assets/clock.svg';

const AdminGateEntries = () => {
    const token = localStorage.getItem("accessToken");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [gateEntries, setGateEntries] = useState([]);
    const [filteredEntries, setFilteredEntries] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [filterDate, setFilterDate] = useState("");

    const fetchGateEntries = async () => {
        try {
            const response = await axios.get(
                `${backendUrl}/gate/allGateEnteries`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            let fetchedEntries = response.data.data.map(entry => ({
                regNumber: entry.student.regNumber,
                date: new Date(entry.createdAt),
                inTime: entry.status === "In" ? new Date(entry.createdAt) : null,
                outTime: entry.status === "Out" ? new Date(entry.createdAt) : null,
            }));

            fetchedEntries = fillMissingInTimes(fetchedEntries);

            fetchedEntries = fetchedEntries.filter(entry => entry.outTime !== null);

            setGateEntries(fetchedEntries);
            setFilteredEntries(fetchedEntries);
            console.log("Fetched API Response:", response.data);
        } catch (error) {
            console.error("Error fetching gate entries:", error);
        }
    };

    const fillMissingInTimes = (entries) => {
        const groupedEntries = {};

        entries.forEach(entry => {
            const key = `${entry.regNumber}-${entry.date.toDateString()}`;
            if (!groupedEntries[key]) {
                groupedEntries[key] = [];
            }
            groupedEntries[key].push(entry);
        });

        Object.values(groupedEntries).forEach(group => {
            group.sort((a, b) => a.date - b.date);

            const inEntries = group
                .filter(entry => entry.inTime)
                .map(entry => ({ ...entry, used: false }));

            const outEntries = group.filter(entry => entry.outTime);

            outEntries.forEach(outEntry => {
                if (!outEntry.inTime) {
                    const matchingInEntry = inEntries.find(
                        inEntry => !inEntry.used && inEntry.date > outEntry.date
                    );
                    if (matchingInEntry) {
                        outEntry.inTime = matchingInEntry.date;
                        matchingInEntry.used = true;
                    }
                }
            });

            groupedEntries[group[0].regNumber + '-' + group[0].date.toDateString()] = [
                ...outEntries,
                ...inEntries.map(entry => ({
                    regNumber: entry.regNumber,
                    date: entry.date,
                    inTime: entry.inTime,
                    outTime: entry.outTime,
                })),
            ];
        });

        return Object.values(groupedEntries).flat();
    };

    const handleFilterDateChange = (e) => {
        const selectedDate = new Date(e.target.value);
        setFilterDate(e.target.value);

        const filtered = gateEntries.filter(entry => 
            entry.date.toDateString() === selectedDate.toDateString()
        );
        setFilteredEntries(filtered);
    };

    const toggleSortOrder = () => {
        const sortedEntries = [...filteredEntries].sort((a, b) => {
            if (a.date < b.date) return sortOrder === "asc" ? -1 : 1;
            if (a.date > b.date) return sortOrder === "asc" ? 1 : -1;
            
            if (a.outTime && b.outTime) {
                if (a.outTime < b.outTime) return sortOrder === "asc" ? -1 : 1;
                if (a.outTime > b.outTime) return sortOrder === "asc" ? 1 : -1;
                return 0;
            }
            if (a.outTime && !b.outTime) return sortOrder === "asc" ? -1 : 1;
            if (!a.outTime && b.outTime) return sortOrder === "asc" ? 1 : -1;
            return 0;
        });
        setFilteredEntries(sortedEntries);
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };

    useEffect(() => {
        fetchGateEntries();
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
                </div>

                <div className="flex justify-between items-center px-8">
                    <div>
                        <label className="text-gray-200 font-bold">Filter by Date:</label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={handleFilterDateChange}
                            className="ml-2 px-2 py-1 bg-[#7380EC] text-white rounded-md"
                        />
                    </div>
                    <button
                        onClick={toggleSortOrder}
                        className="bg-[#7380EC] text-white px-4 py-2 rounded-md"
                    >
                        Sort by Date ({sortOrder === "asc" ? "Ascending" : "Descending"})
                    </button>
                </div>

                <div className="mt-8 flex gap-8 w-full">
                    <div className="flex justify-center items-top pb-4 mb-2 w-[70%] h-full bg-[#202528] rounded-md overflow-y-auto custom-scroll ml-4 shadow-black border-t-8 border-[#7380EC]">
                        <table className="min-w-full table-auto h-10">
                            <thead>
                                <tr>
                                    <th className="px-4 py-4 pl-16 text-gray-200 text-left">Reg Number</th>
                                    <th className="px-4 py-4 pl-16 text-gray-200 text-left">Date</th>
                                    <th className="px-4 py-4 pl-16 text-gray-200 text-left">Out Time</th>
                                    <th className="px-4 py-4 pl-16 text-gray-200 text-left">In Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEntries.map((entry, i) => (
                                    <tr key={i} className="border-b border-gray-700">
                                        <td className="px-4 py-3 pl-16 text-white text-left">{entry.regNumber}</td>
                                        <td className="px-4 py-3 pl-16 text-white text-left">{entry.date.toLocaleDateString()}</td>
                                        <td className="px-4 py-3 pl-16 text-white text-left">
                                            {entry.outTime ? entry.outTime.toLocaleTimeString() : "N/A"}
                                        </td>
                                        <td className="px-4 py-3 pl-16 text-white text-left">
                                            {entry.inTime ? entry.inTime.toLocaleTimeString() : (
                                                <img src={clock} alt="Clock" className="inline w-6 h-6 ml-2" />
                                            )}
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

export default AdminGateEntries;
