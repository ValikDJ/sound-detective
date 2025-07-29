import React from 'react';
import { Answers } from '../types';
import Step1Content from './steps/Step1Content';
import Step2Content from './steps/Step2Content';
import Step3Content from './steps/Step3Content';
import Step4Content from './steps/Step4Content';
import AudioPlayer from './AudioPlayer';

interface ModalProps {
  activeStep: number | null;
  onClose: () => void;
  onNavigate: (step: number) => void;
  answers: Answers;
  onUpdateAnswer: (questionId: string, value: string) => void;
  onDownload: () => void;
  isTutorialActive: boolean; 
}

const STEPS_CONFIG = [
  { id: 1, title: "📺 Крок 1: Перегляд", component: <Step1Content /> },
  { id: 2, title: "👂 Крок 2: Прослуховування", component: <Step2Content /> },
  { id: 3, title: "✍️ Крок 3: Анкета детектива" },
  { id: 4, title: "📤 Крок 4: Завантаження звіту", component: <Step4Content /> }
];

const AUDIO_CONFIG: { [key: number]: { src: string; localStorageKey: string; title: string } } = {
  1: { src: "/audio/krok1.mp3", localStorageKey: "krok1_audio_played_auto", title: "Аудіо для Кроку 1" },
  2: { src: "/audio/krok2.mp3", localStorageKey: "krok2_audio_played_auto", title: "Аудіо для Кроку 2" },
  3: { src: "/audio/krok3.mp3", localStorageKey: "krok3_audio_played_auto", title: "Аудіо для Кроку 3" },
  4: { src: "/audio/krok4.mp3", localStorageKey: "krok4_audio_played_auto", title: "Аудіо для Кроку 4" },
};

const Modal: React.FC<ModalProps> = ({ activeStep, onClose, onNavigate, answers, onUpdateAnswer, onDownload, isTutorialActive }) => {
  if (activeStep === null) return null;

  const currentStepConfig = STEPS_CONFIG.find(s => s.id === activeStep);
  const title = currentStepConfig?.title || '';
  const currentAudio = AUDIO_CONFIG[activeStep];

  const renderContent = () => {
    switch (activeStep) {
      case 1: return <Step1Content />;
      case 2: return <Step2Content />;
      case 3: return <Step3Content answers={answers} onUpdateAnswer={onUpdateAnswer} onDownload={onDownload} />;
      case 4: return <Step4Content />;
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-gray-800 w-11/12 max-w-3xl max-h-[90vh] border-4 border-purple-600 flex flex-col transition-transform duration-300 scale-100">
        <div className="p-4 bg-purple-600 flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-black uppercase">{title}</h2>
          <button onClick={onClose} className="bg-none border-none text-white text-4xl font-bold cursor-pointer leading-none">&times;</button>
        </div>
        
        <div className="flex border-b-2 border-gray-700 flex-shrink-0" data-tutorial="step-3">
          {[1, 2, 3, 4].map(stepNum => (
            <button 
              key={stepNum} 
              onClick={() => onNavigate(stepNum)}
              className={`flex-1 p-4 bg-gray-800 border-none font-bold text-base cursor-pointer border-b-4 transition-all duration-200 ease-in-out ${activeStep === stepNum ? 'text-white border-yellow-400' : 'text-gray-400 border-transparent hover:bg-gray-700'}`}
            >
              Крок {stepNum}
            </button>
          ))}
        </div>

        <div className="p-6 overflow-y-auto flex-grow">
          {renderContent()}
        </div>

        <div className="p-4 bg-gray-700 flex justify-between items-center flex-shrink-0">
          <button 
            onClick={() => onNavigate(activeStep - 1)} 
            disabled={activeStep === 1}
            className="bg-blue-600 text-white border-none py-3 px-6 cursor-pointer text-base font-bold uppercase transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Назад
          </button>
          {currentAudio && (
            <AudioPlayer
              src={currentAudio.src}
              localStorageKey={currentAudio.localStorageKey}
              title={currentAudio.title}
              isSmallAndCentered={true}
              isTutorialActive={isTutorialActive} 
            />
          )}
          <button 
            onClick={() => onNavigate(activeStep + 1)}
            disabled={activeStep === 4}
            className="bg-blue-600 text-white border-none py-3 px-6 cursor-pointer text-base font-bold uppercase transition-colors duration-200 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            Далі
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;