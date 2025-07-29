import React from 'react';
import { getAssetPath } from '@utils/assetPath'; // Імпортуємо утиліту через псевдонім

const Step4Content: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center mb-6">
        <img src={getAssetPath("/ezgif-12484b51c5c8be.gif")} alt="Uploading file" className="w-16 h-auto rounded-lg shadow-lg" />
      </div>
      <p className="text-lg leading-relaxed text-gray-400 mb-5 border-l-4 border-purple-600 pl-4">
        Ти майже біля мети! Залишився останній крок. Тепер тобі потрібно завантажити файл <strong>sound-detective-answers.txt</strong>, який ти зберіг, на платформу Logika.
      </p>
      <div className="bg-gray-700 border-2 border-blue-600 p-5 mt-5 text-center">
        <p>Завантаж свій файл у розділ:</p>
        <p className="font-bold text-yellow-400 mt-2">
          .ТИЖДЕНЬ 1. АНІМАЦІЯ &rarr; урок 4 &rarr; Скарбничка результатів
        </p>
      </div>
    </div>
  );
};

export default Step4Content;