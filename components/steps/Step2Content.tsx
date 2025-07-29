import React from 'react';
import { getAssetPath } from '@utils/assetPath'; // Імпортуємо утиліту через псевдонім

const Step2Content: React.FC = () => {
  return (
    <div>
      <div className="flex justify-center mb-6">
        <img src={getAssetPath("/ezgif-1e9909d7f22738.gif")} alt="Listening" className="w-16 h-auto rounded-lg shadow-lg" />
      </div>
      <p className="text-lg leading-relaxed text-gray-400 mb-5 border-l-4 border-purple-600 pl-4">
        Тепер починається робота справжнього детектива! Подивись той самий мультик ще раз, але цього разу закрий очі та уважно слухай. Твоє завдання — почути якомога більше різних звуків.
      </p>
      <p className="text-gray-300 mt-4">
        Звертай увагу на все: голоси героїв, музичний фон, кроки, сміх, скрип дверей, шум вітру та інші дрібні деталі.
      </p>
    </div>
  );
};

export default Step2Content;