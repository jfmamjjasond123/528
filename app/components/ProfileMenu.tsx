'use client';

import React, { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { UserProfile } from './settings/types';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface ProfileMenuProps {
  user?: UserProfile;
}

const defaultUser: UserProfile = {
  id: '12345',
  name: 'John Doe',
  email: 'john.doe@example.com',
  username: 'johndoe',
  bio: 'Passionate learner',
  avatar: 'https://i.pravatar.cc/300',
  joinDate: '2022-03-15',
  role: 'student',
  badges: [],
  skills: []
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({ user = defaultUser }) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-khan-blue focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <div className="h-8 w-8 rounded-full overflow-hidden">
            <Image
              src={user.avatar}
              alt={user.name}
              width={32}
              height={32}
              className="h-8 w-8 rounded-full"
            />
          </div>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600 truncate">{user.email}</p>
          </div>
          
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/dashboard"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Dashboard
              </Link>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/dashboard/profile"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Your Profile
              </Link>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/dashboard/settings"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700'
                )}
              >
                Settings
              </Link>
            )}
          </Menu.Item>
          
          <div className="border-t border-gray-100">
            <Menu.Item>
              {({ active }) => (
                <Link
                  href="/authentication/sign-in"
                  className={classNames(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700'
                  )}
                >
                  Sign out
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileMenu; 