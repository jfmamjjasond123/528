'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ScoreReportRouter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const examType = searchParams.get('exam');
  const examId = searchParams.get('id');
  
  React.useEffect(() => {
    // Redirect based on exam type
    if (examType === 'full-length') {
      // For full-length exams, redirect to the question bank score report
      // but pass the exam type parameter so the report can be customized
      const title = searchParams.get('title') || 'Full Length Exam';
      router.push(`/dashboard/score-report-qb?id=${examId}&title=${encodeURIComponent(title)}&examType=full-length`);
    } else if (examType === 'question-bank') {
      // For question bank exams, redirect to the question bank score report
      const title = searchParams.get('title') || 'Custom Question Bank Exam';
      router.push(`/dashboard/score-report-qb?id=${examId}&title=${encodeURIComponent(title)}&examType=question-bank`);
    } else {
      // Default to question bank if no exam type is specified
      router.push(`/dashboard/score-report-qb?id=${examId || '1'}&examType=question-bank`);
    }
  }, [examType, examId, router, searchParams]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center p-8 bg-white rounded-xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Redirecting to Score Report</h1>
        <p className="text-gray-600">Please wait while we redirect you to the appropriate score report...</p>
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
} 