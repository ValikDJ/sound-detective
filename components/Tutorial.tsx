import React, { useState, useLayoutEffect } from 'react';
import { TutorialStep } from '../types';

interface TutorialProps {
  steps: TutorialStep[];
  currentStepIndex: number;
  onNavigate: (direction: number) => void;
  onSkip: () => void;
}

interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

const Tutorial: React.FC<TutorialProps> = ({ steps, currentStepIndex, onNavigate, onSkip }) => {
  const [spotlightPos, setSpotlightPos] = useState<Position | null>(null);
  const [tooltipPos, setTooltipPos] = useState<Position | null>(null);

  useLayoutEffect(() => {
    const step = steps[currentStepIndex];
    if (step.action) {
      step.action();
    }
  
    // Use a timeout to wait for potential DOM changes from the action
    const timer = setTimeout(() => {
      const targetElement = document.querySelector(step.selector);
      if (targetElement) {
        const rect = targetElement.getBoundingClientRect();
        
        // Spotlight position
        setSpotlightPos({
          top: rect.top - 5,
          left: rect.left - 5,
          width: rect.width + 10,
          height: rect.height + 10,
        });

        // Tooltip position
        const tooltipWidth = 300;
        const tooltipHeight = 150; // Estimate
        let ttTop = rect.bottom + 15;
        if (ttTop + tooltipHeight > window.innerHeight) {
          ttTop = rect.top - tooltipHeight - 15;
        }

        let ttLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
        if (ttLeft < 10) ttLeft = 10;
        if (ttLeft + tooltipWidth > window.innerWidth - 10) {
          ttLeft = window.innerWidth - tooltipWidth - 10;
        }

        setTooltipPos({
          top: ttTop,
          left: ttLeft,
          width: tooltipWidth,
          height: 0 // height is auto
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [currentStepIndex, steps]);

  const step = steps[currentStepIndex];

  return (
    <div className="fixed inset-0 z-[100]">
      {spotlightPos && (
        <div
          className="absolute rounded-md shadow-[0_0_0_9999px_rgba(0,0,0,0.7)] z-[101] transition-all duration-500 ease-in-out"
          style={{
            top: `${spotlightPos.top}px`,
            left: `${spotlightPos.left}px`,
            width: `${spotlightPos.width}px`,
            height: `${spotlightPos.height}px`,
          }}
        ></div>
      )}

      {tooltipPos && (
        <div
          className="absolute bg-gray-800 p-5 border-2 border-yellow-400 z-[102] transition-all duration-500 ease-in-out"
          style={{
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
            width: `${tooltipPos.width}px`,
          }}
        >
          <div className="mb-4 leading-relaxed">{step.text}</div>
          <div className="flex justify-between items-center">
            <button onClick={onSkip} className="bg-none border-none text-gray-400 cursor-pointer hover:text-white">
              Пропустити
            </button>
            <div className="flex items-center gap-2">
              {currentStepIndex > 0 && (
                <button onClick={() => onNavigate(-1)} className="bg-blue-600 text-white border-none py-2 px-4 cursor-pointer hover:bg-blue-700">
                  Назад
                </button>
              )}
              <button onClick={() => onNavigate(1)} className="bg-blue-600 text-white border-none py-2 px-4 cursor-pointer hover:bg-blue-700">
                {currentStepIndex === steps.length - 1 ? 'Завершити' : 'Далі'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutorial;