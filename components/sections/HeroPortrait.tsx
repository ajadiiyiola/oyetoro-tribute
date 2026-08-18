'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { HERO_IMAGE, SECTION_IDS } from '@/lib/media-map';

export function HeroPortrait() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 20) {
      setHasScrolled(true);
    }
  });
  return (
    <section
      id={SECTION_IDS.hero}
      aria-label="Hero portrait"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-scrapbook-cream"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.08, filter: 'blur(18px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={HERO_IMAGE.src}
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-110 blur-2xl opacity-30"
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-scrapbook-berry/10" />
        <div className="absolute inset-0 flex items-center justify-center px-4 py-8 md:px-10 md:py-12">
          <div className="scrapbook-photo relative h-full w-full max-w-6xl overflow-hidden">
            <Image
              src={HERO_IMAGE.src}
              alt={HERO_IMAGE.alt}
              fill
              priority
              sizes="100vw"
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </div>
        </div>
      </motion.div>

      {/* Text integrated into the composition, overlapping the image edge */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full px-6 pb-14 md:px-16 md:pb-20"
      >
        <p className="font-sans text-[11px] uppercase tracking-widest2 text-scrapbook-butter md:text-xs">
          Volume One
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-[13vw] font-light leading-[0.95] text-paper sm:text-6xl md:text-8xl">
          Oyetoro
          <br />
          <span className="italic">Olajumoke Esther</span>
        </h1>
      </motion.div>
      {!hasScrolled && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{
            opacity: { duration: 1, delay: 2.2 },
            y: { duration: 1.6, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 text-paper/75"
          aria-hidden="true"
        >
          <span className="font-sans text-[9px] uppercase tracking-[0.28em]">
            Scroll to continue
          </span>
          <span className="text-lg leading-none">↓</span>
        </motion.div>
      )}
    </section>
  );
}
