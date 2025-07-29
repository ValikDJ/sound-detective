import React from 'react';
import AudioPlayer from '../AudioPlayer';

const Step2Content: React.FC = () => {
  return (
    <div>
      <p className="text-lg leading-relaxed text-gray-400 mb-5 border-l-4 border-purple-600 pl-4">
        Тепер починається робота справжнього детектива! Подивись той самий мультик ще раз, але цього разу закрий очі та уважно слухай. Твоє завдання — почути якомога більше різних звуків.
      </p>
      <AudioPlayer src="/audio/krok2.mp3" localStorageKey="krok2_audio_played_auto" title="Аудіо для Кроку 2" />
      <p className="text-gray-300 mt-4">
        Звертай увагу на все: голоси героїв, музичний фон, кроки, сміх, скрип дверей, шум вітру та інші дрібні деталі.
      </p>
    </div>
  );
};

export default Step2Content;