import React from 'react';
import { useSession, signOut, SessionProvider } from "next-auth/react";

interface NavbarProps {
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-lg w-full">
      <div className="mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <button onClick={toggleSidebar} className="py-4 px-2 text-black">
              <img src="/logo/menu.png" alt="Menu" className="w-6"/>
            </button>
          </div>
          <div className="flex items-center space-x-1 relative">
            <div className="py-5 px-3 flex items-center space-x-2 text-gray-700 hover:cursor-pointer group">
              <img
                src={"https://ui-avatars.com/api/?name=" + session?.user?.name + "&background=0D8ABC&color=fff"}
                alt="Name"
                className="w-6 h-6 rounded-full"
              />
              <span className='text-sm'>{session?.user?.name}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              <div className="absolute right-6 top-10 rounded-md shadow-lg z-10 mt-2 bg-white hidden group-hover:block">
                <button onClick={() => signOut()} className="px-4 py-4 w-30 h-8 rounded-md text-black hover:bg-red-600 flex items-center gap-2 text-xs">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-power" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1z"/>
                    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
