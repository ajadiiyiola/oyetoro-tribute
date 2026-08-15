'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { HERO_IMAGE, SECTION_IDS } from '@/lib/media-map';

export function HeroPortrait() {
  return (
    <section
      id={SECTION_IDS.hero}
      aria-label="Hero portrait"
      className="relative flex min-h-[100svh] w-full items-end overflow-hidden bg-wine-deep"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.08, filter: 'blur(18px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        <Image
          src={HERO_IMAGE.src}
          alt={HERO_IMAGE.alt}
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 20%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-wine-deep via-wine-deep/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-wine-deep/40 via-transparent to-transparent" />
      </motion.div>

      {/* Text integrated into the composition, overlapping the image edge */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full px-6 pb-14 md:px-16 md:pb-20"
      >
        <p className="font-sans text-[11px] uppercase tracking-widest2 text-champagne-soft md:text-xs">
          Volume One
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-[13vw] font-light leading-[0.95] text-paper sm:text-6xl md:text-8xl">
          Oyetoro
          <br />
          <span className="italic">Olajumoke Esther</span>
        </h1>
      </motion.div>
    </section>
  );
}
