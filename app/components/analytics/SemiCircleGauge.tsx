"use client";

import React, { useEffect, useState } from 'react';

interface SemiCircleGaugeProps {
  percentage: number;
  color: string;
  label: string;
}

const SemiCircleGauge: React.FC<SemiCircleGaugeProps> = ({ percentage, color, label }) => {
  // Add state for animated percentage
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  
  // Ensure percentage is between 0 and 100
  const validPercentage = Math.min(100, Math.max(0, percentage));
  
  // SVG parameters
  const size = 180; // SVG viewBox size
  const strokeWidth = 24; // Width of the donut arc
  const radius = (size - strokeWidth) / 2; // Radius of the arc
  const center = size / 2; // Center point
  
  // Calculate the circumference of the semicircle
  const circumference = Math.PI * radius;
  
  // Calculate the arc length based on animated percentage
  const arcLength = (animatedPercentage / 100) * circumference;
  
  // Calculate the dash offset to hide the remaining portion
  const dashOffset = circumference - arcLength;

  // Animation effect
  useEffect(() => {
    // Reset to 0 when component mounts
    setAnimatedPercentage(0);
    
    // Animate from 0 to the actual percentage
    const animationDuration = 1500; // ms
    const steps = 60; // number of steps in animation
    const stepValue = validPercentage / steps;
    const stepDuration = animationDuration / steps;
    
    let currentStep = 0;
    
    const animationInterval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setAnimatedPercentage(prev => Math.min(prev + stepValue, validPercentage));
      } else {
        clearInterval(animationInterval);
      }
    }, stepDuration);
    
    return () => clearInterval(animationInterval);
  }, [validPercentage]); // Re-run when percentage prop changes
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-24">
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${size} ${size / 2}`} 
          className="overflow-visible"
        >
          {/* Background arc (gray) */}
          <path
            d={`M ${strokeWidth / 2}, ${size / 2} 
                a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
            fill="none"
            stroke="#f0f0f0"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Colored progress arc */}
          <path
            d={`M ${strokeWidth / 2}, ${size / 2} 
                a ${radius} ${radius} 0 0 1 ${size - strokeWidth} 0`}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            className="transition-all duration-300 ease-out"
          />
          
          {/* Percentage text */}
          <text
            x={center}
            y={center - 10}
            textAnchor="middle"
            fontSize="28"
            fontWeight="bold"
            fill="#000"
          >
            {Math.round(animatedPercentage)}%
          </text>
          
          {/* Label text */}
          <text
            x={center}
            y={center + 16}
            textAnchor="middle"
            fontSize="14"
            fill="#666"
          >
            {label}
          </text>
        </svg>
      </div>
    </div>
  );
};

export default SemiCircleGauge; 