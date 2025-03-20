'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { DetailedFeaturesGridProps } from '@/app/types/landing-page';

const DetailedFeatures: React.FC<DetailedFeaturesGridProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={`detailed-feature-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div className="flex flex-col items-center text-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
          </div>
          <p className="text-gray-600 text-center">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default DetailedFeatures; 