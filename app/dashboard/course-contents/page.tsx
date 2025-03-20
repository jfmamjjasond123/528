"use client";

import React from 'react';
import MCATCARSPrep from '../../components/courses/MCATCARSPrep';
import { FileText, BookOpen, ArrowRight } from 'lucide-react';
import PageHeader from '../../components/ui/layout/PageHeader';
import Button from '../../components/ui/inputs/Button';
import Card from '../../components/ui/cards/Card';

export default function CourseContentsPage() {
  const CourseStats = (
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
  );

  const ResumeButton = (
    <Button
      variant="primary"
      size="lg"
      icon={<ArrowRight />}
      iconPosition="right"
    >
      Resume Course
    </Button>
  );

  return (
    <div className="min-h-screen bg-khan-background">
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <PageHeader
            title="MCAT CARS Preparation"
            description="Comprehensive lessons and practice materials for CARS mastery"
            icon={<BookOpen />}
            actions={
              <div className="flex items-center gap-4">
                {CourseStats}
                {ResumeButton}
              </div>
            }
          />

          {/* MCAT CARS Prep Course Section */}
          <Card>
            <MCATCARSPrep />
          </Card>
        </div>
      </main>
    </div>
  );
} 