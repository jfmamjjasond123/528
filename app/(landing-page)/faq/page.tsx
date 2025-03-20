'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PageBanner from '@/app/components/PageBanner';

export default function FAQPage() {
  const [activeSection, setActiveSection] = useState('general');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px'
      }
    );

    // Observe all section elements
    document.querySelectorAll('.section-content').forEach((section) => {
      observer.observe(section);
    });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  const handleSectionClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const sections = [
    { id: 'general', label: 'General' },
    { id: 'pricing', label: 'Pricing & Plans' },
    { id: 'account', label: 'Account Management' },
    { id: 'platform', label: 'Platform Features' },
    { id: 'studying', label: 'Studying & Progress' },
    { id: 'support', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageBanner title="FAQ" />

      {/* FAQ Content Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3">
              <div className="sticky top-[104px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">In this section</h2>
                <div className="border-t border-gray-200 mb-6"></div>
                <nav className="space-y-1" id="section-nav">
                  {sections.map(({ id, label }) => (
                    <a
                      key={id}
                      href={`#${id}`}
                      onClick={() => handleSectionClick(id)}
                      className={`section-link block py-2 border-l-4 pl-3 transition-colors duration-200 ${
                        activeSection === id
                          ? 'text-indigo-600 border-indigo-600 bg-indigo-50'
                          : 'text-gray-700 hover:text-indigo-600 border-transparent hover:border-indigo-600 hover:bg-indigo-50'
                      }`}
                    >
                      {label}
                    </a>
                  ))}
                </nav>
                <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                  <h3 className="text-lg font-medium text-indigo-800 mb-2">Need more help?</h3>
                  <p className="text-sm text-gray-600 mb-4">If you can't find the answer to your question, our support team is here to help.</p>
                  <Link href="/contact-us" className="text-indigo-600 font-medium hover:text-indigo-800">
                    Contact Support →
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="mt-12 lg:mt-0 lg:col-span-9">
              {/* General Section */}
              <div id="general" className="mb-16 section-content scroll-mt-[104px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">General</h2>
                <div className="border-t border-gray-200 mb-6"></div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">What is 528Prep?</h3>
                  <p className="text-gray-600 mb-6">
                    528Prep is a comprehensive online platform specifically designed to help pre-med students excel in the MCAT CARS (Critical Analysis and Reasoning Skills) section. Our platform combines adaptive learning technology, expert-crafted content, and detailed analytics to provide personalized CARS preparation.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">Why should I choose 528Prep for CARS preparation?</h3>
                  <p className="text-gray-600 mb-6">
                    528Prep stands out with our AI-powered approach that adapts to your individual learning needs. Unlike traditional prep methods, we analyze your performance to identify specific strengths and weaknesses, then customize your study plan accordingly. Our platform was developed by 99th percentile MCAT scorers and learning science experts, ensuring you get the most effective strategies for CARS success.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">How does 528Prep differ from other MCAT prep services?</h3>
                  <p className="text-gray-600 mb-6">
                    While many services offer general MCAT preparation, 528Prep specializes exclusively in the CARS section, which many students find most challenging. Our focused approach means deeper content, more targeted strategies, and specialized tools designed specifically for mastering CARS. Additionally, our adaptive platform provides personalized guidance and real-time feedback that general MCAT prep services typically don't offer.
                  </p>
                </div>
              </div>

              {/* Pricing Section */}
              <div id="pricing" className="mb-16 section-content scroll-mt-[104px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Pricing & Plans</h2>
                <div className="border-t border-gray-200"></div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">How much does 528Prep cost?</h3>
                  <p className="text-gray-600 mb-6">
                    528Prep offers several pricing tiers to fit different needs and budgets. Our Basic plan starts at $99 for 3 months of access, while our most comprehensive Premium plan is $299 for 6 months of access. All plans include a 3-day free trial period, allowing you to explore our platform before committing. Visit our <Link href="/#pricing" className="text-indigo-600 hover:text-indigo-800">pricing page</Link> for detailed information on what each plan includes.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">Do you offer any discounts for students?</h3>
                  <p className="text-gray-600 mb-6">
                    Yes! We understand that MCAT preparation can be expensive. We offer a 15% discount for verified students. Additionally, we periodically run special promotions throughout the year. Join our mailing list to stay informed about upcoming discounts and special offers.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">Can I cancel my subscription?</h3>
                  <p className="text-gray-600 mb-6">
                    Yes, you can cancel your subscription at any time. If you cancel during your free trial period, you won't be charged. If you cancel after being billed, you'll continue to have access until the end of your billing period, but won't be charged again. There are no cancellation fees or hidden charges.
                  </p>
                </div>
              </div>

              {/* Account Management Section */}
              <div id="account" className="mb-16 section-content scroll-mt-[104px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Account Management</h2>
                <div className="border-t border-gray-200"></div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">How do I create an account?</h3>
                  <p className="text-gray-600 mb-6">
                    Creating an account is simple! Click the "Sign Up" button in the top-right corner of our website. You can sign up using your email address or through Google/Facebook authentication. After verifying your email, you'll be guided through a brief assessment to help customize your learning experience.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">Can I access 528Prep on multiple devices?</h3>
                  <p className="text-gray-600 mb-6">
                    Absolutely! Your 528Prep account can be accessed on any device with a web browser, including desktops, laptops, tablets, and smartphones. Your progress will automatically sync across all your devices, allowing you to study seamlessly wherever you are.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">How do I reset my password?</h3>
                  <p className="text-gray-600 mb-6">
                    If you've forgotten your password, click the "Forgot Password" link on the sign-in page. Enter the email address associated with your account, and we'll send you instructions to reset your password. For security reasons, password reset links expire after 24 hours.
                  </p>
                </div>
              </div>

              {/* Platform Features Section */}
              <div id="platform" className="mb-16 section-content scroll-mt-[104px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Platform Features</h2>
                <div className="border-t border-gray-200"></div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">What features does 528Prep offer?</h3>
                  <p className="text-gray-600 mb-6">
                    528Prep offers a comprehensive suite of features designed specifically for CARS preparation:
                  </p>
                  <ul className="list-disc pl-6 mt-2 mb-6 space-y-1 text-gray-600">
                    <li>Personalized study schedules that adapt to your progress</li>
                    <li>550+ practice passages with varying difficulty levels</li>
                    <li>150+ SkillDrills for targeted skill development</li>
                    <li>Detailed analytics dashboard to track your progress</li>
                    <li>AI-powered tutor available 24/7 for personalized guidance</li>
                    <li>Strategy videos from 99th percentile MCAT scorers</li>
                    <li>Timed practice exams that mimic the real MCAT experience</li>
                  </ul>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">How many practice passages do you have?</h3>
                  <p className="text-gray-600 mb-6">
                    Our platform includes over 550 practice passages covering a wide range of topics and difficulty levels. These passages are carefully curated to mirror the types of content you'll encounter on the actual MCAT CARS section. New passages are added regularly to ensure fresh content for our users.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">What are SkillDrills?</h3>
                  <p className="text-gray-600 mb-6">
                    SkillDrills are focused exercises designed to target specific CARS skills, such as identifying the main idea, understanding tone, recognizing assumptions, and evaluating arguments. Each SkillDrill provides immediate feedback and detailed explanations to help you develop mastery in particular areas. They're shorter than full passages, allowing for more focused and efficient practice.
                  </p>
                </div>
              </div>

              {/* Studying & Progress Section */}
              <div id="studying" className="mb-16 section-content scroll-mt-[104px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Studying & Progress</h2>
                <div className="border-t border-gray-200"></div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">How does the adaptive learning technology work?</h3>
                  <p className="text-gray-600 mb-6">
                    Our adaptive learning technology analyzes your performance on passages, questions, and SkillDrills to identify patterns in your strengths and weaknesses. The system then adjusts your study plan, recommending specific content and exercises to address your areas of improvement. As you progress, the system continues to adapt, ensuring your study time is always focused on what will help you most.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">How long should I study for the CARS section?</h3>
                  <p className="text-gray-600 mb-6">
                    The ideal study duration varies by individual, but most students benefit from 2-3 months of focused CARS preparation. With 528Prep, we recommend consistent daily practice of 30-60 minutes rather than occasional cramming sessions. Our platform will help you create a personalized schedule based on your target test date and current skill level.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">Can I track my progress over time?</h3>
                  <p className="text-gray-600 mb-6">
                    Absolutely! Our comprehensive analytics dashboard provides detailed insights into your performance trends over time. You can track your accuracy by question type, passage topic, and difficulty level. The system also calculates your projected CARS score based on your performance, helping you gauge your readiness for the actual exam.
                  </p>
                </div>
              </div>

              {/* Support Section */}
              <div id="support" className="mb-16 section-content scroll-mt-[104px]">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Support</h2>
                <div className="border-t border-gray-200"></div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-indigo-800 mb-4">How can I contact customer support?</h3>
                  <p className="text-gray-600 mb-6">
                    Our customer support team is available Monday through Friday from 9 AM to 5 PM EST. You can reach us via email at support@528prep.com or through the contact form on our website. We strive to respond to all inquiries within 24 business hours.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">Do you offer any tutorials on how to use the platform?</h3>
                  <p className="text-gray-600 mb-6">
                    Yes! When you first sign up, you'll be guided through an interactive tutorial covering all the key features of the platform. Additionally, we have a dedicated Help Center with comprehensive guides, video tutorials, and tips for making the most of 528Prep. You can access the Help Center anytime from your account dashboard.
                  </p>

                  <h3 className="text-xl font-bold text-indigo-800 mb-4">Is there a community forum for users?</h3>
                  <p className="text-gray-600 mb-6">
                    Yes, all subscribers gain access to our community forum where you can connect with other pre-med students, share strategies, ask questions, and find study partners. The forum is moderated by our team, and our CARS experts regularly contribute to discussions to provide valuable insights and advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 