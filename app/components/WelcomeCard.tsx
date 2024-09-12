"use client";
import React from 'react';
import { useSession } from "next-auth/react";

const WelcomeCard: React.FC = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-white rounded-lg overflow-hidden w-full">
      <div className="px-6 py-6 sm:px-10 sm:py-10 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mr-4">
            <img
              src={"https://ui-avatars.com/api/?name=" + session?.user?.name + "&background=0D8ABC&color=fff"} 
              alt={session?.user?.name || "Admin"}
              className="w-full h-full rounded-full"
            />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800">Welcome back, {session?.user?.name}</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              Here`s what`s happening with your projects today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;
