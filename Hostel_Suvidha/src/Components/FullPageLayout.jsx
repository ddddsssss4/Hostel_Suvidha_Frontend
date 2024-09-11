import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => (
  <div className="flex h-screen ">
    <nav className="fixed w-1/3 h-full  p-4">
      <ul>
        <li className="mb-4"><NavLink to="/" className="block py-2 px-4 rounded hover:bg-gray-300">Dashboard</NavLink></li>
        <li className="mb-4"><NavLink to="/customer-complaints" className="block py-2 px-4 rounded hover:bg-gray-300">Customer Complaints</NavLink></li>
        <li className="mb-4"><NavLink to="/settings" className="block py-2 px-4 rounded hover:bg-gray-300">Settings</NavLink></li>
        <li className="mb-4"><NavLink to="/requests" className="block py-2 px-4 rounded hover:bg-gray-300">Requests</NavLink></li>
        <li className="mb-4"><NavLink to="/add-product" className="block py-2 px-4 rounded hover:bg-gray-300">Add Product</NavLink></li>
      </ul>
    </nav>
    <div className=" w-2/3 ">
      <Outlet />  {/* This is where the page content will be rendered */}
    </div>
  </div>
);

export default MainLayout;
