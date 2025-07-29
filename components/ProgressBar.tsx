
import React from 'react';

interface ProgressBarProps {
  completedCount: number;
  totalCount: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completedCount, totalCount }) => {
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <div className="p-5 md:px-7 bg-gray-800" data-tutorial="step-2">
      <div className="text-sm font-bold uppercase mb-2 text-gray-400">
        Прогрес: {completedCount} з {totalCount} ({Math.round(percentage)}%)
      </div>
      <div className="w-full h-5 bg-gray-700 border-2 border-gray-600">
        <div 
          className="h-full bg-green-600 transition-all duration-500 ease-in-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
