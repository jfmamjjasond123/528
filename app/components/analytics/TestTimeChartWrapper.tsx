"use client";

import React, { useState, useEffect } from 'react';
import TestTimeChart from './TestTimeChart';
import { useTestTimeStore } from '../../lib/stores';
import { TestTimeDataPoint, FullLengthScoreDataPoint } from '../../lib/stores/useTestTimeStore';

interface TestTimeChartWrapperProps {
  data?: TestTimeDataPoint[]; // Make data optional since we'll use the store
}

const TestTimeChartWrapper: React.FC<TestTimeChartWrapperProps> = ({ data: propData }) => {
  // Use the test time store
  const { 
    testTimeData: storeData, 
    fullLengthScoreData: storeScoreData, 
    selectedTimeRange,
    customDateRange,
    isLoading,
    fetchTestTimeData,
    setSelectedTimeRange,
    setCustomDateRange
  } = useTestTimeStore();
  
  // Use prop data if provided, otherwise use store data
  const data = propData || storeData;
  
  // Local state for filtering and UI
  const [filteredData, setFilteredData] = useState<TestTimeDataPoint[]>([]);
  const [filteredScoreData, setFilteredScoreData] = useState<FullLengthScoreDataPoint[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string>("Average Time Per Passage");
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  const [startDate, setStartDate] = useState<string>(customDateRange.startDate);
  const [endDate, setEndDate] = useState<string>(customDateRange.endDate);

  // Fetch data on component mount
  useEffect(() => {
    fetchTestTimeData();
  }, [fetchTestTimeData]);
  
  // Update local state from store state
  useEffect(() => {
    setStartDate(customDateRange.startDate);
    setEndDate(customDateRange.endDate);
  }, [customDateRange]);

  // Filter data based on the selected date range
  useEffect(() => {
    if (!data || data.length === 0) return;
    
    const currentDate = new Date();
    let dayRange = 30; // Default to 30 days
    let filterStartDate: Date;
    let filterEndDate: Date = new Date();
    
    if (selectedTimeRange === "Custom range" && startDate && endDate) {
      // Use custom date range if selected
      filterStartDate = new Date(startDate);
      filterEndDate = new Date(endDate);
    } else {
      // Otherwise use predefined ranges
      switch (selectedTimeRange) {
        case "Last 7 days":
          dayRange = 7;
          break;
        case "Last 14 days":
          dayRange = 14;
          break;
        case "Last 30 days":
          dayRange = 30;
          break;
        case "Last 60 days":
          dayRange = 60;
          break;
        case "Last 90 days":
          dayRange = 90;
          break;
        default:
          dayRange = 30;
      }
      
      filterStartDate = new Date();
      filterStartDate.setDate(currentDate.getDate() - dayRange);
    }
    
    // Filter test time data
    const filteredTestData = data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= filterStartDate && itemDate <= filterEndDate;
    });
    
    // Filter full length score data
    const filteredFullLengthData = storeScoreData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= filterStartDate && itemDate <= filterEndDate;
    });
    
    // Ensure we have at least some data to display
    setFilteredData(filteredTestData.length > 0 ? filteredTestData : data.slice(-5));
    setFilteredScoreData(filteredFullLengthData.length > 0 ? filteredFullLengthData : storeScoreData.slice(-5));
  }, [selectedTimeRange, startDate, endDate, data, storeScoreData]);

  const handleMonthChange = (month: string) => {
    setSelectedTimeRange(month as any);
    if (month === "Custom range") {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
    }
  };

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
  };

  const handleCustomDateApply = () => {
    if (startDate && endDate) {
      setCustomDateRange(startDate, endDate);
      setShowCustomDatePicker(false);
    }
  };

  const handleStartDateChange = (date: string) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: string) => {
    setEndDate(date);
  };

  // Show a loading state
  if (isLoading && (!filteredData || filteredData.length === 0)) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Test Time Analysis</h2>
        <div className="h-80 flex items-center justify-center">
          <p className="text-gray-500">Loading test time data...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <TestTimeChart
        data={filteredData}
        scoreData={filteredScoreData}
        selectedMonth={selectedTimeRange}
        onMonthChange={handleMonthChange}
        selectedMetric={selectedMetric}
        onMetricChange={handleMetricChange}
        showCustomDatePicker={showCustomDatePicker}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={handleStartDateChange}
        onEndDateChange={handleEndDateChange}
        onApplyCustomDate={handleCustomDateApply}
      />
    </>
  );
};

export default TestTimeChartWrapper; 