import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StoreProvider } from './lib/stores';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MCAT Prep Platform',
  description: 'A comprehensive platform for MCAT preparation, featuring content, practice tests, and analysis.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
