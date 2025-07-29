
import React from 'react';

interface HelpButtonProps {
  onClick: () => void;
}

const HelpButton: React.FC<HelpButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 w-12 h-12 bg-blue-600 text-white border-none rounded-full text-2xl font-bold cursor-pointer z-40 flex items-center justify-center shadow-lg hover:bg-blue-700"
      aria-label="Start tutorial"
      data-tutorial="step-4"
    >
      ?
    </button>
  );
};

export default HelpButton;
