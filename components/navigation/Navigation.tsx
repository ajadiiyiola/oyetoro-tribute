'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SECTION_IDS } from '@/lib/media-map';
import { MusicController } from './MusicController';

const LINKS: { id: string; label: string }[] = [
  { id: SECTION_IDS.hero, label: 'Cover' },
  { id: SECTION_IDS.apology, label: 'A Letter From the Heart' },
  { id: SECTION_IDS.appreciation, label: 'A Letter of Appreciation' },
  { id: SECTION_IDS.memories, label: 'Memories' },
  { id: SECTION_IDS.family, label: 'Family' },
  { id: SECTION_IDS.travel, label: 'The Journey' },
  { id: SECTION_IDS.playful, label: 'A Lighter Moment' },
  { id: SECTION_IDS.prayer, label: 'The Prayer' },
  { id: SECTION_IDS.closing, label: 'With Love, Always' },
];

export function Navigation({ visible }: { visible: boolean }) {
  const [open, setOpen] = useState(false);

  const jumpTo = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <>
      <div className="fixed right-4 top-4 z-40 flex items-center gap-2 md:right-8 md:top-8">
        <MusicController />
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="site-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-wine/25 bg-paper/70 backdrop-blur-sm transition-colors hover:border-wine/50"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 5 : 0 }}
            className="block h-px w-4 bg-wine"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="block h-px w-4 bg-wine"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -5 : 0 }}
            className="block h-px w-4 bg-wine"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-30 flex items-center justify-center bg-wine-deep"
          >
            <ul className="flex w-full max-w-sm flex-col gap-1 px-8">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.5 }}
                  className="border-b border-paper/15"
                >
                  <button
                    type="button"
                    onClick={() => jumpTo(link.id)}
                    className="flex w-full items-baseline justify-between gap-4 py-4 text-left transition-colors"
                  >
                    <span className="font-serif text-xl italic text-paper transition-colors group-hover:text-champagne-soft sm:text-2xl">
                      {link.label}
                    </span>
                    <span className="shrink-0 font-sans text-[10px] tabular-nums tracking-widest2 text-paper/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
