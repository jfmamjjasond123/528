'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';
import {
  HeroSkeleton,
  FeatureSkeleton,
} from '@/app/components/landing/LoadingSkeletons';
import { landingPageData } from '@/app/data/landing-page';
import type { Feature, FeatureCardProps, StatsGridProps } from '@/app/types/landing-page';
import Hero from '@/app/components/landing/Hero';

// Constants
const SECTION_SPACING = 'py-20';
const CONTAINER_PADDING = 'px-4 sm:px-6 lg:px-8';

// Dynamic imports for below-the-fold content with consistent import paths
const FeatureCard = dynamic<FeatureCardProps>(() => import('@/app/components/landing/FeatureCard'));
const StatsGrid = dynamic<StatsGridProps>(() => import('@/app/components/landing/StatsGrid'));
const DetailedFeatures = dynamic(() => import('@/app/components/landing/DetailedFeatures'));
const PricingGrid = dynamic(() => import('@/app/components/landing/PricingGrid'));
const TestimonialGrid = dynamic(() => import('@/app/components/landing/TestimonialGrid'));

export default function LandingPage() {
  const { hero, features, detailedFeatures, stats, pricingPlans, testimonials } = landingPageData;

  return (
    <div className="min-h-screen bg-white">
      <main id="main-content">
        <ErrorBoundary fallback={<div>Error loading hero section</div>}>
          <Suspense fallback={<HeroSkeleton />}>
            <Hero {...hero} />
          </Suspense>
        </ErrorBoundary>

        <section className={`${SECTION_SPACING} ${CONTAINER_PADDING}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              528Prep: Smarter, Personalized, Proven
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Experience the most effective way to master MCAT CARS
            </p>
            <ErrorBoundary fallback={<div>Error loading feature cards</div>}>
              <Suspense fallback={<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">{[...Array(3)].map((_, i) => <FeatureSkeleton key={i} />)}</div>}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {features.map((feature: Feature, index) => (
                    <FeatureCard key={`feature-${index}`} {...feature} delay={index * 0.1} />
                  ))}
                </div>
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        <section className={`${SECTION_SPACING} ${CONTAINER_PADDING} bg-gray-50`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Join thousands of successful students who've improved their CARS scores
            </p>
            <ErrorBoundary fallback={<div>Error loading stats</div>}>
              <Suspense fallback={<div>Loading stats...</div>}>
                <StatsGrid stats={stats} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        <section className={`${SECTION_SPACING} ${CONTAINER_PADDING}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              All-In-One CARS Prep Course
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Everything you need to succeed in MCAT CARS
            </p>
            <ErrorBoundary fallback={<div>Error loading detailed features</div>}>
              <Suspense fallback={<div>Loading detailed features...</div>}>
                <DetailedFeatures features={detailedFeatures} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        <section className={`${SECTION_SPACING} ${CONTAINER_PADDING} bg-gray-50`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Find the perfect plan for your MCAT CARS preparation
            </p>
            <ErrorBoundary fallback={<div>Error loading pricing plans</div>}>
              <Suspense fallback={<div>Loading pricing plans...</div>}>
                <PricingGrid plans={pricingPlans} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        <section className={`${SECTION_SPACING} ${CONTAINER_PADDING}`}>
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">
              Hear from Our Successful Students
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
              Real stories from students who've achieved their CARS goals
            </p>
            <ErrorBoundary fallback={<div>Error loading testimonials</div>}>
              <Suspense fallback={<div>Loading testimonials...</div>}>
                <TestimonialGrid testimonials={testimonials} />
              </Suspense>
            </ErrorBoundary>
          </div>
        </section>

        <section className={`${SECTION_SPACING} ${CONTAINER_PADDING} bg-blue-600 text-white`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Become Another 528Prep Success Story!
            </h2>
            <p className="text-xl mb-8">
              Join thousands of successful students and start your journey to CARS mastery today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Start Your Free Trial
              </a>
              <a
                href="/pricing"
                className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 md:py-4 md:text-lg md:px-10"
              >
                View All Plans
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 