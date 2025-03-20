'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageBannerProps {
  title: string;
}

export default function PageBanner({ title }: PageBannerProps) {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-pattern bg-center"></div>
      </div>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold text-white sm:text-6xl sm:tracking-tight lg:text-7xl"
          >
            {title}
          </motion.h1>
        </div>
      </div>
    </section>
  );
} 