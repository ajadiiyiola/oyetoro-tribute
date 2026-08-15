'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { BACKGROUND_MUSIC } from './media-map';

const BASE_VOLUME = 0.55;
const DUCK_VOLUME = 0.08;
const FADE_STEP_MS = 40;

type MusicContextValue = {
  isMuted: boolean;
  isReady: boolean;
  toggleMute: () => void;
  begin: () => void;
  duck: () => void;
  unduck: () => void;
  fadeOutFinal: () => void;
};

const MusicContext = createContext<MusicContextValue | null>(null);

function fadeTo(audio: HTMLAudioElement, target: number, ms: number) {
  const start = audio.volume;
  const steps = Math.max(1, Math.round(ms / FADE_STEP_MS));
  const delta = (target - start) / steps;
  let step = 0;
  const interval = setInterval(() => {
    step += 1;
    const next = start + delta * step;
    audio.volume = Math.min(1, Math.max(0, next));
    if (step >= steps) {
      audio.volume = target;
      clearInterval(interval);
    }
  }, FADE_STEP_MS);
}

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const duckCountRef = useRef(0);

  useEffect(() => {
    const audio = new Audio(BACKGROUND_MUSIC.src);
    audio.loop = true;
    audio.preload = 'auto';
    audio.load();
    audio.volume = 0;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const begin = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || isReady) return;
    audio.preload = 'auto';
    audio.muted = isMuted;
    const playPromise = audio.play();
    if (playPromise) {
      playPromise
        .then(() => {
          setIsReady(true);
          if (!isMuted) fadeTo(audio, BASE_VOLUME, 1400);
        })
        .catch(() => {
          // Autoplay was blocked. Keep isReady false so a later
          // user interaction can retry playback.
          setIsReady(false);
        });
    }
  }, [isMuted, isReady]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsMuted((prev) => {
      const next = !prev;
      if (audio.paused) {
        audio.muted = next;
        audio.play().catch(() => {});
      }
      if (next) {
        fadeTo(audio, 0, 400);
      } else {
        audio.muted = false;
        fadeTo(audio, BASE_VOLUME, 400);
      }
      return next;
    });
  }, []);

  const duck = useCallback(() => {
    const audio = audioRef.current;
    duckCountRef.current += 1;
    if (!audio || isMuted) return;
    fadeTo(audio, DUCK_VOLUME, 500);
  }, [isMuted]);

  const unduck = useCallback(() => {
    const audio = audioRef.current;
    duckCountRef.current = Math.max(0, duckCountRef.current - 1);
    if (!audio || isMuted) return;
    if (duckCountRef.current === 0) {
      fadeTo(audio, BASE_VOLUME, 800);
    }
  }, [isMuted]);

  const fadeOutFinal = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(audio, 0, 4000);
  }, []);

  return (
    <MusicContext.Provider
      value={{ isMuted, isReady, toggleMute, begin, duck, unduck, fadeOutFinal }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error('useMusic must be used within MusicProvider');
  return ctx;
}
