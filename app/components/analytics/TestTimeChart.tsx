"use client";

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ReferenceLine
} from 'recharts';

interface TestTimeDataPoint {
  date: string;
  testTime: number;
  examScore?: string;
  isSelected?: boolean;
}

interface FullLengthScoreDataPoint {
  date: string;
  score: number;
  isSelected?: boolean;
}

interface TestTimeChartProps {
  data: TestTimeDataPoint[];
  scoreData: FullLengthScoreDataPoint[];
  selectedMonth: string;
  onMonthChange: (month: string) => void;
  selectedMetric: string;
  onMetricChange: (metric: string) => void;
  showCustomDatePicker: boolean;
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onApplyCustomDate: () => void;
}

const CustomTooltip = ({ active, payload, label, selectedMetric }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    
    if (selectedMetric === "Full Length Scores") {
      return (
        <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
          <p className="font-semibold text-gray-800">Score: {data.score}</p>
          <p className="text-sm text-gray-600">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        </div>
      );
    }
    
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
        <p className="font-semibold text-gray-800">{data.examScore || `${data.testTime} mins`}</p>
        <p className="text-sm text-gray-600">{new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
      </div>
    );
  }
  return null;
};

const TestTimeChart: React.FC<TestTimeChartProps> = ({
  data,
  scoreData,
  selectedMonth,
  onMonthChange,
  selectedMetric,
  onMetricChange,
  showCustomDatePicker,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApplyCustomDate
}) => {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(
    data.find(d => d.isSelected)?.date || null
  );

  const [dateRangeOpen, setDateRangeOpen] = useState(false);
  
  // Format date for x-axis
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
  };
  
  // Handle point click
  const handlePointClick = (data: any) => {
    setSelectedPoint(data.date);
  };

  // Custom dot component for the test time line
  const CustomDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (!payload.testTime && payload.testTime !== 0) return null;
    
    const isSelected = payload.date === selectedPoint || payload.isSelected;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isSelected ? 8 : 4}
        fill={isSelected ? "#5B21B6" : "#8B5CF6"}
        stroke="#fff"
        strokeWidth={2}
        className="cursor-pointer"
        onClick={() => handlePointClick(payload)}
      />
    );
  };

  // Custom dot component for the score line
  const CustomScoreDot = (props: any) => {
    const { cx, cy, payload } = props;
    if (!payload.score && payload.score !== 0) return null;
    
    const isSelected = payload.date === selectedPoint || payload.isSelected;
    
    return (
      <circle
        cx={cx}
        cy={cy}
        r={isSelected ? 8 : 4}
        fill={isSelected ? "#047857" : "#10B981"}
        stroke="#fff"
        strokeWidth={2}
        className="cursor-pointer"
        onClick={() => handlePointClick(payload)}
      />
    );
  };

  // Get chart title based on selected metric
  const getChartTitle = () => {
    if (selectedMetric === "Full Length Scores") {
      return "Full Length Scores";
    }
    return "Test Time Analysis";
  };

  // Get the appropriate data for the selected metric
  const getChartData = () => {
    if (selectedMetric === "Full Length Scores") {
      // Sort score data by date
      return [...scoreData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      // Sort test time data by date
      return [...data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
  };

  // Generate evenly spaced ticks for Y axis
  const generateYAxisTicks = () => {
    if (selectedMetric === "Full Length Scores") {
      // Generate evenly spaced ticks from 118 to 132
      return [118, 120, 122, 124, 126, 128, 130, 132];
    } else {
      // Generate evenly spaced ticks from 1 to 12
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
        <h2 className="text-xl font-bold text-gray-900">{getChartTitle()}</h2>
        
        <div className="flex flex-wrap gap-3">
          {/* Date Range Selector */}
          <div className="relative">
            <button 
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 transition-colors py-2 px-4 rounded-full"
              onClick={() => setDateRangeOpen(!dateRangeOpen)}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm text-gray-700">{selectedMonth}</span>
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {dateRangeOpen && (
              <div className="absolute z-10 mt-1 w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-2">
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Select Date Range</span>
                  <button 
                    className="text-xs text-gray-500 hover:text-gray-700"
                    onClick={() => setDateRangeOpen(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="space-y-2">
                  <button 
                    className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
                    onClick={() => {
                      onMonthChange("Last 7 days");
                      setDateRangeOpen(false);
                    }}
                  >
                    Last 7 days
                  </button>
                  <button 
                    className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
                    onClick={() => {
                      onMonthChange("Last 14 days");
                      setDateRangeOpen(false);
                    }}
                  >
                    Last 14 days
                  </button>
                  <button 
                    className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
                    onClick={() => {
                      onMonthChange("Last 30 days");
                      setDateRangeOpen(false);
                    }}
                  >
                    Last 30 days
                  </button>
                  <button 
                    className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
                    onClick={() => {
                      onMonthChange("Last 60 days");
                      setDateRangeOpen(false);
                    }}
                  >
                    Last 60 days
                  </button>
                  <button 
                    className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100"
                    onClick={() => {
                      onMonthChange("Last 90 days");
                      setDateRangeOpen(false);
                    }}
                  >
                    Last 90 days
                  </button>
                  <button 
                    className="block w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-100 font-medium text-khan-blue"
                    onClick={() => {
                      onMonthChange("Custom range");
                      setDateRangeOpen(false);
                    }}
                  >
                    Custom range...
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Metric Selector */}
          <div className="relative">
            <select 
              className="appearance-none bg-gray-100 hover:bg-gray-200 transition-colors py-2 pl-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-300 text-sm text-gray-700"
              value={selectedMetric}
              onChange={(e) => onMetricChange(e.target.value)}
            >
              <option>Average Time Per Passage</option>
              <option>Full Length Scores</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom Date Range Picker */}
      {showCustomDatePicker && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Select Custom Date Range</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label htmlFor="start-date" className="block text-xs text-gray-500 mb-1">Start Date</label>
              <input
                id="start-date"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={startDate}
                onChange={(e) => onStartDateChange(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="end-date" className="block text-xs text-gray-500 mb-1">End Date</label>
              <input
                id="end-date"
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                value={endDate}
                onChange={(e) => onEndDateChange(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                onClick={onApplyCustomDate}
                disabled={!startDate || !endDate}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          {selectedMetric === "Average Time Per Passage" ? (
            // Test Time Chart
            <LineChart
              data={getChartData()}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorTime" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C4B5FD" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#C4B5FD" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate} 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickCount={7}
                minTickGap={30}
              />
              <YAxis 
                domain={[0, 12]} 
                ticks={generateYAxisTicks()}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
                label={{ 
                  value: "Time (Minutes)", 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12, fontFamily: 'inherit' }
                }}
              />
              <Tooltip content={(props) => <CustomTooltip {...props} selectedMetric={selectedMetric} />} />
              <ReferenceLine y={0} stroke="#E5E7EB" />
              <Area 
                type="monotone" 
                dataKey="testTime" 
                stroke="#5B21B6" 
                fillOpacity={0.8}
                fill="url(#colorTime)" 
                isAnimationActive={true}
                connectNulls={true}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="testTime" 
                stroke="#5B21B6" 
                strokeWidth={2}
                dot={<CustomDot />}
                activeDot={{ 
                  r: 8, 
                  onClick: (_, payload: any) => {
                    if (payload && payload.payload) {
                      handlePointClick(payload.payload);
                    }
                  } 
                }}
                isAnimationActive={true}
                connectNulls={true}
              />
            </LineChart>
          ) : (
            // Full Length Scores Chart
            <LineChart
              data={getChartData()}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#A7F3D0" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#A7F3D0" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                tickFormatter={formatDate} 
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
                tickCount={7}
                minTickGap={30}
              />
              <YAxis 
                domain={[118, 132]} 
                ticks={generateYAxisTicks()}
                tick={{ fill: '#6B7280', fontSize: 12 }}
                axisLine={{ stroke: '#E5E7EB' }}
                label={{ 
                  value: "Score", 
                  angle: -90, 
                  position: 'insideLeft',
                  style: { textAnchor: 'middle', fill: '#6B7280', fontSize: 12, fontFamily: 'inherit' }
                }}
              />
              <Tooltip content={(props) => <CustomTooltip {...props} selectedMetric={selectedMetric} />} />
              <ReferenceLine y={118} stroke="#E5E7EB" />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#047857" 
                fillOpacity={0.8}
                fill="url(#colorScore)"
                isAnimationActive={true}
                connectNulls={true}
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#047857" 
                strokeWidth={2}
                dot={<CustomScoreDot />}
                activeDot={{ 
                  r: 8, 
                  onClick: (_, payload: any) => {
                    if (payload && payload.payload) {
                      handlePointClick(payload.payload);
                    }
                  } 
                }}
                isAnimationActive={true}
                connectNulls={true}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-center text-gray-600 text-sm">
        Exam Date
      </div>
    </div>
  );
};

export default TestTimeChart; 