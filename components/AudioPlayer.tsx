import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  localStorageKey: string;
  title: string;
  isSmallAndCentered?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, localStorageKey, title, isSmallAndCentered = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const hasPlayedAutomatically = localStorage.getItem(localStorageKey) === 'true';
    console.log(`AudioPlayer: ${title} - hasPlayedAutomatically: ${hasPlayedAutomatically}`);

    if (!hasPlayedAutomatically && audioRef.current) {
      console.log(`AudioPlayer: Attempting to play ${src}`);
      // Додаємо невелику затримку, щоб браузер краще розпізнав жест користувача
      setTimeout(() => {
        if (audioRef.current) { // Перевіряємо ref ще раз, оскільки компонент міг бути розмонтований
          audioRef.current.play().then(() => {
            setIsPlaying(true);
            localStorage.setItem(localStorageKey, 'true'); // Встановлюємо прапорець тільки при успішному відтворенні
            console.log(`AudioPlayer: Successfully played ${src}`);
          }).catch(error => {
            console.warn(`AudioPlayer: Autoplay prevented for ${src}:`, error);
            setIsPlaying(false);
            // Не встановлюємо прапорець у localStorage, якщо відтворення було заблоковано
          });
        }
      }, 0); // Затримка в 0 мс, щоб відкласти виконання до наступного циклу подій
    }

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.addEventListener('ended', handleEnded);
      currentAudio.addEventListener('play', handlePlay);
      currentAudio.addEventListener('pause', handlePause);
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('ended', handleEnded);
        currentAudio.removeEventListener('play', handlePlay);
        currentAudio.removeEventListener('pause', handlePause);
        currentAudio.pause();
        currentAudio.currentTime = 0; // Reset audio to start
      }
    };
  }, [src, localStorageKey, title]); // Додано title до залежностей для логування

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
    }
  };

  if (isSmallAndCentered) {
    return (
      <div className="flex justify-center items-center">
        <button
          onClick={togglePlayPause}
          className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
          aria-label={isPlaying ? "Пауза" : "Відтворити"}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <audio ref={audioRef} src={src} preload="auto" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 bg-gray-700 p-4 rounded-md border border-gray-600 mt-5">
      <button
        onClick={togglePlayPause}
        className="bg-blue-600 text-white p-3 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200"
        aria-label={isPlaying ? "Пауза" : "Відтворити"}
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <span className="text-lg font-bold text-gray-300">
        {title}: {isPlaying ? "Відтворюється..." : "Натисніть, щоб відтворити"}
      </span>
      <audio ref={audioRef} src={src} preload="auto" />
    </div>
  );
};

export default AudioPlayer;