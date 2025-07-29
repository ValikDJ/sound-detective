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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const currentAudio = audioRef.current;

    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlayThrough = () => {
      setIsReady(true);
      const hasPlayedAutomatically = localStorage.getItem(localStorageKey) === 'true';

      if (!hasPlayedAutomatically && !isTutorialActive) {
        currentAudio?.play().then(() => {
          setIsPlaying(true);
          localStorage.setItem(localStorageKey, 'true');
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
      currentAudio.addEventListener('canplaythrough', handleCanPlayThrough);
      
      // Reset state when src changes (component re-renders with new audio)
      setIsPlaying(false);
      setIsReady(false); // Reset readiness for the new audio
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
  }, [src, localStorageKey, title, isTutorialActive]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio (manual click):", error);
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
        {title}: {isPlaying ? "Відтворюється..." : (isReady ? "Натисніть, щоб відтворити" : "Завантаження...")}
      </span>
      <audio ref={audioRef} src={src} preload="auto" />
    </div>
  );
};

export default AudioPlayer;