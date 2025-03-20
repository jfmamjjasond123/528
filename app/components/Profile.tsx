'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useUserStore } from '@/app/lib/store/userStore';
import { UserProfile } from './settings/types';

interface ProfileProps {
  user?: UserProfile;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  // Get user from store if no user prop is provided
  const storeUser = useUserStore(state => state.user);
  const currentUser = user || storeUser;

  // If there's no user, show a message
  if (!currentUser) {
    return (
      <div className="bg-white shadow rounded-lg p-6 text-center">
        <p className="text-gray-500">User not found or not logged in.</p>
      </div>
    );
  }

  const getBadgeClass = (index: number) => {
    const colors = [
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-purple-100 text-purple-800',
      'bg-yellow-100 text-yellow-800',
      'bg-red-100 text-red-800',
      'bg-indigo-100 text-indigo-800',
      'bg-pink-100 text-pink-800',
    ];
    return colors[index % colors.length];
  };

  const getSkillLevelClass = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-blue-500';
      case 'intermediate':
        return 'bg-green-500';
      case 'advanced':
        return 'bg-purple-500';
      case 'expert':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      {/* Profile Header */}
      <div className="bg-khan-blue/10 p-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="mb-4 md:mb-0 md:mr-6">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              width={100}
              height={100}
              className="rounded-full border-4 border-white shadow"
              priority
            />
          </div>
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{currentUser.name}</h1>
            <p className="text-gray-600">@{currentUser.username}</p>
            <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-khan-blue bg-opacity-10 text-khan-blue">
                {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Member since {formatDate(currentUser.joinDate)}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Link href="/dashboard/settings" className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-khan-blue">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Bio Section */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-2">About Me</h2>
              <p className="text-gray-600">{currentUser.bio}</p>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Skills</h2>
              {currentUser.skills && currentUser.skills.length > 0 ? (
                <div className="space-y-4">
                  {currentUser.skills.map((skill, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                        <span className="text-xs font-medium text-gray-500">{skill.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${getSkillLevelClass(skill.level)}`}
                          style={{ width: `${skill.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No skills added yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gray-500 w-6 h-6 mr-2">📧</span>
                  <span className="text-gray-600">{currentUser.email}</span>
                </li>
                {currentUser.location && (
                  <li className="flex items-start">
                    <span className="text-gray-500 w-6 h-6 mr-2">📍</span>
                    <span className="text-gray-600">{currentUser.location}</span>
                  </li>
                )}
                {currentUser.website && (
                  <li className="flex items-start">
                    <span className="text-gray-500 w-6 h-6 mr-2">🌐</span>
                    <a
                      href={currentUser.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-khan-blue hover:text-khan-purple"
                    >
                      {currentUser.website.replace(/^https?:\/\//, '')}
                    </a>
                  </li>
                )}
              </ul>
            </div>

            {/* Social Media */}
            {currentUser.socialMedia && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Social Media</h2>
                <div className="flex flex-wrap gap-3">
                  {currentUser.socialMedia.twitter && (
                    <a
                      href={`https://twitter.com/${currentUser.socialMedia.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Twitter
                    </a>
                  )}
                  {currentUser.socialMedia.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${currentUser.socialMedia.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      LinkedIn
                    </a>
                  )}
                  {currentUser.socialMedia.github && (
                    <a
                      href={`https://github.com/${currentUser.socialMedia.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Badges */}
            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Badges & Achievements</h2>
              {currentUser.badges && currentUser.badges.length > 0 ? (
                <div className="grid grid-cols-2 gap-3">
                  {currentUser.badges.map((badge, index) => (
                    <div
                      key={badge.id}
                      className={`flex flex-col items-center p-3 rounded-lg ${getBadgeClass(index)}`}
                    >
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <h3 className="text-sm font-medium">{badge.name}</h3>
                      <p className="text-xs mt-1">{formatDate(badge.earnedDate)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No badges earned yet. Complete courses and challenges to earn badges!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 