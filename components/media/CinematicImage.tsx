'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

type CinematicImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  onClick?: () => void;
  className?: string;
  objectPosition?: string;
};

export function CinematicImage({
  src,
  alt,
  sizes = '(min-width: 768px) 50vw, 100vw',
  priority = false,
  onClick,
  className = '',
  objectPosition = 'center',
}: CinematicImageProps) {
  const [loaded, setLoaded] = useState(false);

  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      aria-label={onClick ? `Expand photograph: ${alt}` : undefined}
      className={`relative block overflow-hidden bg-paper-ivory ${className} ${
        onClick ? 'cursor-zoom-in' : ''
      }`}
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.06, filter: 'blur(14px)' }}
        whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative h-full w-full"
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          style={{ objectFit: 'cover', objectPosition }}
          className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </motion.div>
    </Wrapper>
  );
}
