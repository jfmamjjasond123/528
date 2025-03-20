import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Question Bank Score Report',
  description: 'Detailed analysis of your custom question bank exam performance',
};

export default function ScoreReportQBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 