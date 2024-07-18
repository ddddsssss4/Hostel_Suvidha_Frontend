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
import FullPageLayout from './Components/FullPageLayout';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/customer-complaints" element={<Complaints/>} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Route>
      <Route element={<FullPageLayout />}>
        <Route path="/login" element={<LoginPage/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
