'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type VoiceNoteCardProps = {
  src: string;
  label: string;
  note: string;
  rotate?: string;
};

const SPEEDS = [1, 1.25, 1.5, 2];

export function VoiceNoteCard({
  src,
  label,
  note,
  rotate = '-1deg',
}: VoiceNoteCardProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const onEnded = () => {
      setPlaying(false);
      setCurrent(0);
    };
    const onOtherAudio = (event: Event) => {
      const target = (event as CustomEvent<HTMLAudioElement>).detail;
      if (target !== audio) {
        audio.pause();
        setPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);
    window.addEventListener('oyetoro-audio-play', onOtherAudio);

    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
      window.removeEventListener('oyetoro-audio-play', onOtherAudio);
    };
  }, []);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      window.dispatchEvent(new CustomEvent('oyetoro-audio-play', { detail: audio }));
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  const changeSpeed = () => {
    const next = SPEEDS[(SPEEDS.indexOf(speed) + 1) % SPEEDS.length];
    setSpeed(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  };

  const seek = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setCurrent(value);
  };

  const formatTime = (value: number) => {
    if (!Number.isFinite(value)) return '0:00';
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, rotate: rotate }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.8 }}
      className="scrapbook-card relative mx-auto max-w-xl p-6 md:p-8"
    >
      <span className="scrapbook-tape -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]" />

      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="relative z-10 flex items-start gap-4">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-scrapbook-rose text-paper shadow-sm transition-transform hover:scale-105"
        >
          <span className="text-lg">{playing ? 'Ⅱ' : '▶'}</span>
        </button>

        <div className="min-w-0 flex-1">
          <p className="handwritten text-2xl text-scrapbook-berry md:text-3xl">
            {label}
          </p>
          <p className="mt-1 font-sans text-xs text-scrapbook-cocoa/65 md:text-sm">
            {note}
          </p>

          <div className="mt-5">
            <input
              aria-label={`${label} progress`}
              type="range"
              min={0}
              max={duration || 0}
              step={0.1}
              value={Math.min(current, duration || 0)}
              onChange={(e) => seek(Number(e.target.value))}
              className="voice-note-range w-full cursor-pointer"
            />
            <div className="mt-1 flex justify-between font-sans text-[10px] tabular-nums text-scrapbook-cocoa/55">
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-5 flex justify-end">
        <button
          type="button"
          onClick={changeSpeed}
          className="rounded-full border border-scrapbook-berry/20 bg-scrapbook-blush/45 px-3 py-1.5 font-sans text-[11px] font-medium text-scrapbook-berry transition-colors hover:bg-scrapbook-blush"
          aria-label={`Playback speed ${speed} times. Click to change.`}
        >
          {speed}×
        </button>
      </div>
    </motion.div>
  );
}
