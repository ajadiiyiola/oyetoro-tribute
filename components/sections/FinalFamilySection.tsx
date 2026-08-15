'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { FAMILY_FULL_IMAGE, FAMILY_GIRLS_IMAGE, SECTION_IDS } from '@/lib/media-map';
import { useMusic } from '@/lib/MusicContext';

export function FinalFamilySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const { fadeOutFinal } = useMusic();
  const hasFadedRef = useRef(false);

  useEffect(() => {
    if (inView && !hasFadedRef.current) {
      hasFadedRef.current = true;
      fadeOutFinal();
    }
  }, [inView, fadeOutFinal]);

  return (
    <section
      id={SECTION_IDS.closing}
      ref={ref}
      aria-label="Closing"
      className="w-full bg-paper py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-5xl gap-4 px-6 md:grid-cols-2 md:gap-6 md:px-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6 }}
          className="relative aspect-[4/5] w-full"
        >
          <Image src={FAMILY_FULL_IMAGE.src} alt={FAMILY_FULL_IMAGE.alt} fill sizes="50vw" style={{ objectFit: 'cover' }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.3 }}
          className="relative aspect-[4/5] w-full"
        >
          <Image src={FAMILY_GIRLS_IMAGE.src} alt={FAMILY_GIRLS_IMAGE.alt} fill sizes="50vw" style={{ objectFit: 'cover' }} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="mt-16 bg-wine-deep py-16 text-center md:mt-24 md:py-20"
      >
        <p className="font-serif text-3xl italic text-paper sm:text-4xl md:text-6xl">
          With love, always.
        </p>
      </motion.div>
    </section>
  );
}
