import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, HomeIcon, Salad, ShoppingCartIcon, TagIcon } from "lucide-react";
import { FaUsersLine } from "react-icons/fa6";
function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Toggle the sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: '/home', label: 'Dashboard', icon: <HomeIcon className="w-5 h-5" /> },
    { path: '/allrestaurants', label: 'All Restaurants', icon: <ChefHat className="w-5 h-5" /> },
    { path: '/all-restaurants', label: 'All MenuItems', icon: <Salad className="w-5 h-5" /> },
    { path: '/coupons', label: 'All Coupons', icon: <TagIcon className="w-5 h-5" /> },
    { path: '/restaurantsOrders', label: 'All Restaurant Orders', icon: <ShoppingCartIcon className="w-5 h-5" /> },
    { path: '/payments', label: 'Payments', icon: <ShoppingCartIcon className="w-5 h-5"/>},
    {path:'/users', label:'Users',icon:<FaUsersLine className='w-5 h-5' />}
  ];

  return (
    <div>
      {/* Sidebar */}
      <div
        className={`bg-gray-900 text-white w-full md:w-64 h-full p-6 fixed md:static transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50 overflow-y-auto scrollbar-hide`}
      >
        <div className="text-2xl font-semibold mb-4 text-center">Admin Dashboard</div>
        <ul className="flex flex-col gap-6 mt-20">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <div
                  className={`flex items-center p-2 rounded-lg w-full text-left hover:bg-gray-700 transition ${
                    location.pathname === item.path ? 'bg-gray-700' : ''
                  }`}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 md:ml-64 p-6">
        {/* Mobile Hamburger Icon */}
        <button
          className={`md:hidden ${isOpen ?"text-white":"text-gray-900"} p-4 absolute top-4 left-4 z-50`}
          onClick={toggleSidebar}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default SideBar;
