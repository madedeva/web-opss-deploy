"use client";

import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { SessionProvider } from 'next-auth/react';
import LoadingOverlay from './LoadingOverlay';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const fetchData = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsLoading(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <SessionProvider>
    <div className="flex h-screen overflow-hidden">
    <ToastContainer />
    {isLoading && <LoadingOverlay />}
      <Sidebar isVisible={isSidebarVisible} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarVisible ? 'ml-64' : 'ml-0'}`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <main className="flex-1 p-6 bg-orange-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
    </SessionProvider>
  );
};

export default DashboardLayout;
