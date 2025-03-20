import React from 'react';
import Link from 'next/link';
import PageBanner from '@/app/components/PageBanner';

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PageBanner title="Features" />

      <main>
        {/* Feature 1: Custom Study Schedule */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Custom Study Schedule</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our adaptive study planner evolves with your needs. With our intuitive drag-and-drop calendar, you can easily create a schedule that fits your life. Cognitive load is real, and our Study Scheduler makes your MCAT journey easier.
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">1</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">One Less Thing to Worry About.</span> Follow a clear, structured plan tailored to your goals, so you know exactly what to study and when—leaving you with fewer decisions to make.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">2</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Personalized.</span> Our scheduler is fully adaptable, allowing you to build a custom CARS study plan that works with your goals and schedule. Make adjustments easily and ensure every part of your study journey fits your needs.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">3</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Flexible.</span> Life can be unpredictable, but adjusting your schedule is as simple as dragging and dropping. Sync it with your calendar to receive reminders and keep your study plan on course.</p>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2 mt-10 lg:mt-0">
                {/* Placeholder for GIF */}
                <div className="bg-gray-200 rounded-lg h-80 w-full flex items-center justify-center">
                  <p className="text-gray-500 text-center p-4">GIF of drag/drop easy/flexible scheduler features</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 2: Say Goodbye to Long, Dry, and Boring Lectures! */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:order-2 lg:pl-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Say Goodbye to Long, Dry, and Boring Lectures!</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our videos and SkillDrills make mastering the CARS section engaging and effective. We use a dynamic approach that keeps you involved and interested.
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">1</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Learn from the best.</span> Our course is designed by learning science experts and CARS instructors who scored in the top 2%.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">2</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Stay focused and engaged.</span> Bite-sized videos and built-in check points make learning easy and manageable, so you absorb the information effectively.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">3</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Practice makes perfect.</span> SkillDrills let you hone specific CARS skills with AI-powered feedback, building your confidence as you progress.</p>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2 mt-10 lg:mt-0 lg:order-1">
                {/* Placeholder for GIF */}
                <div className="bg-gray-200 rounded-lg h-80 w-full flex items-center justify-center">
                  <p className="text-gray-500 text-center p-4">GIF showing lesson with skill drill</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 3: Track Your Progress and Dominate Your Weaknesses */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Track Your Progress and Dominate Your Weaknesses</h2>
                <p className="text-lg text-gray-600 mb-6">
                  We provide in-depth analytics to help you understand your strengths and areas for improvement. You'll gain valuable insights into your performance, allowing you to focus your efforts where they matter most.
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">1</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Identify your strengths and weaknesses.</span> Get a clear picture of your overall performance and pinpoint specific areas for improvement.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">2</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Track your progress over time.</span> Monitor your improvement and see how far you've come.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">3</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Dominate different passage types.</span> Analyze your performance across various CARS passage types to ensure you're prepared for anything the exam throws your way.</p>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2 mt-10 lg:mt-0">
                {/* Placeholder for GIF */}
                <div className="bg-gray-200 rounded-lg h-80 w-full flex items-center justify-center">
                  <p className="text-gray-500 text-center p-4">GIF showing student analytics dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 4: Personalized Guidance Every Step Of The Way */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:order-2 lg:pl-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Personalized Guidance Every Step Of The Way</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Our AI-powered tutor acts as your personal CARS coach, available 24/7 to provide support and answer your questions.
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">1</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Get instant support, anytime, anywhere.</span> Have a question at 3 AM? No problem! Our AI tutor is always available to help.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">2</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Learn from your mistakes.</span> The AI tutor helps you understand why you missed a question and how to approach similar questions in the future.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">3</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Master challenging questions.</span> Get step-by-step explanations and personalized guidance for any question you encounter in our QBank.</p>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2 mt-10 lg:mt-0 lg:order-1">
                {/* Placeholder for GIF */}
                <div className="bg-gray-200 rounded-lg h-80 w-full flex items-center justify-center">
                  <p className="text-gray-500 text-center p-4">GIF AI chat bot showing users interacting with Bot asking thought provoking CARS-related questions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature 5: Practice smarter, not harder, with our adaptive QBank */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 lg:pr-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Practice smarter, not harder, with our adaptive QBank</h2>
                <p className="text-lg text-gray-600 mb-6">
                  With over 550 passages and 150 SkillDrillz, you'll have ample opportunity to hone your skills and build your confidence.
                </p>
                <ul className="space-y-4">
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">1</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Zero in on your weaknesses.</span> Our QBank acts like a personal trainer, identifying your weak spots and tailoring your practice accordingly.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">2</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Unlock your full potential.</span> Experience a truly personalized learning journey with a QBank that adapts to your progress, ensuring you're always challenged and engaged.</p>
                  </li>
                  <li className="flex">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <span className="text-indigo-600 font-bold">3</span>
                    </div>
                    <p className="text-gray-600"><span className="font-medium text-gray-900">Become exam-day ready.</span> With our extensive QBank, you'll be exposed to a diverse range of passage styles and question formats, leaving no room for surprises on test day.</p>
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2 mt-10 lg:mt-0">
                {/* Placeholder for GIF */}
                <div className="bg-gray-200 rounded-lg h-80 w-full flex items-center justify-center">
                  <p className="text-gray-500 text-center p-4">QBank GIF showing choices</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-indigo-600">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">
              Ready to Transform Your MCAT CARS Prep?
            </h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
              Start your free 3-day trial today and experience the 528Prep difference.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/authentication/signup?trial=true"
                className="bg-white text-indigo-600 px-8 py-4 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors inline-block"
              >
                Start Your Free Trial
              </Link>
              <Link
                href="/authentication/signup?buy=true"
                className="bg-transparent text-white border border-white px-8 py-4 rounded-md text-lg font-medium hover:bg-indigo-700 transition-colors inline-block"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 