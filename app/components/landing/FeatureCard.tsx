'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { FeatureCardProps } from '@/app/types/landing-page';

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  image,
  delay = 0,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex flex-col md:flex-row h-full">
        <div className="p-6 flex-1">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
              {icon}
            </div>
            <h3 className="ml-4 text-xl font-semibold">{title}</h3>
          </div>
          <p className="text-gray-600">{description}</p>
        </div>
        {image && !imageError ? (
          <div className="relative w-full md:w-1/2 h-48 md:h-auto">
            <Image
              src={image}
              alt={`${title} visualization`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImageError(true)}
              priority={false}
            />
          </div>
        ) : image && imageError ? (
          <div className="w-full md:w-1/2 h-48 md:h-auto bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
            <div className="text-3xl text-blue-600">
              {icon}
            </div>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default FeatureCard; 