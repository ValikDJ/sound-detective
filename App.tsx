import React, { useState, useEffect, useCallback } from 'react';
import { Answers, TutorialStep } from './types';
import { TUTORIAL_STEPS } from './constants';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import StepCard from './components/StepCard';
import Modal from './components/Modal';
import ConfirmationModal from './components/ConfirmationModal';
import Tutorial from './components/Tutorial';
import HelpButton from './components/HelpButton';
import CompletionModal from './components/CompletionModal';

const App: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [answers, setAnswers] = useState<Answers>({
    q1: '', q2: '', q3: '', q4: '', q5: ''
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [missedPoints, setMissedPoints] = useState<number[]>([]);

  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStepIndex, setTutorialStepIndex] = useState(0);
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveStep(null);
        setShowConfirmation(false);
        setShowCompletionModal(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    if (!localStorage.getItem('tutorialSeen')) {
      setTimeout(() => startTutorial(), 500);
    }
  }, []);

  const handleShowStep = (step: number) => {
    setActiveStep(step);
    if (!completedSteps.has(step)) {
      setCompletedSteps(prev => new Set(prev).add(step));
    }
  };

  const handleCloseModal = () => setActiveStep(null);

  const handleUpdateAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const checkAnswersBeforeDownload = () => {
    const missed: number[] = [];
    for (let i = 1; i <= 5; i++) {
      if (!answers[`q${i}`] || answers[`q${i}`].trim() === '') {
        missed.push(i);
      }
    }

    if (missed.length > 0) {
      setMissedPoints(missed);
      setShowConfirmation(true);
    } else {
      proceedToDownload();
    }
  };

  const proceedToDownload = () => {
    const questions = [
      "1. Назва мультфільму та посилання:",
      "2. Які звуки я почув:",
      "3. Які емоції викликали ці звуки:",
      "4. Як звуки допомагали зрозуміти, що відбувається?",
      "5. Який звук тобі сподобався найбільше і чому?"
    ];
    let content = "Звіт звукового детектива:\n\n";
    for (let i = 1; i <= 5; i++) {
      const answer = answers[`q${i}`];
      content += `${questions[i-1]}\n${answer || "(не заповнено)"}\n\n`;
    }

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'sound-detective-answers.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setShowConfirmation(false);
    setShowCompletionModal(true);
  };
  
  const tutorialStepsWithActions: TutorialStep[] = [
    TUTORIAL_STEPS[0],
    TUTORIAL_STEPS[1],
    { ...TUTORIAL_STEPS[2], action: () => handleShowStep(1) },
    { ...TUTORIAL_STEPS[3], action: () => handleCloseModal() }
  ];

  const startTutorial = () => {
    setTutorialStepIndex(0);
    setShowTutorial(true);
  };
  
  const skipTutorial = useCallback(() => {
    setShowTutorial(false);
    handleCloseModal();
    localStorage.setItem('tutorialSeen', 'true');
  }, []);

  const navigateTutorial = (direction: number) => {
      const newStepIndex = tutorialStepIndex + direction;
      if (newStepIndex >= 0 && newStepIndex < tutorialStepsWithActions.length) {
          setTutorialStepIndex(newStepIndex);
      } else {
          skipTutorial();
      }
  };

  const stepCardsData = [
    { id: 1, emoji: '📺', title: 'Крок 1: Перегляд', desc: 'Обери та подивись улюблений мультфільм.' },
    { id: 2, emoji: '👂', title: 'Крок 2: Прослуховування', desc: 'Подивись мультик ще раз, але тепер із закритими очима.' },
    { id: 3, emoji: '✍️', title: 'Крок 3: Відповіді', desc: 'Заповни анкету про свої спостереження.' },
    { id: 4, emoji: '📤', title: 'Крок 4: Завантаження', desc: 'Здай готовий файл на платформу Logika.' }
  ];

  return (
    <div className="p-5">
      <div className="container max-w-4xl mx-auto bg-gray-800 border-2 border-gray-700">
        <Header />
        <ProgressBar completedCount={completedSteps.size} totalCount={4} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-7" data-tutorial="step-1">
          {stepCardsData.map(card => (
            <StepCard 
              key={card.id}
              emoji={card.emoji}
              title={card.title}
              description={card.desc}
              isCompleted={completedSteps.has(card.id)}
              onClick={() => handleShowStep(card.id)}
            />
          ))}
        </div>
      </div>

      <Modal 
        activeStep={activeStep}
        onClose={handleCloseModal}
        onNavigate={handleShowStep}
        answers={answers}
        onUpdateAnswer={handleUpdateAnswer}
        onDownload={checkAnswersBeforeDownload}
        isTutorialActive={showTutorial} 
      />

      <ConfirmationModal 
        isOpen={showConfirmation}
        missedPoints={missedPoints}
        onConfirm={proceedToDownload}
        onCancel={() => setShowConfirmation(false)}
      />

      {showTutorial && (
        <Tutorial 
          steps={tutorialStepsWithActions}
          currentStepIndex={tutorialStepIndex}
          onNavigate={navigateTutorial}
          onSkip={skipTutorial}
        />
      )}

      <HelpButton onClick={startTutorial} />

      <CompletionModal 
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
      />
    </div>
  );
};

export default App;