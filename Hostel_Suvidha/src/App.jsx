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

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/complaints" element={<Complaints/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/Complaints/:type" element={<Electronic/>}/>
        <Route path="/Complaints/:type" element={<Furniture/>}/>
        <Route path="/Complaints/:type" element={<WashRoom/>}/>
        <Route path="/Complaints/:type" element={<RoomService/>}/>
        <Route path="/Complaints/:type" element={<Disciplinary/>}/>
        <Route path="/Complaints/:type" element={<Wifi/>}/>
      </Route>
      
        <Route path="/login" element={<LoginPage/>} />
      
    </Routes>
  </BrowserRouter>
);

export default App;
