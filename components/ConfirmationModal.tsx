
import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  missedPoints: number[];
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, missedPoints, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] transition-opacity duration-300">
      <div className="bg-gray-800 p-8 border-2 border-red-600 text-center w-11/12 max-w-md">
        <h3 className="text-yellow-400 text-xl font-bold mb-4">Увага!</h3>
        <p className="mb-5">
          Схоже, ти пропустив(ла) відповіді на пункти: <strong className="text-white">{missedPoints.join(', ')}</strong>.
        </p>
        <p className="mb-6">Дійсно хочеш завантажити звіт без них?</p>
        <div className="flex justify-center gap-5">
          <button onClick={onCancel} className="py-2 px-5 border-none text-white font-bold cursor-pointer bg-gray-700 hover:bg-gray-600">
            Ні, повернутись
          </button>
          <button onClick={onConfirm} className="py-2 px-5 border-none text-white font-bold cursor-pointer bg-red-600 hover:bg-red-700">
            Так, завантажити
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
