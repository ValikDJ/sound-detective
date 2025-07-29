import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  localStorageKey: string;
  title: string;
  isSmallAndCentered?: boolean;
  isTutorialActive?: boolean;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, localStorageKey, title, isSmallAndCentered = false, isTutorialActive = false }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false); // Новий стан для відстеження готовності аудіо

  useEffect(() => {
    const currentAudio = audioRef.current;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlayThrough = () => {
      setIsReady(true); // Аудіо готове до відтворення
      const hasPlayedAutomatically = localStorage.getItem(localStorageKey) === 'true';
      console.log(`AudioPlayer: ${title} - onCanPlayThrough. hasPlayedAutomatically: ${hasPlayedAutomatically}, isTutorialActive: ${isTutorialActive}`);

      // Спроба автозапуску лише якщо не відтворювалося автоматично раніше І туторіал не активний
      if (!hasPlayedAutomatically && !isTutorialActive) {
        console.log(`AudioPlayer: Attempting to autoplay ${src} on canplaythrough.`);
        currentAudio?.play().then(() => {
          setIsPlaying(true);
          localStorage.setItem(localStorageKey, 'true');
          console.log(`AudioPlayer: Successfully autoplayed ${src}.`);
        }).catch(error => {
          console.warn(`AudioPlayer: Autoplay prevented for ${src} (onCanPlayThrough):`, error);
          setIsPlaying(false);
        });
      }
    };

    if (currentAudio) {
      currentAudio.addEventListener('ended', handleEnded);
      currentAudio.addEventListener('play', handlePlay);
      currentAudio.addEventListener('pause', handlePause);
      currentAudio.addEventListener('canplaythrough', handleCanPlayThrough); // Додаємо слухач для події готовності
    }

    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('ended', handleEnded);
        currentAudio.removeEventListener('play', handlePlay);
        currentAudio.removeEventListener('pause', handlePause);
        currentAudio.removeEventListener('canplaythrough', handleCanPlayThrough);
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setIsReady(false); // Скидаємо стан готовності при розмонтуванні
      }
    };
  }, [src, localStorageKey, title, isTutorialActive]); // Залежності

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Відтворюємо лише якщо аудіо готове
        if (isReady) {
          audioRef.current.play().catch(error => {
            console.error("Error playing audio (manual click):", error);
          });
        } else {
          console.warn("Audio not ready to play yet.");
        }
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
          disabled={!isReady} // Вимикаємо кнопку, якщо аудіо не готове
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
        disabled={!isReady} // Вимикаємо кнопку, якщо аудіо не готове
      >
        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
      <span className="text-lg font-bold text-gray-300">
        {title}: {isPlaying ? "Відтворюється..." : (isReady ? "Натисніть, щоб відтворити" : "Завантаження...")}
      </span>
      <audio ref={audioRef} src={src} preload="auto" />
    </div>
  );
};

export default AudioPlayer;