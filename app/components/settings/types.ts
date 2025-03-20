export interface UserProfile {
  id: string;
  name: string;
  email: string;
  username: string;
  bio: string;
  avatar: string;
  joinDate: string;
  role: string;
  location?: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  badges?: any[];
  skills?: any[];
}

export interface SettingsFormData {
  name: string;
  username: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  twitter: string;
  linkedin: string;
  github: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  learningReminders: boolean;
  weeklyProgress: boolean;
  newAchievements: boolean;
  courseUpdates: boolean;
  marketingEmails: boolean;
  showPublicProfile: boolean;
  showLearningActivity: boolean;
  shareSkillLevel: boolean;
  showBadges: boolean;
  language: string;
  theme: string;
  fontSize: string;
  highContrast: boolean;
  screenReader: boolean;
  autoplay: boolean;
  closedCaptioning: boolean;
} 