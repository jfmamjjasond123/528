'use client';

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Types for calendar events
interface CalendarEvent {
  id: number;
  title: string;
  date: string; // ISO format date string
  startTime?: string;
  endTime?: string;
  description?: string;
  category: 'course' | 'assignment' | 'exam' | 'personal' | 'live';
  completed?: boolean;
}

// Mock data for calendar events
const defaultEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Algebra Session',
    date: '2023-08-15',
    startTime: '10:00',
    endTime: '11:30',
    description: 'Live session with instructor on quadratic equations',
    category: 'live',
  },
  {
    id: 2,
    title: 'Biology Quiz Due',
    date: '2023-08-17',
    description: 'Cell structure and function quiz',
    category: 'exam',
  },
  {
    id: 3,
    title: 'JavaScript Assignment',
    date: '2023-08-20',
    description: 'Complete 10 coding exercises on functions',
    category: 'assignment',
    completed: false,
  },
  {
    id: 4,
    title: 'Study Chemistry',
    date: '2023-08-18',
    startTime: '15:00',
    endTime: '17:00',
    description: 'Personal study session on atomic structure',
    category: 'personal',
  },
  {
    id: 5,
    title: 'History Course Lesson 5',
    date: '2023-08-16',
    description: 'Ancient Greece civilization',
    category: 'course',
  }
];

// Helper function to generate calendar dates for a month
const generateCalendarDates = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Get the day of the week for the first day (0 = Sunday, 6 = Saturday)
  const firstDayOfWeek = firstDay.getDay();
  
  // Calculate days from previous month to show
  const daysFromPrevMonth = firstDayOfWeek;
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  
  // Array to hold all dates to display
  const calendarDates: Array<{
    date: number;
    month: 'prev' | 'current' | 'next';
    fullDate: Date;
  }> = [];
  
  // Add days from previous month
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    const day = prevMonthLastDay - i;
    calendarDates.push({
      date: day,
      month: 'prev',
      fullDate: new Date(year, month - 1, day)
    });
  }
  
  // Add days from current month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    calendarDates.push({
      date: day,
      month: 'current',
      fullDate: new Date(year, month, day)
    });
  }
  
  // Add days from next month to complete the grid (6 rows of 7 days = 42 cells)
  const remainingCells = 42 - calendarDates.length;
  for (let day = 1; day <= remainingCells; day++) {
    calendarDates.push({
      date: day,
      month: 'next',
      fullDate: new Date(year, month + 1, day)
    });
  }
  
  return calendarDates;
};

// Helper function to format a date as YYYY-MM-DD
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper function to get category styling
const getCategoryStyle = (category: CalendarEvent['category']) => {
  switch (category) {
    case 'course':
      return 'bg-khan-blue/10 text-khan-blue border-khan-blue/30';
    case 'assignment':
      return 'bg-khan-green/10 text-khan-green border-khan-green/30';
    case 'exam':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'personal':
      return 'bg-khan-purple/10 text-khan-purple border-khan-purple/30';
    case 'live':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    default:
      return 'bg-gray-50 text-gray-700 border-gray-200';
  }
};

// Helper function to get category icon
const getCategoryIcon = (category: CalendarEvent['category']) => {
  switch (category) {
    case 'course':
      return '📚';
    case 'assignment':
      return '📝';
    case 'exam':
      return '🧪';
    case 'personal':
      return '📅';
    case 'live':
      return '🎥';
    default:
      return '📌';
  }
};

interface CalendarProps {
  events?: CalendarEvent[];
  onDateSelect?: (date: Date) => void;
  selectedMonth?: number;
  selectedYear?: number;
}

const Calendar: React.FC<CalendarProps> = ({ 
  events = defaultEvents, 
  onDateSelect,
  selectedMonth: propSelectedMonth,
  selectedYear: propSelectedYear
}) => {
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(propSelectedMonth !== undefined ? propSelectedMonth : currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(propSelectedYear !== undefined ? propSelectedYear : currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState<Date | null>(currentDate);
  
  // Update month/year when props change
  React.useEffect(() => {
    if (propSelectedMonth !== undefined) {
      setSelectedMonth(propSelectedMonth);
    }
  }, [propSelectedMonth]);

  React.useEffect(() => {
    if (propSelectedYear !== undefined) {
      setSelectedYear(propSelectedYear);
    }
  }, [propSelectedYear]);
  
  // Get all calendar dates for the selected month and year
  const calendarDates = generateCalendarDates(selectedYear, selectedMonth);
  
  // Get current day's events
  const formatSelectedDate = selectedDate ? formatDate(selectedDate) : '';
  const selectedDateEvents = events.filter(event => event.date === formatSelectedDate);
  
  // Check if a date has events
  const getDateEvents = (date: Date) => {
    const dateString = formatDate(date);
    return events.filter(event => event.date === dateString);
  };
  
  // Handle date selection
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // Notify parent component if onDateSelect is provided
    if (onDateSelect) {
      onDateSelect(date);
    }
  };
  
  // Days of the week
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  return (
    <div className="bg-white rounded-lg overflow-hidden">
      {/* Calendar Grid */}
      <div>
        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar dates */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDates.map((dateObj, index) => {
            const dateEvents = getDateEvents(dateObj.fullDate);
            const isSelected = selectedDate && 
              formatDate(selectedDate) === formatDate(dateObj.fullDate);
            const isToday = formatDate(new Date()) === formatDate(dateObj.fullDate);
            
            // Base styling classes
            let dateClasses = "h-20 p-1 border rounded-md cursor-pointer transition-all relative ";
            
            // Add styling based on month and selection
            if (dateObj.month === 'current') {
              dateClasses += "bg-white ";
            } else {
              dateClasses += "bg-gray-50 text-gray-400 ";
            }
            
            // Add today styling
            if (isToday) {
              dateClasses += "border-khan-blue ";
            } else {
              dateClasses += "border-gray-200 hover:border-khan-blue/50 ";
            }
            
            return (
              <div 
                key={index} 
                className={dateClasses}
                onClick={() => handleDateClick(dateObj.fullDate)}
              >
                {/* Selection highlight as a background element */}
                {isSelected && (
                  <div className="absolute inset-0 bg-khan-blue/10 border-2 border-khan-blue rounded-md pointer-events-none"></div>
                )}
                
                <div className="flex justify-between items-start relative z-10">
                  <span className={`text-sm font-medium ${isToday ? "bg-khan-green text-white rounded-full w-6 h-6 flex items-center justify-center" : ""} ${isSelected && !isToday ? "font-bold text-khan-blue" : ""}`}>
                    {dateObj.date}
                  </span>
                  {dateEvents.length > 0 && dateObj.month === 'current' && (
                    <span className="text-xs font-medium text-khan-blue bg-khan-blue/10 rounded-full px-1.5 py-0.5">
                      {dateEvents.length}
                    </span>
                  )}
                </div>
                <div className="mt-1 overflow-hidden max-h-12 relative z-10">
                  {dateEvents.length > 0 && dateObj.month === 'current' && (
                    <div className="space-y-1">
                      {dateEvents.slice(0, 2).map((event) => (
                        <div 
                          key={event.id}
                          className={`text-xs px-1 py-0.5 rounded truncate ${getCategoryStyle(event.category)}`}
                        >
                          {event.title}
                        </div>
                      ))}
                      {dateEvents.length > 2 && (
                        <div className="text-xs text-gray-500">+{dateEvents.length - 2} more</div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar; 