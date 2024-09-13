import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const MainLayout = () => {

  const NavLinkItem = ({ to, label }) => (
    <li className="mb-4">
      <NavLink to={to} className="block py-4 px-6 hover:bg-[#0E1012] hover:border-l-4 hover:border-[#7380EC] text-[#7D8DA1] font-poppins text-xl font-bold">
        {label}
      </NavLink>
    </li>
  );

  return (
    <div className="flex h-screen bg-[#181A1E]">
      {/* Sidebar */}
      <nav className="hidden lg:block w-[23%] text-white relative">
        <div className='absolute top-0 left-0 w-full'>
          <NavLink to="/" className="text-white block cursor-pointer pl-6 pt-6">
            <h1>
              <span className="text-2xl font-bold font-poppins">Hostel</span>
              <span className="text-2xl font-bold font-poppins text-[#FF4343]">Suvidha</span>
            </h1>
          </NavLink>
        </div>
        <ul className='pt-32 text-white font-poppins text-lg '>
          <NavLinkItem to="/" label="Dashboard"/>
          <NavLinkItem to="/laundry" label="Laundry"/>
          <NavLinkItem to="/complaints" label="Complaints" />
          <NavLinkItem to="/inOut" label="In-Out"/>
          <NavLinkItem to="/requests" label="Requests" />
          <NavLinkItem to="/Outpassleave" label="Outpass &Leave"/>
        </ul>
        <div className='absolute bottom-6 left-0 w-full'>
          <NavLink to="/login" className="block py-4 px-6 hover:bg-[#0E1012] hover:border-l-4 hover:border-[#7380EC] text-[#7D8DA1] font-poppins text-xl font-bold">
            Logout
          </NavLink>
        </div>
      </nav>

      {/* Content */}
      <div className="w-full lg:w-[77%] h-screen overflow-y-auto relative">
        <div className="relative z-10">
          <Outlet />  {/* This is where the page content will be rendered */}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
