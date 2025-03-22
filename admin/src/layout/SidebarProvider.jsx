import React, { createContext, useState, useContext } from 'react';
import { Menu} from 'lucide-react';

// Create a context for sidebar state
const SidebarContext = createContext();

// Context Provider Component
export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeRoute, setActiveRoute] = useState('/home');

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarContext.Provider value={{ 
      isOpen, 
      toggleSidebar, 
      activeRoute, 
      setActiveRoute 
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Custom hook to use sidebar context
export const useSidebar = () => useContext(SidebarContext);

// Updated Navbar Component
export const Navbar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Hamburger Menu for Mobile */}
        <button 
          onClick={toggleSidebar} 
          className="md:hidden text-gray-600 hover:text-gray-800"
        >
          <Menu size={24} />
        </button>

        <div className="text-xl font-bold text-gray-800">Admin Panel</div>
        
        {/* Add other Navbar elements like search, notifications, etc. */}
      </div>
    </nav>
  );
};