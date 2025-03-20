import { BsLightningCharge, BsBarChart, BsChatDots } from 'react-icons/bs';
import { FaRegCalendarAlt, FaVideo, FaChartLine, FaRobot, FaBookOpen } from 'react-icons/fa';
import type { Feature, Stat, DetailedFeature, Testimonial, PricingPlan } from '@/app/types/landing-page';

export const landingPageData = {
  hero: {
    title: "Boost Your MCAT CARS Score with 528Prep",
    subtitle: "Simply The Best - Representative, Rigorous, with Proven Strategies",
    primaryCTA: {
      text: "Free 3-Day Trial",
      href: "/authentication/signup?trial=true",
    },
    secondaryCTA: {
      text: "Buy Now",
      href: "/authentication/signup?buy=true",
    },
    imagePlaceholder: "Hero Image: Students studying with focused determination",
  },
  features: [
    {
      title: "Unmatched Adaptive Practice",
      description: "Your time is valuable, and so is your unique learning style. Our platform adapts to focus on exactly where you need improvement. Missed the main idea? Struggling with tone? With 550+ passages, we will hone in on your unique needs, turning weaknesses into strengths, with adaptive practice passages.",
      icon: <BsLightningCharge className="w-6 h-6" />,
      image: "/images/qbank-dashboard.png",
    },
    {
      title: "No Gimmicks, Just Results",
      description: "Ditch the acronyms and complex strategies. Our course keeps it simple and impactful, focusing on essential skills in a structured, step-by-step approach that steadily builds your CARS performance.",
      icon: <BsBarChart className="w-6 h-6" />,
      image: "/images/simplified-roadmap.png",
    },
    {
      title: "Active Learning + AI Insight",
      description: "Forget passive practice. Our AI-guided SkillDrills put you in control. Get live, personalized feedback on key CARS skills like tone, main ideas, and support - just like having your own tutor.",
      icon: <BsChatDots className="w-6 h-6" />,
      image: "/images/ai-insights.png",
    },
  ] as Feature[],
  detailedFeatures: [
    {
      icon: <FaRegCalendarAlt className="w-6 h-6" />,
      title: "Custom Study Scheduling",
      description: "Our automated study scheduler customizes your study plan to fit your timeline and goals.",
    },
    {
      icon: <FaVideo className="w-6 h-6" />,
      title: "Engaging Videos",
      description: "Access engaging videos to reinforce your understanding.",
    },
    {
      icon: <FaChartLine className="w-6 h-6" />,
      title: "Detailed Analytics",
      description: "Get detailed analytics on your progress, areas for improvement, and performance by CARS skills and passage type.",
    },
    {
      icon: <FaRobot className="w-6 h-6" />,
      title: "AI-Powered Tutor",
      description: "Our AI-powered tutor walks you through each question, helping you understand the explanations step-by-step.",
    },
    {
      icon: <FaBookOpen className="w-6 h-6" />,
      title: "Adaptive QBank",
      description: "With 550+ passages and 150+ SkillDrills, our QBank allows you to create custom practice sessions.",
    },
  ] as DetailedFeature[],
  stats: [
    {
      label: "Practice Passages",
      value: "550+",
      icon: <FaBookOpen className="w-6 h-6" />,
    },
    {
      label: "SkillDrills",
      value: "150+",
      icon: <BsLightningCharge className="w-6 h-6" />,
    },
    {
      label: "Average Score Improvement",
      value: "+4pts",
      icon: <BsBarChart className="w-6 h-6" />,
    },
    {
      label: "Student Success Rate",
      value: "94%",
      icon: <FaChartLine className="w-6 h-6" />,
    },
  ] as Stat[],
  pricingPlans: [
    {
      name: "Always Free",
      price: 0,
      features: [
        "Full Viewable Access (Premium Features Blurred)",
        "Access to Khan Academy CARS Passages",
        "3 AI-Tutor Messages Per Day",
      ],
    },
    {
      name: "Practice Passages",
      price: 49,
      features: [
        "Access to Khan Academy and 528Prep CARS Passages",
        "3 AI-Tutor Messages Per Day",
        "Basic Analytics",
      ],
    },
    {
      name: "Practice with AI",
      price: 99,
      featured: true,
      features: [
        "Full Access to 528Prep CARS Passages",
        "Unlimited AI-Tutor Messages",
        "Advanced Analytics",
        "Custom Study Plans",
      ],
    },
    {
      name: "Practice and Strategy",
      price: 149,
      features: [
        "Everything in Practice with AI",
        "1-on-1 Strategy Sessions",
        "Premium Study Materials",
        "Priority Support",
      ],
    },
  ] as PricingPlan[],
  testimonials: [
    {
      name: "Sarah L",
      achievement: "CARS Score: 130",
      quote: "The AI tutor was like having a personal CARS coach available 24/7. It helped me identify patterns in my mistakes that I never noticed before.",
      avatar: "/images/testimonials/sarah.jpg",
    },
    {
      name: "Michael R",
      achievement: "CARS Score: 129",
      quote: "528Prep is refreshingly straightforward. No complicated methods, just clear strategies that actually work.",
      avatar: "/images/testimonials/michael.jpg",
    },
    {
      name: "Priya K",
      achievement: "CARS Score: 131",
      quote: "The adaptive practice feature is a game-changer. It helped me focus on my weak areas and saw my score jump 4 points in just weeks",
      avatar: "/images/testimonials/priya.jpg",
    },
  ] as Testimonial[],
}; 