import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
}) => {
  const baseClasses = 'bg-white rounded-lg shadow-md border border-gray-200';
  const clickableClasses = onClick ? 'cursor-pointer hover:shadow-lg transition-shadow duration-200' : '';

  return (
    <div
      className={`${baseClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
