import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => {

  const NavLinkItem = ({ to, label }) => (
    <li className="mb-4">
      <NavLink to={to} className="block py-2 px-4 rounded hover:bg-gray-300 font-poppins">
        {label}
      </NavLink>
    </li>
  );

  return (
    <div className="flex h-screen">
      <nav className="w-[23%] p-4 bg-black text-white">
        <div className='absolute top-0 left-0 w-full'>
          <NavLink to="/" className="text-white block cursor-pointer pl-4 pt-8">
            <h1>
              <span className="text-3xl font-bold font-poppins">Hostel</span>
              <span className="text-3xl font-bold font-poppins text-[#FF4343]">Suvidha</span>
            </h1>
          </NavLink>
        </div>
        <ul className='pt-24 text-[#5c5c5d]'>
          <NavLinkItem to="/" label="Dashboard" />
          <NavLinkItem to="/customer-complaints" label="Customer Complaints" />
          <NavLinkItem to="/settings" label="Settings" />
          <NavLinkItem to="/requests" label="Requests" />
          <NavLinkItem to="/add-product" label="Add Product" />
        </ul>
      </nav>
      <div className="w-[77%] p-4">
        <Outlet />  {/* This is where the page content will be rendered */}
      </div>
    </div>
  );
};

export default MainLayout;
