import React from 'react';
import DashboardNavigation from '../components/DashboardNavigation';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '528Prep Dashboard',
  description: 'MCAT CARS Preparation Dashboard',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardNavigation aria-label="Dashboard Navigation" />
      {children}
    </>
  );
} 