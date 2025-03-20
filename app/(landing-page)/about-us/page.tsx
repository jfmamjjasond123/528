'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PageBanner from '@/app/components/PageBanner';

export default function AboutUs() {
  const timelineItems = [
    {
      date: 'Jan 2015',
      year: '2015',
      title: 'Foundation',
      description: '528Prep was founded to address the gap in effective CARS preparation.',
      active: true
    },
    {
      date: 'Jun 2017',
      year: '2017',
      title: 'AI Innovation',
      description: 'Launched the first AI-powered adaptive practice tool for MCAT CARS.',
      active: false
    },
    {
      date: 'Mar 2020',
      year: '2020',
      title: 'Global Impact',
      description: 'Reached 10,000 students helped worldwide.',
      active: false
    },
    {
      date: 'Aug 2022',
      year: '2022',
      title: 'Advanced Features',
      description: 'Introduced SkillDrills and detailed analytics dashboard.',
      active: false
    },
    {
      date: 'Nov 2024',
      year: '2024',
      title: 'Comprehensive Platform',
      description: 'Launched the most comprehensive MCAT CARS prep platform.',
      active: false
    }
  ];

  const [activeTimelineItem, setActiveTimelineItem] = React.useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <PageBanner
        title="About Us"
      />
      
      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 mb-8"></div>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              At 528Prep, we believe that achieving excellence in MCAT CARS shouldn't be a matter of luck or innate ability. 
              Our mission is to democratize access to high-quality CARS preparation by combining cutting-edge AI technology 
              with proven pedagogical methods, empowering students from all backgrounds to reach their full potential and 
              achieve their dream of becoming physicians.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of educational technology to create 
                the most effective and personalized learning experience.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We strive to make top-tier MCAT CARS preparation accessible to all students, 
                regardless of their background or financial means.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg p-8 text-center shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-16 w-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We foster a supportive community of future physicians, sharing knowledge 
                and helping each other succeed in the journey to medical school.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Our Journey / Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Journey</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4"></div>
          </motion.div>
          
          {/* Active Timeline Item Display */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-8 mb-16"
          >
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center">
                <div className="relative h-48 w-48 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 opacity-10 rounded-full"></div>
                  <div className="relative z-10 w-32 h-32 bg-white rounded-full border-4 border-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">{timelineItems[activeTimelineItem].year}</div>
                      <div className="text-sm text-indigo-600">{timelineItems[activeTimelineItem].date}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-2/3 md:pl-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{timelineItems[activeTimelineItem].title}</h3>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {timelineItems[activeTimelineItem].description}
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* Timeline */}
          <div className="relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transform -translate-y-1/2"></div>
            
            <div className="flex justify-between relative z-10">
              {timelineItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  onClick={() => setActiveTimelineItem(index)}
                  className="flex flex-col items-center focus:outline-none relative"
                >
                  <div className={`h-5 w-5 rounded-full ${activeTimelineItem === index ? 'bg-gradient-to-r from-indigo-500 to-purple-600' : 'bg-gray-300'} transition-colors duration-300 mb-3`}></div>
                  <div className={`text-sm font-medium ${activeTimelineItem === index ? 'text-indigo-600' : 'text-gray-500'} transition-colors duration-300`}>
                    {item.date}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto mt-4 mb-8"></div>
            <p className="max-w-3xl mx-auto text-xl text-gray-600">
              Meet the dedicated professionals behind 528Prep who are passionate about 
              helping students excel in their MCAT CARS journey.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="h-24 w-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Dr. Sarah Johnson</h3>
                <p className="text-indigo-600 mb-4">Founder & CEO</p>
                <p className="text-gray-600">
                  Former MCAT instructor with 15+ years of experience. Passionate about making 
                  CARS preparation accessible to all pre-med students.
                </p>
              </div>
            </motion.div>
            
            {/* Team Member 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="h-24 w-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Michael Chen</h3>
                <p className="text-indigo-600 mb-4">Chief Technology Officer</p>
                <p className="text-gray-600">
                  AI specialist with a background in educational technology. Leads the development 
                  of our adaptive learning algorithms.
                </p>
              </div>
            </motion.div>
            
            {/* Team Member 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="h-64 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
                <svg className="h-24 w-24 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">Dr. James Rodriguez</h3>
                <p className="text-indigo-600 mb-4">Content Director</p>
                <p className="text-gray-600">
                  Former AAMC question writer with expertise in developing representative CARS passages 
                  and questions that mirror the real exam.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-indigo-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-white mb-6"
          >
            Ready to Transform Your CARS Preparation?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto"
          >
            Join thousands of students who have improved their CARS scores with our 
            proven methods and adaptive technology.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center"
          >
            <Link 
              href="/authentication/signup?trial=true" 
              className="bg-white text-indigo-600 px-8 py-3 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
            >
              Start Free Trial
            </Link>
            <Link 
              href="/contact-us" 
              className="bg-transparent text-white border-2 border-white px-8 py-3 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors inline-block"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
} 