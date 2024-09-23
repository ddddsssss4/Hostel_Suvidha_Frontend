import "./App.css";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

//Student Pages

import Dashboard from "./Components/Dashboard";
import Complaints from "./Components/Complaints";
import Requests from "./Components/Requests";
import MainLayout from "./Components/MainLayout";
import Electronic from "./Components/Electronic";
import Furniture from "./Components/Furniture";
import WashRoom from "./Components/WashRoom";
import RoomService from "./Components/RoomService";
import Disciplinary from "./Components/Disciplinary";
import Wifi from "./Components/Wifi";
import InOut from "./Components/InOut";
import Grievances from "./Components/Grievances";
import Miscellaneous from "./Components/Miscellaneous";
import FaceRecognition from "./Pages/FaceRecognition";
import Laundry from "./Components/Laundry";
import Outpassleave from "./Components/Outpassleave";
import RegisterStudent from "./Components/RegisterStudent";

//Admin Pages

import AdminDashboard from "./Components/AdminDashboard";
import AdminLayout from "./Components/AdminLayout";
import AdminComplaints from "./Components/AdminComplaints";
import AdminGateEntries from "./Components/AdminGateEntries";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        {/* Student Routes */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/complaints" element={<Complaints />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/laundry" element={<Laundry />} />
        <Route path="/inOut" element={<InOut />} />
        <Route path="/Outpassleave" element={<Outpassleave />} />
        <Route path="/Complaints/Electronic" element={<Electronic />} />
        <Route path="/Complaints/Furniture" element={<Furniture />} />
        <Route path="/Complaints/Washroom" element={<WashRoom />} />
        <Route path="/Complaints/RoomService" element={<RoomService />} />
        <Route path="/Complaints/Disciplinary" element={<Disciplinary />} />
        <Route path="/Complaints/Wifi" element={<Wifi />} />
        <Route path="/Complaints/Miscellaneous" element={<Miscellaneous />} />
        <Route path="/Complaints/Grievances" element={<Grievances />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterStudent />} />
      <Route path="/face" element={<FaceRecognition />} />

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/complaints" element={<AdminComplaints/>} />
        <Route path="/admin/inOut" element={<AdminGateEntries/>} />
      </Route>

    </Routes>
  </BrowserRouter>
);

export default App;
