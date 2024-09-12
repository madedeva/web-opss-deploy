'use client'
import React from 'react';
import DashboardLayout from '../components/DashboardLayout';
import WelcomeCard from '../components/WelcomeCard';
import { useSession } from 'next-auth/react';
import { User } from '@prisma/client';
import MenuDashboard from '../components/MenuDashboard';

const Dashboard = () => {

  return (
    <DashboardLayout>
      <WelcomeCard />
      <MenuDashboard />
    </DashboardLayout>
  );
};

export default Dashboard;
