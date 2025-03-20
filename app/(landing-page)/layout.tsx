import React from 'react';
import Footer from '../components/Footer';
import Navigation from '../components/Navigation';

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation aria-label="Main navigation" />
      {children}
      <Footer />
    </>
  );
} 