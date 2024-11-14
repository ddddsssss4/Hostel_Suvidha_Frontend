import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import bgelm from "../assets/bgelement.png";
import menu from "../assets/menu.svg";

const StaffLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const NavLinkItem = ({ to, label }) => (
    <li className="mb-4">
      <NavLink 
        to={to} 
        onClick={() => setSidebarOpen(false)}
        className="block py-4 px-6 hover:bg-[#0E1012] hover:border-l-4 hover:border-[#7380EC] text-[#7D8DA1] font-poppins text-xl font-bold"
      >
        {label}
      </NavLink>
    </li>
  );

  return (
    <div className="flex h-screen bg-[#181A1E] relative">
      {/* Sidebar */}
      <nav className={`lg:block fixed lg:static z-20 ${sidebarOpen ? "block" : "hidden"} lg:w-[23%] w-[85%] h-full bg-[#181A1E] text-white`}>
        <div className='absolute top-0 left-0 w-full'>
          <NavLink to="/" className={`text-white block cursor-pointer pl-6 ${sidebarOpen ? "pt-24" : "pt-6"}`}>
            <h1>
              <span className="text-2xl font-bold font-poppins">Hostel</span>
              <span className="text-2xl font-bold font-poppins text-[#FF4343]">Suvidha</span>
            </h1>
          </NavLink>
        </div>
        <ul className={`${sidebarOpen ? "pt-36" : "pt-24"} text-white font-poppins text-lg`}>
          <NavLinkItem to="/staff/dashboard" label="Dashboard" />
          <NavLinkItem to="/staff/complaints" label="Complaints" />
        </ul>
        <div className='absolute bottom-6 left-0 w-full'>
          <NavLink to="/login" className="block py-4 px-6 hover:bg-[#0E1012] hover:border-l-4 hover:border-[#7380EC] text-[#7D8DA1] font-poppins text-xl font-bold">
            Logout
          </NavLink>
        </div>
      </nav>

      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-5 left-5 z-30 text-white text-xl"
      >
        {sidebarOpen ? (
          <span className="text-5xl font-bold">&times;</span> 
        ) : (
          <img src={menu} alt="Menu" className="w-8 h-8" /> 
        )}
      </button>

     <div className="w-full lg:w-[77%] h-screen overflow-y-auto relative">
        <img
          src={bgelm}
          alt="Background Element"
          className="fixed inset-0 w-full h-screen object-cover z-1"
        />
        <div className="relative z-10 p-4 sm:p-6">
          <Outlet /> 
        </div>
      </div>

      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)} 
          className="fixed inset-0 bg-black opacity-50 lg:hidden z-10"
        ></div>
      )}
    </div>
  );
};

export default StaffLayout;
