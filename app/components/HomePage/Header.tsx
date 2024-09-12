'use client'
import React, { useState } from 'react';
import { useSession, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const handleSignOut = () => {
    signOut();
  };

  return (
    <header className="bg-blue-950 text-white">
      <div className="container mx-auto flex justify-between items-center py-6 px-4">
        <h1 className="text-xl font-bold">Online Paper Submission System</h1>
        <nav className="hidden md:flex items-center">
          <a href="/" className="px-4">Home</a>
          <a href="/about-us" className="px-4">About Us</a>
          {session ? (
            <div className="relative group">
              <button className="px-4 py-2">
                {session.user?.email}
              </button>
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <a href="/dashboard" className="px-4 py-2 flex">Dashboard <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-speedometer2 ml-2" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                <path d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"/>
                </svg></a>
                <hr />
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-left w-full flex"
                >
                  Sign Out <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-power ml-2" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1z"/>
                    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <a href="/signin" className="px-4">
              <button className="bg-orange-500 text-white py-2 px-4 rounded">
                Sign In
              </button>
            </a>
          )}
        </nav>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden bg-blue-950">
          <a href="/" className="block px-4 py-2">Home</a>
          <a href="/about-us" className="block px-4 py-2">About Us</a>
          {session ? (
            <div className='w-1/2 ml-2'>
              <button className="block px-4 py-2">
                {session.user?.email}
              </button>
              <div className="bg-white text-black rounded shadow-lg">
                <a href="/dashboard" className="px-4 py-2 flex">Dashboard <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-speedometer2 ml-2" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                <path d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"/>
                </svg></a>
                <hr />
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 text-left w-full flex"
                >
                  Sign Out <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-power ml-2" viewBox="0 0 16 16">
                    <path d="M7.5 1v7h1V1z"/>
                    <path d="M3 8.812a5 5 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812"/>
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <a href="/signin" className="block px-4 py-2">
              <button className="bg-orange-500 text-white py-2 px-4 rounded">Sign In</button>
            </a>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
