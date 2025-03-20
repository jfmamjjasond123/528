import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Score Report',
  description: 'Detailed analysis of your exam performance',
};

export default function ScoreReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 