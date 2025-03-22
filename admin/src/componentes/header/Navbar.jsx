import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import { axiosInstance } from '../../config/axiosInstance';

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation(); // Use this to get the current route

  const userLogout = async () => {
    try {
      await axiosInstance({ method: "PUT", url: 'user/logout' });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="navbar shadow-lg  bg-white fixed top-0 md:left-64 lg:left-64 right-0 z-40">
      <div className="container mx-auto relative left-3/4 items-center">
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn lg:right-24 btn-ghost btn-circle avatar relative">
              <div className="w-12 h-12 rounded-full border-2 border-white ">
                <img
                  alt="User Avatar"
                  className="w-full h-full rounded-full object-cover"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full"></span> {/* Notification indicator */}
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-lg shadow-lg mt-3 w-52 p-2">
              <li>
                <a className="justify-between flex items-center">
                  <span>Profile</span>
                  <span className="badge badge-sm badge-secondary">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><a onClick={userLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
