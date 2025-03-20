"use client";

import React from 'react';
import MCATCARSPrep from '../../components/courses/MCATCARSPrep';
import { FileText, BookOpen, ArrowRight } from 'lucide-react';

export default function CourseContentsPage() {
  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg mr-4">
                  <BookOpen className="w-7 h-7 text-blue-700" aria-hidden="true" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">MCAT CARS Preparation</h1>
                  <p className="text-gray-600">Comprehensive lessons and practice materials for CARS mastery</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 text-blue-800 px-5 py-3 rounded-lg flex items-center border border-blue-200 shadow-sm">
                  <FileText className="w-5 h-5 mr-2" aria-hidden="true" />
                  <div>
                    <span className="font-bold text-lg">25</span>
                    <span className="font-medium"> lessons</span>
                    <span className="mx-2">•</span>
                    <span className="font-bold text-lg">20</span>
                    <span className="font-medium"> hours</span>
                  </div>
                </div>
                
                <button 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg flex items-center transition-all shadow-sm"
                  aria-label="Resume course"
                >
                  Resume Course <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* MCAT CARS Prep Course Section */}
          <MCATCARSPrep />
        </div>
      </main>
    </div>
  );
} 