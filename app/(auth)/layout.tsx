"use client";

import { FC, ReactNode } from 'react';
import HeaderAuth from '../components/HomePage/HeaderAuth';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (

    <div>
      <HeaderAuth />

      {children}
    </div>
  );
};

export default AuthLayout;