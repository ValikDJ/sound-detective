import React, { useState } from 'react';
import { Answers } from '../../types';

interface Step3ContentProps {
  answers: Answers;
  onUpdateAnswer: (questionId: string, value: string) => void;
  onDownload: () => void;
}

const AnswerItem: React.FC<{
  qId: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  isTextarea?: boolean;
}> = ({ qId, label, placeholder, value, onChange, isTextarea }) => (
  <div className="bg-gray-700 p-4 mb-4 border-l-4 border-blue-600">
    <div className="flex items-center mb-3">
      <input type="checkbox" id={`check_${qId}`} className="w-5 h-5 mr-3 cursor-pointer accent-purple-500" />
      <label htmlFor={qId} className="font-bold text-gray-300 cursor-pointer">{label}</label>
    </div>
    {isTextarea ? (
      <textarea id={qId} placeholder={placeholder} value={value} onChange={onChange} className="w-full bg-gray-900 border-2 border-gray-600 text-white p-2.5 font-sans text-base min-h-[80px] resize-y focus:border-purple-500 focus:ring-purple-500 outline-none" />
    ) : (
      <input type="text" id={qId} placeholder={placeholder} value={value} onChange={onChange} className="w-full bg-gray-900 border-2 border-gray-600 text-white p-2.5 font-sans text-base focus:border-purple-500 focus:ring-purple-500 outline-none" />
    )}
  </div>
);

const Step3Content: React.FC<Step3ContentProps> = ({ answers, onUpdateAnswer, onDownload }) => {
  const [showHint, setShowHint] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onUpdateAnswer(e.target.id, e.target.value);
  };

  return (
    <div>
      <p className="text-lg leading-relaxed text-gray-400 mb-5 border-l-4 border-purple-600 pl-4">
        Чудова робота! Ти зібрав усі докази. Тепер час заповнити звіт детектива. Дай відповіді на питання нижче, щоб описати мультик, який ти "почув".
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
        <AnswerItem qId="q1" label="1. 📝 Вкажи назву мультфільму та посилання (якщо є):" placeholder="Наприклад: Мультфільм про смішного кота" value={answers.q1} onChange={handleChange} />
        <AnswerItem qId="q2" label="2. 🔊 Які звуки ти почув? (перелічи якомога більше)" placeholder="Наприклад: сміх, кроки, музика, спів пташок, шум вітру..." value={answers.q2} onChange={handleChange} isTextarea />
        <AnswerItem qId="q3" label="3. 😊 Які емоції викликали ці звуки?" placeholder="Наприклад: мені було весело, коли..., або трохи сумно, тому що..." value={answers.q3} onChange={handleChange} />
        <AnswerItem qId="q4" label="4. 📖 Як звуки допомагали зрозуміти, що відбувається?" placeholder="Наприклад: гучна музика означала, що зараз щось станеться..." value={answers.q4} onChange={handleChange} isTextarea />
        <AnswerItem qId="q5" label="5. ⭐ Який звук тобі сподобався найбільше і чому?" placeholder="Наприклад: звук дощу, бо він мене заспокоює." value={answers.q5} onChange={handleChange} isTextarea />
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