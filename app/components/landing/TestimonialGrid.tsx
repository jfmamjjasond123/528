'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import type { TestimonialGridProps } from '@/app/types/landing-page';

const TestimonialGrid: React.FC<TestimonialGridProps> = ({ testimonials }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => {
        const [imageError, setImageError] = useState(false);
        const initials = getInitials(testimonial.name);
        
        return (
          <motion.div
            key={`testimonial-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-lg p-8 text-center"
          >
            <div className="relative h-24 w-24 mx-auto mb-6">
              {!imageError ? (
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  fill
                  className="rounded-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="h-full w-full rounded-full bg-blue-600 flex items-center justify-center text-white text-xl font-bold">
                  {initials}
                </div>
              )}
            </div>
            <blockquote className="text-gray-600 italic mb-6">
              "{testimonial.quote}"
            </blockquote>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {testimonial.name}
              </h4>
              <p className="text-blue-600 font-medium">
                {testimonial.achievement}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default TestimonialGrid; 