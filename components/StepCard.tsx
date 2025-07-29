
import React from 'react';

interface StepCardProps {
  emoji: string;
  title: string;
  description: string;
  isCompleted: boolean;
  onClick: () => void;
}

const StepCard: React.FC<StepCardProps> = ({ emoji, title, description, isCompleted, onClick }) => {
  const completedClass = isCompleted ? 'border-green-600' : 'border-gray-600';

  return (
    <div 
      className={`bg-gray-700 p-5 text-center cursor-pointer transition-all duration-200 ease-in-out transform hover:-translate-y-1 hover:bg-gray-600 border-2 ${completedClass}`}
      onClick={onClick}
    >
      <div className="text-4xl mb-3">{emoji}</div>
      <div className="text-lg font-black uppercase mb-1">{title}</div>
      <div className="text-sm text-gray-400 leading-snug">{description}</div>
    </div>
  );
};

export default StepCard;
