import React from 'react';

interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  className?: string;
}

export const SectionHeader = ({ 
  icon: Icon, 
  title,
  className = ''
}: SectionHeaderProps) => {
  return (
    <div className={`flex items-center mb-4 ${className}`}>
      <Icon className="h-5 w-5 text-purple-400 mr-2" />
      <h3 className="text-base font-medium text-gray-300">{title}</h3>
      <div className="ml-3 h-px flex-1 bg-gray-700"></div>
    </div>
  );
};
