import React from 'react';
import Card, { CardProps } from './Card';

export interface DashboardCardProps extends Omit<CardProps, 'padding'> {
  title?: string;
  description?: string;
  headerAction?: React.ReactNode;
  contentClassName?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  headerAction,
  children,
  contentClassName = '',
  ...cardProps
}) => {
  return (
    <Card {...cardProps} padding="none">
      {(title || description || headerAction) && (
        <div className="flex flex-col md:flex-row md:items-center justify-between p-4 border-b border-gray-100">
          <div>
            {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
          </div>
          {headerAction && <div className="mt-4 md:mt-0">{headerAction}</div>}
        </div>
      )}
      <div className={`p-4 ${contentClassName}`}>{children}</div>
    </Card>
  );
};

export default DashboardCard; 