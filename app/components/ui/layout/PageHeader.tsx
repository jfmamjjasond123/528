import React from 'react';

export interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon,
  actions,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-sm p-6 mb-8 ${className}`}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center">
          {icon && (
            <div className="p-3 bg-blue-100 rounded-lg mr-4">
              <div className="w-7 h-7 text-blue-700">{icon}</div>
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {description && <p className="text-gray-600">{description}</p>}
          </div>
        </div>
        {actions && <div className="mt-4 md:mt-0 flex items-center gap-4">{actions}</div>}
      </div>
    </div>
  );
};

export default PageHeader; 