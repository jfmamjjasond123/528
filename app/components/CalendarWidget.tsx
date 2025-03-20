'use client';

import React from 'react';
import Link from 'next/link';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time?: string;
  category: 'course' | 'assignment' | 'exam' | 'personal' | 'live';
}

const upcomingEvents: CalendarEvent[] = [
  {
    id: 1,
    title: 'Algebra Live Session',
    date: '2023-08-15',
    time: '10:00 AM',
    category: 'live',
  },
  {
    id: 2,
    title: 'Biology Quiz Due',
    date: '2023-08-17',
    time: '11:59 PM',
    category: 'exam',
  },
  {
    id: 3,
    title: 'JavaScript Assignment',
    date: '2023-08-20',
    time: '11:59 PM',
    category: 'assignment',
  },
  {
    id: 4,
    title: 'World History Study Group',
    date: '2023-08-22',
    time: '3:30 PM',
    category: 'personal',
  },
  {
    id: 5,
    title: 'Chemistry Lab Session',
    date: '2023-08-25',
    time: '2:00 PM',
    category: 'course',
  },
  {
    id: 6,
    title: 'MCAT CARS Practice Assignment',
    date: '2023-08-18',
    time: '11:59 PM',
    category: 'assignment',
  },
  {
    id: 7,
    title: 'Physics Problem Set',
    date: '2023-08-21',
    time: '11:59 PM',
    category: 'assignment',
  },
  {
    id: 8,
    title: 'Literature Analysis Essay',
    date: '2023-08-19',
    time: '11:59 PM',
    category: 'assignment',
  }
];

const CalendarWidget: React.FC = () => {
  // Get current date
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.toLocaleString('default', { month: 'long' });
  const currentYear = currentDate.getFullYear();
  
  // Filter to only show assignments
  const assignmentEvents = upcomingEvents.filter(event => event.category === 'assignment');
  
  // Sort assignments by date (closest first)
  const sortedAssignments = [...assignmentEvents].sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  
  // Helper function to get days until event
  const getDaysUntil = (dateString: string): number => {
    const eventDate = new Date(dateString);
    const timeDiff = eventDate.getTime() - currentDate.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  };
  
  // Helper function to get category styling
  const getCategoryStyle = (category: CalendarEvent['category']) => {
    switch (category) {
      case 'course':
        return 'border-khan-blue bg-khan-blue/5';
      case 'assignment':
        return 'border-khan-green bg-khan-green/5';
      case 'exam':
        return 'border-red-500 bg-red-50';
      case 'personal':
        return 'border-khan-purple bg-khan-purple/5';
      case 'live':
        return 'border-orange-500 bg-orange-50';
      default:
        return 'border-gray-300 bg-gray-50';
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
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold text-gray-900">Assignments</h2>
        <Link href="/dashboard/calendar" className="text-sm font-medium text-khan-blue hover:text-khan-purple">
          View calendar →
        </Link>
      </div>
      
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex items-baseline">
          <span className="text-3xl font-bold text-gray-900">{currentDay}</span>
          <span className="text-lg text-gray-600 ml-2">{currentMonth} {currentYear}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">Today</p>
      </div>
      
      {sortedAssignments.length > 0 ? (
        <ul className="space-y-3">
          {sortedAssignments.map((event) => {
            const daysUntil = getDaysUntil(event.date);
            let daysText = '';
            
            if (daysUntil === 0) {
              daysText = 'Today';
            } else if (daysUntil === 1) {
              daysText = 'Tomorrow';
            } else if (daysUntil < 0) {
              daysText = `${Math.abs(daysUntil)} days overdue`;
            } else {
              daysText = `Due in ${daysUntil} days`;
            }
            
            return (
              <li 
                key={event.id} 
                className={`border-l-4 pl-3 py-2 ${getCategoryStyle(event.category)}`}
              >
                <div className="flex items-start">
                  <span className="text-lg mr-2">{getCategoryIcon(event.category)}</span>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <div className="flex text-sm text-gray-600">
                      <span className={daysUntil < 0 ? 'text-red-600 font-medium' : ''}>{daysText}</span>
                      {event.time && (
                        <span className="ml-2">• {event.time}</span>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No assignments due</p>
        </div>
      )}
    </div>
  );
};

export default CalendarWidget; 