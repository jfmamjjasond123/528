'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import PageBanner from '@/app/components/PageBanner';

interface FormData {
  name: string;
  email: string;
  isCurrentUser: string;
  subject: string;
  message: string;
  file: File | null;
}

interface FormErrors {
  name?: string;
  email?: string;
  isCurrentUser?: string;
  subject?: string;
  message?: string;
}

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    isCurrentUser: '',
    subject: '',
    message: '',
    file: null
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors: FormErrors = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.isCurrentUser) errors.isCurrentUser = 'Please select an option';
    if (!formData.subject) errors.subject = 'Please select a subject';
    if (!formData.message.trim()) errors.message = 'Message is required';
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSubmitSuccess(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormData({
        name: '',
        email: '',
        isCurrentUser: '',
        subject: '',
        message: '',
        file: null
      });
    }, 3000);
  };

  const bannerActions = (
    <>
      <a href="#contact-form" className="bg-white text-indigo-600 font-medium rounded-lg px-8 py-4 shadow-lg hover:bg-gray-100 transition duration-300 text-lg flex items-center justify-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Get in Touch
      </a>
      <a href="#support" className="bg-transparent text-white border-2 border-white font-medium rounded-lg px-8 py-4 hover:bg-white/10 transition duration-300 text-lg flex items-center justify-center">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        View Support Options
      </a>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      <PageBanner
        title="Contact Us"
      />

      {/* Main Content with Enhanced Two-Column Layout */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Contact Form Column - Now Prioritized */}
            <div className="lg:col-span-7 order-2 lg:order-1" id="contact-form">
              <div className="bg-white rounded-xl shadow-xl p-10">
                <div className="mb-8 border-b border-gray-200 pb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Get in Touch</h2>
                <p className="text-gray-600">
                    Fill out the form below, and our team will get back to you within 24 hours.
                </p>
              </div>
              
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name Field with Floating Label */}
                  <div className="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`peer w-full px-4 pt-6 pb-2 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors outline-none
                        ${formErrors.name 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                        peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                        peer-focus:top-2 peer-focus:text-sm"
                    >
                      Name
                    </label>
                    {formErrors.name && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                    )}
                </div>
                
                  {/* Email Field with Floating Label */}
                  <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`peer w-full px-4 pt-6 pb-2 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors outline-none
                        ${formErrors.email 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                      placeholder=" "
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                        peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                        peer-focus:top-2 peer-focus:text-sm"
                    >
                      Email Address
                    </label>
                    {formErrors.email && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                    )}
                </div>
                
                  {/* Current User Radio Buttons - Enhanced */}
                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700">
                    Are You a Current User?
                  </label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className="relative flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="isCurrentUser"
                          value="yes"
                          checked={formData.isCurrentUser === 'yes'}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-900">Yes</span>
                      </label>
                      <label className="relative flex items-center justify-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <input
                          type="radio"
                          name="isCurrentUser"
                          value="no"
                          checked={formData.isCurrentUser === 'no'}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500"
                        />
                        <span className="ml-3 text-gray-900">No</span>
                      </label>
                    </div>
                    {formErrors.isCurrentUser && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.isCurrentUser}</p>
                    )}
                </div>
                
                  {/* Subject Dropdown - Enhanced */}
                  <div className="relative">
                  <select
                    id="subject"
                    name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg appearance-none bg-white
                        ${formErrors.subject 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                    >
                      <option value="">Select a Subject</option>
                    <option value="General Question">General Question</option>
                    <option value="Account/Billing Issue">Account/Billing Issue</option>
                    <option value="Technical Support">Technical Support</option>
                    <option value="Other">Other</option>
                  </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                    {formErrors.subject && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>
                    )}
                </div>
                
                  {/* Message Text Area - Enhanced */}
                  <div className="relative">
                  <textarea
                    id="message"
                    name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      className={`peer w-full px-4 pt-6 pb-2 border rounded-lg focus:ring-2 focus:ring-offset-2 transition-colors outline-none resize-none
                        ${formErrors.message 
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500'}`}
                      placeholder=" "
                  ></textarea>
                    <label
                      htmlFor="message"
                      className="absolute left-4 top-2 text-sm text-gray-500 transition-all
                        peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                        peer-focus:top-2 peer-focus:text-sm"
                    >
                      Your Message
                    </label>
                    {formErrors.message && (
                      <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                    )}
                </div>
                
                  {/* File Upload - Enhanced */}
                  <div className="relative">
                    <div className="group border-2 border-dashed rounded-lg p-6 transition-colors hover:border-indigo-500 hover:bg-indigo-50/50">
                      <input
                        type="file"
                        id="file-upload"
                        name="file-upload"
                        className="hidden"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const files = e.target.files;
                          if (files && files.length > 0) {
                            setFormData(prev => ({ ...prev, file: files[0] }));
                          }
                        }}
                      />
                      <label htmlFor="file-upload" className="cursor-pointer block text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400 group-hover:text-indigo-500 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600 group-hover:text-indigo-600">
                          <span className="font-medium text-indigo-600">Upload a file</span> or drag and drop
                        </p>
                        <p className="mt-1 text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                  </label>
                    </div>
                  </div>

                  {/* Submit Button - Enhanced */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`relative w-full py-4 px-6 rounded-lg text-lg font-medium transition-all duration-200
                        ${isSubmitting 
                          ? 'bg-indigo-400 cursor-not-allowed' 
                          : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'}
                        text-white shadow-lg hover:shadow-xl
                        transform hover:-translate-y-0.5 active:translate-y-0`}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending Message...
                        </div>
                      ) : submitSuccess ? (
                        <div className="flex items-center justify-center text-white">
                          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Message Sent!
                        </div>
                      ) : (
                        "Send Message"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Support Info Column */}
            <div className="lg:col-span-5 order-1 lg:order-2" id="support">
              <div className="sticky top-24">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Personalized Support</h2>
                
                {/* Contact Info Cards */}
                <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border-l-4 border-indigo-500">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Contact Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                        <p className="text-lg font-medium text-gray-900">support@528prep.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Office Hours</p>
                        <p className="text-lg font-medium text-gray-900 flex items-center">
                          <svg className="w-5 h-5 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Mon-Fri, 9 AM–5 PM EST
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500 mb-1">Social Media</p>
                        <div className="flex space-x-4 mt-2">
                          <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                            </svg>
                          </a>
                          <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                          </a>
                          <a href="#" className="text-gray-500 hover:text-indigo-600 transition-colors flex items-center">
                            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Promotional Cards */}
                <div className="space-y-8">
                  <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-8 border border-indigo-100 shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Try Our Platform</h3>
                    <p className="text-gray-600 mb-6">
                      Experience our comprehensive CARS prep platform with a free 7-day trial. See the difference in your test performance.
                    </p>
                    <Link 
                      href="/#pricing" 
                      className="block w-full bg-indigo-600 text-white text-center py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Start Free Trial
                    </Link>
                </div>
                
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-8 border border-purple-100 shadow-md">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Watch a Demo</h3>
                    <p className="text-gray-600 mb-6">
                      See our tools and features in action with a guided video tour of the 528Prep platform.
                    </p>
                <button
                      className="block w-full bg-white border border-indigo-600 text-indigo-600 text-center py-3 px-4 rounded-lg hover:bg-indigo-50 transition-colors font-medium"
                >
                      Watch Demo
                </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section with Clear Divider */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4"></div>
            <p className="mt-4 text-xl text-gray-600">Success stories from our MCAT CARS prep community</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl shadow-lg relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="mb-6">
                <div className="flex text-yellow-400 mb-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-gray-700 text-lg italic">"528Prep transformed my CARS preparation. The strategies and practice materials helped me improve my score from the 124 to 130. Their support team was always there when I needed help."</p>
              </div>
              <div className="flex items-center">
                <img src="/testimonials/sarah-m.jpg" alt="Sarah M." className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah M.</h4>
                  <p className="text-gray-600">Medical Student, Johns Hopkins</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-xl shadow-lg relative">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <div className="mb-6">
                <div className="flex text-yellow-400 mb-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                </div>
                <p className="text-gray-700 text-lg italic">"The personalized feedback and analytics helped me identify my weaknesses and turn them into strengths. I couldn't have achieved my score without 528Prep's guidance."</p>
              </div>
              <div className="flex items-center">
                <img src="/testimonials/james-k.jpg" alt="James K." className="w-12 h-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">James K.</h4>
                  <p className="text-gray-600">Accepted to Stanford Medicine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 