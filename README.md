# Khan Academy Clone

A frontend clone of Khan Academy with a landing page, student dashboard, authentication, and admin panel.

## Features

- **Landing Page**: Modern, responsive landing page with information about the platform
- **Authentication**: Sign-in and sign-up pages with form validation
- **Student Dashboard**: Course progress tracking, recommendations, and weekly activity visualization
- **Admin Dashboard**: Course management tools and platform analytics

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) 
- **UI Components**: [Headless UI](https://headlessui.com/) for accessible UI components
- **Icons**: [Heroicons](https://heroicons.com/)

## Project Structure

```
/
├── app/                      # Next.js app directory
│   ├── admin/                # Admin dashboard pages
│   ├── authentication/       # Sign-in and sign-up pages
│   ├── dashboard/            # Student dashboard pages
│   ├── components/           # Shared React components
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout component
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Project dependencies and scripts
```

## Pages

1. **Landing Page** (`/`): Introduction to the platform with featured subjects and benefits
2. **Authentication**:
   - Sign In (`/authentication/signin`): User login page
   - Sign Up (`/authentication/signup`): New user registration
3. **Student Dashboard** (`/dashboard`): Learning progress, recommended courses, and activity
4. **Admin Dashboard** (`/admin`): Course management, student data, and analytics

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Khan-Academy-Clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Development

This is a frontend-only project that mimics functionality without actual backend integration. Data is stored in static variables and state management.

To add more features or update the UI:

1. Modify or add components in the `app/components` directory
2. Update page components in their respective directories
3. Use Tailwind CSS for styling components

## Future Enhancements

Potential additions to improve the project:

- Backend integration with a database
- Authentication with Next.js Auth
- Course content creation interface
- Video player integration
- Practice problem engine
- Mobile app with React Native

## License

This project is for educational purposes only and is not affiliated with Khan Academy. 