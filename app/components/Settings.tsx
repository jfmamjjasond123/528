'use client';

import React from 'react';
import Settings from './settings/Settings';
import { UserProfile } from './settings/types';

// Re-export the component from the settings folder
export type { UserProfile } from './settings/types';

export default Settings; 