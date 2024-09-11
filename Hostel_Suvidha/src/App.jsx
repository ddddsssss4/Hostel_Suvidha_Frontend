import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './Pages/LoginPage'
import Spline from './Components/Spline'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React from 'react';

import Dashboard from './Components/Dashboard';
import Complaints from './Components/Complaints'
import Settings from './Components/Settings';
import Requests from './Components/Requests';
import AddProduct from './Components/AddProduct';

import MainLayout from './Components/MainLayout';
import Electronic from './Components/Electronic'
import Furniture from './Components/Furniture'
import WashRoom from './Components/WashRoom'
import RoomService from './Components/RoomService'
import Disciplinary from './Components/Disciplinary'
import Wifi from './Components/Wifi'
import Laundry from './Components/Laundry'

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/complaints" element={<Complaints/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/laundry" element={<Laundry />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/Complaints/Electronic" element={<Electronic/>}/>
        <Route path="/Complaints/Furniture" element={<Furniture/>}/>
        <Route path="/Complaints/Washroom" element={<WashRoom/>}/>
        <Route path="/Complaints/RoomService" element={<RoomService/>}/>
        <Route path="/Complaints/Disciplinary" element={<Disciplinary/>}/>
        <Route path="/Complaints/Wifi" element={<Wifi/>}/>
      </Route>
      
        <Route path="/login" element={<LoginPage/>} />
      
    </Routes>
  </BrowserRouter>
);

export default App;
