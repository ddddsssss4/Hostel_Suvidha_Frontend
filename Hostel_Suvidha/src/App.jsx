import "./App.css";
import LoginPage from "./Pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";


import { SnackbarProvider } from '../src/Components/SnackbarContext';

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
import ComplaintDetail from './Components/ComplaintDetail'; 

//Admin Pages

import AdminDashboard from "./Components/AdminDashboard";
import AdminLayout from "./Components/AdminLayout";
import AdminComplaints from "./Components/AdminComplaints";
import AdminGateEntries from "./Components/AdminGateEntries";
import AdminComplaintDetail from "./Components/AdminComplaintDetail";

//Staff Pages

import StaffComplaintsPage from "./Components/StaffComplaintsPage"
import StaffDashboard from "./Components/StaffDashboard";
import StaffLayout from "./Components/StaffLayout"
import LaundryStaffDashboard from "./Components/LaundryStaffDashboard";
import LaundryStaffLayout from "./Components/LaundryStaffLayout";

const App = () => (
  <BrowserRouter>
    <SnackbarProvider>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<MainLayout />}>
        {/* Student Routes */}
        <Route path="students/dashboard" element={<Dashboard />} />

        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/students/complaints" element={<Complaints />} />
        <Route path="/students/requests" element={<Requests />} />
        <Route path="/students/laundry" element={<Laundry />} />
        <Route path="/students/inOut" element={<InOut />} />
        <Route path="/students/Outpassleave" element={<Outpassleave />} />
        <Route path="/students/Complaints/Electronic" element={<Electronic />} />
        <Route path="/students/Complaints/Furniture" element={<Furniture />} />
        <Route path="/students/Complaints/Washroom" element={<WashRoom />} />
        <Route path="/students/Complaints/RoomService" element={<RoomService />} />
        <Route path="/students/Complaints/Disciplinary" element={<Disciplinary />} />
        <Route path="/students/Complaints/Wifi" element={<Wifi />} />
        <Route path="/students/Complaints/Miscellaneous" element={<Miscellaneous />} />
        <Route path="/students/Complaints/Grievances" element={<Grievances />} />
        <Route path="/students/complaints/:complaintId" element={<ComplaintDetail />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterStudent />} />
      <Route path="/face" element={<FaceRecognition />} />

      {/* Admin Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admins/dashboard" element={<AdminDashboard />} />
        <Route path="/admins/complaints" element={<AdminComplaints/>} />
        <Route path="/admins/inOut" element={<AdminGateEntries/>} />
        <Route path="/admins/complaints/:complaintId" element={<AdminComplaintDetail />} />
      </Route>

      {/* Staff Routes */}
      <Route element={<StaffLayout/>}>
        <Route path="/staff/complaints" element={<StaffComplaintsPage/>}/>     
        <Route path="/staff/dashboard" element={<StaffDashboard/>}/>     
      </Route>

      {/* Laundry Staff Routes */}
      <Route element={<LaundryStaffLayout/>}>
      <Route path="laundry/staff/dashboard" element={<LaundryStaffDashboard/>}/>   
      {/* <Route path="laundry/complaints" element={<LaundryStaffStatus/>}/>  */}
      </Route>
    </Routes>
      </SnackbarProvider>
  </BrowserRouter>
);

export default App;
