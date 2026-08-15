'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { HERO_IMAGE } from '@/lib/media-map';
import { useReducedMotion } from '@/lib/useReducedMotion';

const AUTO_OPEN_MS = 4800;

export function MagazineCover({ onOpen }: { onOpen: () => void }) {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reducedMotion = useReducedMotion();

  const open = () => {
    if (isOpening || isOpen) return;
    setIsOpening(true);
    onOpen();
    if (timerRef.current) clearTimeout(timerRef.current);
    // Let the curtain-wipe / dissolve play out before unmounting.
    window.setTimeout(() => setIsOpen(true), reducedMotion ? 50 : 1600);
  };

  useEffect(() => {
    timerRef.current = setTimeout(open, AUTO_OPEN_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? '' : 'hidden';
  }, [isOpen]);

  return (
    <AnimatePresence>
      {!isOpen && (
        <motion.button
          key="magazine-cover"
          type="button"
          aria-label="Open the magazine — Oyetoro Olajumoke Esther: The Story, The Memories, The Love"
          onClick={open}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex cursor-pointer flex-col overflow-hidden bg-wine-deep text-left"
        >
          {/* Masthead — the dominant editorial wordmark, Vogue-anatomy position */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full px-5 pt-7 md:px-12 md:pt-10"
          >
            <h1 className="text-center font-cover text-[16.5vw] leading-[0.86] tracking-tight text-paper sm:text-7xl md:text-8xl lg:text-9xl">
              OYETORO
              <br />
              OLAJUMOKE ESTHER
            </h1>

            <div className="mt-3 flex items-center justify-center gap-3 md:mt-4">
              <span className="h-px w-6 bg-champagne/70 md:w-10" />
              <p className="font-sans text-[9px] uppercase tracking-widest2 text-champagne-soft md:text-[11px]">
                The Story · The Memories · The Love
              </p>
              <span className="h-px w-6 bg-champagne/70 md:w-10" />
            </div>
          </motion.div>

          {/* Small cover lines, flanking — Vogue-style editorial furniture */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="relative z-10 flex w-full items-start justify-between px-5 pt-1 md:px-12"
          >
            <p className="max-w-[9rem] font-sans text-[9px] uppercase leading-relaxed tracking-widest2 text-paper/75 md:max-w-[12rem] md:text-[10px]">
              A Family
              <br />
              Publication
            </p>
            <p className="max-w-[9rem] text-right font-sans text-[9px] uppercase leading-relaxed tracking-widest2 text-paper/75 md:max-w-[12rem] md:text-[10px]">
              The Tribute
              <br />
              Issue
            </p>
          </motion.div>

          {/* Her portrait — the dominant image, replace /public/images/hero.jpg */}
          <motion.div
            className="relative mt-3 flex-1 overflow-hidden md:mt-4"
            initial={{ scale: 1 }}
            animate={isOpening ? { scale: 1.05 } : { scale: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={HERO_IMAGE.src}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/0 to-wine-deep/25" />
              <div className="absolute inset-0 bg-wine-deep/10" />
            </motion.div>
          </motion.div>

          {/* Footer — thin editorial rule, issue line, in place of a barcode */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="relative z-10 w-full border-t border-paper/20 px-5 py-3 md:px-12 md:py-4"
          >
            <div className="flex items-center justify-between font-sans text-[9px] uppercase tracking-widest2 text-paper/60 md:text-[10px]">
              <span>Vol. I</span>
              <span className="flex items-center gap-2">
                <span className="inline-block h-1 w-1 rounded-full bg-champagne" />
                opening
                <span className="inline-block h-1 w-1 rounded-full bg-champagne" />
              </span>
              <span>MMXXVI</span>
            </div>
          </motion.div>
        </motion.button>
      )}

      {/* Curtain-wipe reveal: two panels part before the dissolve completes,
          giving the sense of a magazine cover opening rather than a plain fade. */}
      {isOpening && !isOpen && !reducedMotion && (
        <div
          key="curtain-wipe"
          className="pointer-events-none fixed inset-0 z-[55] flex"
        >
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '-100%' }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="h-full w-1/2 bg-paper"
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.3, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
            className="h-full w-1/2 bg-paper"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
