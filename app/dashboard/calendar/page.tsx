'use client';

import React, { useState } from 'react';
import Calendar from '../../components/Calendar';
import Link from 'next/link';
import { format } from 'date-fns';
import { 
  X, Plus, AlertTriangle, Clock, MapPin, ChevronRight, 
  Calendar as CalendarIcon, BookOpen, FileText, ChevronLeft
} from 'lucide-react';
import PageHeader from '../../components/ui/layout/PageHeader';
import Button from '../../components/ui/inputs/Button';
import Card from '../../components/ui/cards/Card';
import StatusBadge from '../../components/ui/data-display/StatusBadge';
import EmptyState from '../../components/ui/feedback/EmptyState';

// Event type options
const eventTypes = [
  { id: 'cars_practice', label: 'CARS Practice Session' },
  { id: 'cars_quiz', label: 'CARS Quiz' },
  { id: 'cars_review', label: 'CARS Content Review' },
  { id: 'cars_full_length', label: 'CARS Full Length' },
  { id: 'other', label: 'Other MCAT Related' }
];

export default function CalendarPage() {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const formattedDate = format(selectedDate, 'EEEE, MMMM d');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  
  // Format month name
  const monthName = new Date(selectedYear, selectedMonth).toLocaleString('default', { month: 'long' });
  
  // Handle month navigation
  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };
  
  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };
  
  // Form state
  const [eventTitle, setEventTitle] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventType, setEventType] = useState('');
  const [eventDate, setEventDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  // Mock data for events based on selected date
  const getEventsForDate = (date: Date) => {
    // In a real app, this would fetch from an API based on the date
    // For now, we'll just return the same events for any date
    return [
      {
        id: 1,
        title: 'MCAT CARS Practice Session',
        time: '9:00 AM - 10:30 AM',
        location: 'Online - Zoom',
        priority: 'high',
        course: 'CARS'
      },
      {
        id: 2,
        title: 'Biology Review: Cell Structure',
        time: '1:00 PM - 2:30 PM',
        location: 'Study Room 204',
        priority: 'medium',
        course: 'Biology'
      },
      {
        id: 3,
        title: 'Physics Problem Set #4',
        time: '4:00 PM - 5:30 PM',
        location: 'Library',
        priority: 'low',
        course: 'Physics'
      }
    ];
  };

  const eventsForSelectedDate = getEventsForDate(selectedDate);

  // Handle date selection from the calendar
  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setShowAddEventForm(false); // Hide the add event form when selecting a date
  };

  // Reset to today's date
  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  };

  // Open modal and set default date to selected date
  const openAddEventModal = () => {
    setEventDate(format(selectedDate, 'yyyy-MM-dd'));
    setIsModalOpen(true);
  };

  // Close modal and reset form
  const closeModal = () => {
    setIsModalOpen(false);
    setEventTitle('');
    setEventDescription('');
    setEventType('');
  };

  // Toggle add event form
  const toggleAddEventForm = () => {
    setShowAddEventForm(!showAddEventForm);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would save the event to a database
    console.log('New event:', {
      title: eventTitle,
      description: eventDescription,
      type: eventType,
      date: eventDate
    });
    
    // Close the modal and reset form
    closeModal();
    setShowAddEventForm(false);
    
    // Show success message or update the events list
    alert('Event added successfully!');
  };

  // Get priority styling
  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'high':
        return {
          badge: 'bg-red-100 text-red-800 font-bold',
          icon: <AlertTriangle className="w-4 h-4 text-red-600 mr-1" />,
          border: 'border-l-4 border-l-red-500'
        };
      case 'medium':
        return {
          badge: 'bg-amber-100 text-amber-800',
          icon: <AlertTriangle className="w-4 h-4 text-amber-600 mr-1" />,
          border: 'border-l-4 border-l-amber-500'
        };
      case 'low':
        return {
          badge: 'bg-blue-50 text-blue-700 text-sm',
          icon: null,
          border: 'border-l-4 border-l-blue-300'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-800',
          icon: null,
          border: 'border-l-4 border-l-gray-300'
        };
    }
  };

  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="Calendar"
            description="Plan your study schedule and track your progress"
            icon={<CalendarIcon />}
            actions={
              <Button
                variant="primary"
                size="lg"
                icon={<Plus />}
                onClick={toggleAddEventForm}
              >
                Add Event
              </Button>
            }
          />
          
          {/* Two-column layout */}
          <div className="flex flex-col md:flex-row gap-6">
            {/* Calendar column - 65% width */}
            <div className="md:w-[65%]">
              {/* Calendar navigation controls */}
              <Card className="mb-4 p-4">
                <div className="flex justify-between items-center">
                  <button
                    onClick={prevMonth}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="Previous month"
                  >
                    <ChevronLeft className="h-5 w-5 text-gray-600" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-medium text-gray-700">
                      {monthName} {selectedYear}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToToday}
                    >
                      Today
                    </Button>
                  </div>
                  
                  <button
                    onClick={nextMonth}
                    className="p-1 rounded-full hover:bg-gray-100"
                    aria-label="Next month"
                  >
                    <ChevronRight className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
              </Card>
              
              {/* Calendar with increased padding */}
              <Card padding="large">
                <Calendar 
                  onDateSelect={handleDateSelect} 
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                />
              </Card>
            </div>

            {/* Sidebar with selected date events - 35% width */}
            <div className="md:w-[35%]">
              {/* Selected Date Information */}
              <Card padding="large" className="mb-4">
                <h3 className="text-xl font-medium text-gray-900 mb-6">{formattedDate}</h3>
                
                {eventsForSelectedDate.length > 0 ? (
                  <div className="space-y-4">
                    {eventsForSelectedDate.map(event => {
                      const priorityStyles = getPriorityStyles(event.priority);
                      const priorityStatus = event.priority === 'high' ? 'error' : 
                                            event.priority === 'medium' ? 'warning' : 'info';
                      
                      return (
                        <Card 
                          key={event.id}
                          className={`${priorityStyles.border} shadow-none`}
                          padding="medium"
                        >
                          <div className="flex justify-between items-start">
                            <h4 className="text-md font-medium text-gray-900">{event.title}</h4>
                            <StatusBadge
                              status={priorityStatus}
                              text={event.priority.charAt(0).toUpperCase() + event.priority.slice(1)}
                              icon={priorityStyles.icon}
                              size="sm"
                            />
                          </div>
                          <div className="mt-2 space-y-1 text-sm">
                            <div className="flex items-center text-gray-500">
                              <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {event.time}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              {event.location}
                            </div>
                            <div className="flex items-center text-gray-500">
                              <BookOpen className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                              Course: {event.course}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <EmptyState
                    icon={<CalendarIcon className="h-6 w-6" />}
                    title="No events"
                    description="No events scheduled for this day."
                    action={
                      <Button
                        variant="primary"
                        size="md"
                        icon={<Plus />}
                        onClick={toggleAddEventForm}
                      >
                        Add event
                      </Button>
                    }
                  />
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Add Event Modal/Popup */}
      {showAddEventForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <Card className="max-w-md w-full mx-4 p-6 shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Add New Event</h3>
              <button
                onClick={toggleAddEventForm}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  id="eventTitle"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="eventDate" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  id="eventDate"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                />
              </div>
              <div>
                <label htmlFor="eventType" className="block text-sm font-medium text-gray-700">
                  Event Type
                </label>
                <select
                  id="eventType"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  required
                >
                  <option value="">Select type</option>
                  {eventTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="eventDescription" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="eventDescription"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  rows={3}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div className="flex space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={toggleAddEventForm}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                >
                  Save Event
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
} 