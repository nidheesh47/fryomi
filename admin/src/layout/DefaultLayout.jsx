import React from "react";
import Navbar from "../componentes/header/Navbar";
import SideBar from "../componentes/SideBar/SideBar";
import BreadCrumb from "../componentes/BreadCrumb/BreadCrumb";


function DefaultLayout({ children }) {
  return (
    <div className="flex h-[100dvh] overflow-hidden">
      {/* Sidebar */}
      <SideBar />
      <Navbar />
      {/* Content area */}
      <div className="relative flex-1 overflow-y-auto">  
        <main className="grow py-20 w-full max-w-9xl mx-auto">
          <BreadCrumb children={children} />
          {children}
        </main>
      </div>
    </div>
  );
}

export default DefaultLayout;
