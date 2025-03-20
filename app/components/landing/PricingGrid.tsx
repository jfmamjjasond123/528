'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { PricingGridProps } from '@/app/types/landing-page';

const PricingGrid: React.FC<PricingGridProps> = ({ plans }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {plans.map((plan, index) => (
        <motion.div
          key={`plan-${index}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`bg-white rounded-lg shadow-lg p-6 ${
            plan.featured
              ? 'ring-2 ring-blue-500 shadow-xl transform scale-105'
              : ''
          }`}
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-4xl font-bold mb-4">
              {plan.price === 0 ? 'Free' : `$${plan.price}`}
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li
                  key={`feature-${featureIndex}`}
                  className="text-gray-600 flex items-center justify-center"
                >
                  <svg
                    className="h-5 w-5 text-green-500 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
            <button
              className={`w-full py-2 px-4 rounded-md font-medium ${
                plan.featured
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {plan.price === 0 ? 'Start Free Trial' : 'Get Started'}
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default PricingGrid; 