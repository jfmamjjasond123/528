"use client";

import React from 'react';
import SemiCircleGauge from './SemiCircleGauge';

interface MetricRowProps {
  label: string;
  value: string;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, value }) => (
  <div className="flex justify-between py-1">
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

interface ProgressCardProps {
  title: string;
  percentage: number;
  color: string;
  label: string;
  metrics: {
    label: string;
    value: string;
  }[];
}

const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  percentage,
  color,
  label,
  metrics
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col h-full">
      <h2 className="text-xl font-medium text-gray-800 mb-6 text-center">{title}</h2>
      <div className="flex justify-center mb-8">
        <SemiCircleGauge percentage={percentage} color={color} label={label} />
      </div>
      <div className="mt-auto w-full">
        <div className="space-y-1">
          {metrics.map((metric, index) => (
            <MetricRow key={index} label={metric.label} value={metric.value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressCard; 