'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { StatsGridProps } from '@/app/types/landing-page';

const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={`stat-${index}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white p-6 rounded-lg shadow-lg text-center"
        >
          <div className="flex items-center justify-center mb-4 text-blue-600">
            {stat.icon}
          </div>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {stat.value}
          </div>
          <div className="text-lg font-medium text-gray-900">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid; 