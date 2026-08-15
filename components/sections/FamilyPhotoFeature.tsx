'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

type FamilyPhotoFeatureProps = {
  src: string;
  alt: string;
  caption: string;
  id?: string;
  align?: 'full' | 'inset-right' | 'inset-left';
};

export function FamilyPhotoFeature({
  src,
  alt,
  caption,
  id,
  align = 'full',
}: FamilyPhotoFeatureProps) {
  const insetClass =
    align === 'inset-right'
      ? 'md:ml-auto md:w-[82%]'
      : align === 'inset-left'
        ? 'md:mr-auto md:w-[82%]'
        : 'w-full';

  return (
    <div id={id} className="relative w-full px-6 md:px-16">
      <div className={insetClass}>
        <motion.div
          initial={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] w-full md:aspect-[16/10]"
        >
          <Image src={src} alt={alt} fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-5 flex justify-center md:mt-6 md:justify-start"
        >
          <span className="inline-flex items-center gap-2 bg-wine-deep px-4 py-1.5">
            <span className="font-sans text-[10px] uppercase tracking-widest2 text-paper">
              {caption}
            </span>
          </span>
        </motion.div>
      </div>
    </div>
  );
}
