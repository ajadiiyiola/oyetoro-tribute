'use client';

import { useMusic } from '@/lib/MusicContext';

export function MusicController() {
  const { isMuted, toggleMute } = useMusic();

  return (
    <button
      type="button"
      onClick={toggleMute}
      aria-pressed={!isMuted}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      className="group flex h-9 w-9 items-center justify-center rounded-full border border-wine/25 bg-paper/70 text-wine backdrop-blur-sm transition-colors hover:border-wine/50"
    >
      <span className="flex h-3.5 items-end gap-[3px]" aria-hidden="true">
        {[0, 1, 2].map((bar) => (
          <span
            key={bar}
            className={`w-[2.5px] rounded-full bg-wine transition-opacity ${
              isMuted ? 'opacity-30' : 'opacity-100 animate-soundbar'
            }`}
            style={{
              height: '4px',
              animationDelay: `${bar * 0.15}s`,
            }}
          />
        ))}
      </span>
    </button>
  );
}
