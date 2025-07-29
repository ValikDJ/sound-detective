import React from 'react';

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CompletionModal: React.FC<CompletionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] transition-opacity duration-300">
      <div className="bg-gray-800 p-8 border-2 border-green-600 text-center w-11/12 max-w-md">
        <h3 className="text-green-400 text-xl font-bold mb-4">Вітаємо, Ультра-Детективе! 🎉</h3>
        <p className="mb-6">
          Ти успішно завершив(ла) всі кроки "Звукового Детектива" та завантажив(ла) свій звіт!
          Чудова робота!
        </p>
        <button onClick={onClose} className="py-2 px-5 border-none text-white font-bold cursor-pointer bg-blue-600 hover:bg-blue-700">
          Закрити
        </button>
      </div>
    </div>
  );
};

export default CompletionModal;