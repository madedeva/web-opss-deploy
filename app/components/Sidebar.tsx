"use client";
import React from 'react';
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';

interface SidebarProps {
  isVisible: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible }) => {
  
  const { data: session, status } = useSession();
  const currentPath = usePathname();

  if (!session?.user) return null;

  const user = session.user as User;
  const roleId = user.roleId
  
  return (
    <div className={`w-64 h-full bg-blue-950 px-1 absolute transition-transform ${isVisible ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between h-12 px-10 py-10 border-b">
            <a href="/"><img src="/logo/opss-logo.png" alt="OPSS Logo" className="w-36"/></a>
        </div>
        
          <ul className="relative mt-4">
          <li className={`relative ${currentPath === '/dashboard' ? 'bg-orange-500 rounded' : ''}`}>
              <a href="/dashboard" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 transition duration-300 ease-in-out">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-speedometer2" viewBox="0 0 16 16">
                <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                <path d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3"/>
              </svg>
              <span className='ml-2'>Dashboard</span>
              </a>
          </li>
        </ul>

      {roleId === 4 && (
      <ul className="relative mt-2">
        <li className={`relative ${currentPath === '/dashboard/admin/conferences' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/admin/conferences" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-video3" viewBox="0 0 16 16">
            <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2"/>
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z"/>
          </svg>
          <span className="ml-2">Manage Conferences</span>
        </a>
        </li>

        <li className={`relative ${currentPath === '/dashboard/admin/users' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/admin/users" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-people" viewBox="0 0 16 16">
          <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
        </svg>
          <span className="ml-2">Manage Users</span>
        </a>
        </li>
      </ul>
      )}

      
      {roleId === 2 && (
      <ul className="relative mt-2">
        <li className={`relative ${currentPath === '/dashboard/conference' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/conference" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-video3" viewBox="0 0 16 16">
            <path d="M14 9.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-6 5.7c0 .8.8.8.8.8h6.4s.8 0 .8-.8-.8-3.2-4-3.2-4 2.4-4 3.2"/>
            <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h5.243c.122-.326.295-.668.526-1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v7.81c.353.23.656.496.91.783Q16 12.312 16 12V4a2 2 0 0 0-2-2z"/>
          </svg>
          <span className="ml-2">My Conferences</span>
        </a>
        </li>

        <li className={`relative ${currentPath === '/dashboard/reviewers' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/reviewers" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-chat-square-text-fill" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/>
        </svg>
          <span className="ml-2">Reviewers</span>
        </a>
        </li>

        <li className={`relative ${currentPath === '/dashboard/papers' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/papers" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-journal-text" viewBox="0 0 16 16">
          <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
        </svg>
          <span className="ml-2">Submitted Papers</span>
        </a>
        </li>
      </ul>
      )}

      {roleId === 1 && (
      <ul>
        <li className={`relative ${currentPath === '/dashboard/mypapers' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/mypapers" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-journal-text" viewBox="0 0 16 16">
          <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
          <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2"/>
          <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z"/>
        </svg>
          <span className="ml-2">My Papers</span>
        </a>
        </li>
        <li className={`relative ${currentPath === '/dashboard/availableconference' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/availableconference" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold    text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-view-list" viewBox="0 0 16 16">
            <path d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14"/>
          </svg>
          <span className="ml-2">Available Conference</span>
        </a>
        </li>
      </ul>
      )}

      {roleId === 3 && (
      <ul>
        <li className={`relative ${currentPath === '/dashboard/myreviews' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/myreviews" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square mr-2" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
            <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
          </svg>
          My Reviews
        </a>
        </li>
      </ul>
      )}

      <hr />
      <ul>
        <li className={`relative ${currentPath === '/dashboard/profile' ? 'bg-orange-500 rounded' : ''}`}>
        <a href="/dashboard/profile" className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-white font-semibold text-ellipsis whitespace-nowrap rounded hover:text-white hover:bg-orange-500 mt-2 transition duration-300 ease-in-out">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-gear-wide-connected mr-2" viewBox="0 0 16 16">
          <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z"/>
        </svg>
          Settings
        </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
