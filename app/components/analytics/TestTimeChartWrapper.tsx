"use client";

import React, { useState, useEffect } from 'react';
import TestTimeChart from './TestTimeChart';

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

interface TestTimeChartWrapperProps {
  data: TestTimeDataPoint[];
}

// Enhanced mock data for test times with evenly distributed values (1-12 minutes)
const enhancedTestTimeData: TestTimeDataPoint[] = [
  { date: '2023-12-15', testTime: 12.0 },
  { date: '2023-12-22', testTime: 11.2 },
  { date: '2023-12-29', testTime: 10.5 },
  { date: '2024-01-05', testTime: 9.8 },
  { date: '2024-01-12', testTime: 8.6 },
  { date: '2024-01-19', testTime: 7.3 },
  { date: '2024-01-26', testTime: 6.1 },
  { date: '2024-02-02', testTime: 5.0, isSelected: true },
  { date: '2024-02-09', testTime: 4.2 },
  { date: '2024-02-16', testTime: 3.5 },
  { date: '2024-02-23', testTime: 2.7 },
  { date: '2024-03-01', testTime: 1.8 },
  { date: '2024-03-08', testTime: 1.0 }
];

// Enhanced mock data for full length scores (evenly distributed from 118-132)
const fullLengthScoresData: FullLengthScoreDataPoint[] = [
  { date: '2023-12-15', score: 118 },
  { date: '2023-12-22', score: 119 },
  { date: '2023-12-29', score: 120 },
  { date: '2024-01-05', score: 122 },
  { date: '2024-01-12', score: 123 },
  { date: '2024-01-19', score: 125 },
  { date: '2024-01-26', score: 126 },
  { date: '2024-02-02', score: 128, isSelected: true },
  { date: '2024-02-09', score: 129 },
  { date: '2024-02-16', score: 130 },
  { date: '2024-02-23', score: 131 },
  { date: '2024-03-01', score: 132 },
  { date: '2024-03-08', score: 132 }
];

const TestTimeChartWrapper: React.FC<TestTimeChartWrapperProps> = ({ data }) => {
  // Use our enhanced data instead of the passed data for better visualization
  const [selectedMonth, setSelectedMonth] = useState<string>("Last 30 days");
  const [selectedMetric, setSelectedMetric] = useState<string>("Average Time Per Passage");
  const [filteredData, setFilteredData] = useState<TestTimeDataPoint[]>(enhancedTestTimeData);
  const [filteredScoreData, setFilteredScoreData] = useState<FullLengthScoreDataPoint[]>(fullLengthScoresData);
  
  // Custom date range state
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  // Filter data based on the selected date range
  useEffect(() => {
    const currentDate = new Date();
    let dayRange = 30; // Default to 30 days
    let filterStartDate: Date;
    let filterEndDate: Date = new Date();
    
    if (selectedMonth === "Custom range" && startDate && endDate) {
      // Use custom date range if selected
      filterStartDate = new Date(startDate);
      filterEndDate = new Date(endDate);
    } else {
      // Otherwise use predefined ranges
      switch (selectedMonth) {
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
    const filteredTestData = enhancedTestTimeData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= filterStartDate && itemDate <= filterEndDate;
    });
    
    // Filter full length score data
    const filteredFullLengthData = fullLengthScoresData.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= filterStartDate && itemDate <= filterEndDate;
    });
    
    // Ensure we have at least some data to display
    setFilteredData(filteredTestData.length > 0 ? filteredTestData : enhancedTestTimeData.slice(-5));
    setFilteredScoreData(filteredFullLengthData.length > 0 ? filteredFullLengthData : fullLengthScoresData.slice(-5));
    
    console.log(`Filtering data from ${filterStartDate.toLocaleDateString()} to ${filterEndDate.toLocaleDateString()}`);
    console.log(`Filtered test time data: ${filteredTestData.length} items`);
    console.log(`Filtered score data: ${filteredFullLengthData.length} items`);
  }, [selectedMonth, startDate, endDate]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    if (month === "Custom range") {
      setShowCustomDatePicker(true);
    } else {
      setShowCustomDatePicker(false);
    }
  };

  const handleMetricChange = (metric: string) => {
    setSelectedMetric(metric);
    console.log(`Metric changed to ${metric}`);
  };

  const handleCustomDateApply = () => {
    if (startDate && endDate) {
      setShowCustomDatePicker(false);
    }
  };

  return (
    <>
      <TestTimeChart
        data={filteredData}
        scoreData={filteredScoreData}
        selectedMonth={selectedMonth}
        onMonthChange={handleMonthChange}
        selectedMetric={selectedMetric}
        onMetricChange={handleMetricChange}
        showCustomDatePicker={showCustomDatePicker}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onApplyCustomDate={handleCustomDateApply}
      />
    </>
  );
};

export default TestTimeChartWrapper; 