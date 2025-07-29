import React, { useState, useRef, useEffect } from 'react';
import { Answers } from '../../types';
import { Play, Pause } from 'lucide-react';

interface Step3ContentProps {
  answers: Answers;
  onUpdateAnswer: (questionId: string, value: string) => void;
  onDownload: () => void;
  isTutorialActive: boolean;
}

interface AnswerItemProps {
  qId: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
  audioSrc: string;
  isTutorialActive: boolean;
}

const AnswerItem: React.FC<AnswerItemProps> = ({ qId, label, placeholder, value, onChange, isTextarea, audioSrc, isTutorialActive }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const localStorageKey = `question_audio_played_${qId}`;

  useEffect(() => {
    const currentAudio = audioRef.current;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlayThrough = () => {
      setIsReady(true);
    };

    if (currentAudio) {
      currentAudio.addEventListener('ended', handleEnded);
      currentAudio.addEventListener('play', handlePlay);
      currentAudio.addEventListener('pause', handlePause);
      currentAudio.addEventListener('canplaythrough', handleCanPlayThrough);
      
      // Reset state when audioSrc changes
      setIsPlaying(false);
      setIsReady(false);
      currentAudio.load(); // Explicitly load the new source
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('ended', handleEnded);
        currentAudio.removeEventListener('play', handlePlay);
        currentAudio.removeEventListener('pause', handlePause);
        currentAudio.removeEventListener('canplaythrough', handleCanPlayThrough);
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error(`Error playing audio for ${qId}:`, error);
        });
      }
    }
  };

  const handleInputFocus = () => {
    if (audioRef.current && !isTutorialActive) {
      const hasPlayed = localStorage.getItem(localStorageKey) === 'true';
      if (!hasPlayed) {
        audioRef.current.play().then(() => {
          localStorage.setItem(localStorageKey, 'true');
        }).catch(error => {
          console.warn(`Autoplay prevented for ${qId} on focus:`, error);
        });
      }
    }
  };

  return (
    <div className="bg-gray-700 p-4 mb-4 border-l-4 border-blue-600">
      <div className="flex items-center mb-3">
        <button
          onClick={togglePlayPause}
          className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200 mr-3 flex-shrink-0"
          aria-label={isPlaying ? "Пауза" : "Відтворити"}
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <label htmlFor={qId} className="font-bold text-gray-300 cursor-pointer flex-grow">{label}</label>
      </div>
      {isTextarea ? (
        <textarea
          id={qId}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleInputFocus}
          className="w-full bg-gray-900 border-2 border-gray-600 text-white p-2.5 font-sans text-base min-h-[80px] resize-y focus:border-purple-500 focus:ring-purple-500 outline-none"
        />
      ) : (
        <input
          type="text"
          id={qId}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleInputFocus}
          className="w-full bg-gray-900 border-2 border-gray-600 text-white p-2.5 font-sans text-base focus:border-purple-500 focus:ring-purple-500 outline-none"
        />
      )}
      <audio ref={audioRef} src={audioSrc} preload="auto" />
    </div>
  );
};

const Step3Content: React.FC<Step3ContentProps> = ({ answers, onUpdateAnswer, onDownload, isTutorialActive }) => {
  const [showHint, setShowHint] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdateAnswer(e.target.id, e.target.value);
  };

  return (
    <div>
      <div className="flex justify-center mb-6">
        <img src="/ezgif-114884ef5a0190.gif" alt="Keep going" className="w-16 h-auto rounded-lg shadow-lg" />
      </div>
      <p className="text-lg leading-relaxed text-gray-400 mb-5 border-l-4 border-purple-600 pl-4">
        Чудова робота! Ти зібрав усі докази. Тепер час заповнити звіт детектива. Дай відповіді на питання нижче, щоб описати мультик, який ти "почув". Коли закінчиш, натисни кнопку "Завантажити звіт" внизу сторінки.
      </p>
      <button 
        onClick={() => setShowHint(!showHint)}
        className="bg-none border border-yellow-400 text-yellow-400 py-2 px-4 cursor-pointer font-bold transition-all duration-200 ease-in-out hover:bg-yellow-400 hover:text-gray-900 animate-pulse-yellow hover:animate-none mt-5"
      >
        💡 {showHint ? 'Сховати приклад' : 'Показати повний приклад'}
      </button>

      {showHint && (
        <div className="mt-4 p-5 bg-[#233a28] border border-green-600">
          <div className="mb-3"><strong>1. Назва:</strong><p className="mt-1 pl-4 border-l-3 border-green-600 text-green-200 italic">Мультфільм про пригоди піратів.</p></div>
          <div className="mb-3"><strong>2. Звуки:</strong><p className="mt-1 pl-4 border-l-3 border-green-600 text-green-200 italic">Я почув шум моря, крики чайок, скрип дерев'яного корабля, голоси піратів, дзвін монет та веселу піратську пісню.</p></div>
          <div className="mb-3"><strong>3. Емоції:</strong><p className="mt-1 pl-4 border-l-3 border-green-600 text-green-200 italic">Було захоплююче, особливо коли грала бойова музика.</p></div>
          <div className="mb-3"><strong>4. Допомога:</strong><p className="mt-1 pl-4 border-l-3 border-green-600 text-green-200 italic">Шум моря і скрип корабля допомогли уявити, що я на справжньому судні. Дзвін монет підказав, що вони знайшли скарби.</p></div>
          <div><strong>5. Найкращий звук:</strong><p className="mt-1 pl-4 border-l-3 border-green-600 text-green-200 italic">Крик чайки, бо він нагадав мені про море.</p></div>
        </div>
      )}

      <div className="mt-5">
        <AnswerItem qId="q1" label="1. 📝 Вкажи назву мультфільму та посилання (якщо є):" placeholder="Наприклад: Мультфільм про смішного кота" value={answers.q1} onChange={handleChange} audioSrc="/audio/question_1.mp3" isTutorialActive={isTutorialActive} />
        <AnswerItem qId="q2" label="2. 🔊 Які звуки ти почув? (перелічи якомога більше)" placeholder="Наприклад: сміх, кроки, музика, спів пташок, шум вітру..." value={answers.q2} onChange={handleChange} isTextarea audioSrc="/audio/question_2.mp3" isTutorialActive={isTutorialActive} />
        <AnswerItem qId="q3" label="3. 😊 Які емоції викликали ці звуки?" placeholder="Наприклад: мені було весело, коли..., або трохи сумно, тому що..." value={answers.q3} onChange={handleChange} audioSrc="/audio/question_3.mp3" isTutorialActive={isTutorialActive} />
        <AnswerItem qId="q4" label="4. 📖 Як звуки допомагали зрозуміти, що відбувається?" placeholder="Наприклад: гучна музика означала, що зараз щось станеться..." value={answers.q4} onChange={handleChange} isTextarea audioSrc="/audio/question_4.mp3" isTutorialActive={isTutorialActive} />
        <AnswerItem qId="q5" label="5. ⭐ Який звук тобі сподобався найбільше і чому?" placeholder="Наприклад: звук дощу, бо він мене заспокоює." value={answers.q5} onChange={handleChange} isTextarea audioSrc="/audio/question_5.mp3" isTutorialActive={isTutorialActive} />
      </div>

      <button
        onClick={onDownload}
        className="bg-green-600 text-white border-none py-4 px-5 cursor-pointer text-lg font-bold block w-full mt-6 transition-colors duration-200 hover:bg-green-700"
      >
        💾 Завантажити звіт (.txt)
      </button>
    </div>
  );
};

export default Step3Content;