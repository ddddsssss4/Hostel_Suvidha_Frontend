import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';


const MainLayout = () => {

  const NavLinkItem = ({ to, label }) => (
    <li className="mb-4">
      <NavLink to={to} className="block py-4 px-6 rounded hover:bg-[#0E1012] text-white font-poppins ">
        {label}
      </NavLink>
    </li>
  );

  return (
    <div className="flex h-screen bg-[#181A1E] ">
     
      <nav className="w-[23%]  text-white relative">
        <div className='absolute top-0 left-0 w-full'>
          <NavLink to="/" className="text-white block cursor-pointer pl-6 pt-6">
            <h1>
              <span className="text-2xl font-bold font-poppins">Hostel</span>
              <span className="text-2xl font-bold font-poppins text-[#FF4343]">Suvidha</span>
            </h1>
          </NavLink>
        </div>
        <ul className='pt-24 text-white font-poppins text-lg'>
          <NavLinkItem to="/" label="Dashboard"  className='bg-red-500 text-3xl'/>
          <NavLinkItem to="/laundry" label="Laundry"/>
          <NavLinkItem to="/complaints" label="Complaints" />
          <NavLinkItem to="/settings" label="Settings" />
          <NavLinkItem to="/requests" label="Requests" />
          <NavLinkItem to="/add-product" label="Add Product" />
        </ul>
      </nav>
      <div className="w-[77%] h-screen overflow-y-auto  relative">
        <div className="relative z-10">
          <Outlet />  {/* This is where the page content will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
