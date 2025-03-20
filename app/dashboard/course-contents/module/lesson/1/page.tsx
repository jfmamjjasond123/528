'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ChevronLeft, ChevronRight, Clock, CheckCircle, 
  BookOpen, Play, Flag, ThumbsUp, ThumbsDown, 
  MessageCircle, Share2, Download, Bookmark
} from 'lucide-react';

// Define types for lesson navigation
interface LessonLink {
  id: number;
  title: string;
}

// Define type for lesson data
interface LessonData {
  id: number;
  title: string;
  duration: string;
  module: string;
  moduleId: number;
  description: string;
  videoUrl: string;
  type: string;
  next: LessonLink | null;
  prev: LessonLink | null;
}

export default function LessonPage() {
  const params = useParams();
  const [completed, setCompleted] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  
  // Mock lesson data
  const lesson: LessonData = {
    id: 1,
    title: 'Introduction to CARS Passages',
    duration: '25 min',
    module: 'Getting Started',
    moduleId: 1,
    description: 'In this lesson, you will learn the fundamental structure of MCAT CARS passages and develop strategies to approach them effectively.',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    type: 'lesson',
    next: {
      id: 2,
      title: 'Identifying Main Ideas and Arguments'
    },
    prev: null
  };
  
  // Toggle bookmark
  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };
  
  // Toggle completed
  const toggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back to Course */}
          <div className="mb-4">
            <Link 
              href="/dashboard/course-contents/module" 
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Course: Foundations of CARS Analysis
            </Link>
          </div>
          
          {/* Lesson Header */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="px-2 py-1 text-xs rounded bg-indigo-100 text-indigo-700 mr-2">
                      Module {lesson.moduleId}: {lesson.module}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="w-4 h-4 mr-1" />
                      {lesson.duration}
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900">{lesson.title}</h1>
                </div>
                <div className="mt-2 md:mt-0 flex space-x-2">
                  <button 
                    onClick={toggleCompleted}
                    className={`flex items-center px-3 py-2 rounded-lg border transition-colors ${
                      completed 
                        ? 'bg-green-50 border-green-200 text-green-700' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <CheckCircle className={`w-5 h-5 mr-2 ${completed ? 'text-green-500' : 'text-gray-400'}`} />
                    {completed ? 'Completed' : 'Mark as Complete'}
                  </button>
                  <button 
                    onClick={toggleBookmark}
                    className={`p-2 rounded-lg border transition-colors ${
                      bookmarked 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-600' 
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                    }`}
                    aria-label={bookmarked ? 'Remove bookmark' : 'Bookmark lesson'}
                  >
                    <Bookmark className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Lesson Content */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {/* Video Embed */}
            <div className="aspect-w-16 aspect-h-9">
              <iframe 
                src={lesson.videoUrl} 
                title={lesson.title}
                className="w-full h-96 border-0"
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Lesson Text Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Lesson Content</h2>
              
              <div className="prose max-w-none">
                <h3>Understanding CARS Passages</h3>
                <p>
                  The Critical Analysis and Reasoning Skills (CARS) section of the MCAT is designed to test your ability to comprehend complex texts and
                  draw logical inferences from them. Unlike other sections of the MCAT, the CARS section does not require specific scientific knowledge
                  but instead focuses on your critical thinking and analytical skills.
                </p>
                
                <p>
                  CARS passages typically come from humanities and social sciences disciplines such as:
                </p>
                
                <ul>
                  <li>Philosophy</li>
                  <li>Ethics</li>
                  <li>Literature</li>
                  <li>Art History</li>
                  <li>Cultural Studies</li>
                  <li>Political Science</li>
                  <li>History</li>
                </ul>
                
                <h3>Key Components of CARS Passages</h3>
                <p>
                  Each CARS passage includes several key components that you should identify:
                </p>
                
                <ol>
                  <li><strong>Main Idea/Central Argument</strong>: The primary point the author is trying to convey</li>
                  <li><strong>Supporting Arguments</strong>: Evidence and reasoning used to support the main idea</li>
                  <li><strong>Tone</strong>: The author's attitude toward the subject matter</li>
                  <li><strong>Structure</strong>: How the passage is organized and how ideas flow from one to another</li>
                  <li><strong>Perspective</strong>: The author's viewpoint and biases</li>
                </ol>
                
                <h3>Effective Reading Strategies</h3>
                <p>
                  To approach CARS passages effectively, consider these strategies:
                </p>
                
                <ol>
                  <li><strong>Active Reading</strong>: Engage with the text by mentally questioning what you're reading</li>
                  <li><strong>Identify Paragraph Functions</strong>: Understand what role each paragraph plays in developing the author's argument</li>
                  <li><strong>Track the Author's Argument</strong>: Note how the author builds their case throughout the passage</li>
                  <li><strong>Note Transitions</strong>: Pay attention to transitional words and phrases that signal changes in direction</li>
                  <li><strong>Watch for Strong Language</strong>: Authors often emphasize their most important points with strong language</li>
                </ol>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between mb-8">
            {lesson.prev ? (
              <Link
                href={`/dashboard/course-contents/module/lesson/${lesson.prev?.id}`}
                className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Previous: {lesson.prev?.title}
              </Link>
            ) : (
              <div></div>
            )}
            
            {lesson.next && (
              <Link
                href={`/dashboard/course-contents/module/lesson/${lesson.next?.id}`}
                className="flex items-center px-4 py-2 bg-indigo-600 border border-indigo-600 rounded-lg text-white hover:bg-indigo-700 transition-colors"
              >
                Next: {lesson.next?.title}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
} 