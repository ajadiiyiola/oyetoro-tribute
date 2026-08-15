'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { useMusic } from '@/lib/MusicContext';

type VideoFeatureProps = {
  src: string;
  poster?: string;
  label: string;
  tone?: 'cinematic' | 'playful';
};

export function VideoFeature({ src, poster, label, tone = 'cinematic' }: VideoFeatureProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { amount: 0.6, once: false });
  const { duck, unduck } = useMusic();
  const [videoMuted, setVideoMuted] = useState(true);
  const wasPlayingRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.play().catch(() => {});
      if (!wasPlayingRef.current) {
        duck();
        wasPlayingRef.current = true;
      }
    } else {
      video.pause();
      if (wasPlayingRef.current) {
        unduck();
        wasPlayingRef.current = false;
      }
    }
  }, [inView, duck, unduck]);

  useEffect(() => {
    return () => {
      if (wasPlayingRef.current) unduck();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleVideoAudio = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setVideoMuted(video.muted);
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden ${
          tone === 'cinematic' ? 'aspect-[16/10] md:aspect-[21/9]' : 'aspect-[4/5] md:aspect-video'
        }`}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={label}
          className="h-full w-full object-cover"
        />
        <button
          type="button"
          onClick={toggleVideoAudio}
          aria-label={videoMuted ? 'Unmute video' : 'Mute video'}
          className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-paper/40 bg-ink/30 text-paper backdrop-blur-sm transition-colors hover:border-paper/80 md:bottom-6 md:right-6"
        >
          <span aria-hidden="true" className="text-xs">
            {videoMuted ? '🔇' : '🔊'}
          </span>
        </button>
      </motion.div>
      <p className="eyebrow mt-4">{label}</p>
    </div>
  );
}
