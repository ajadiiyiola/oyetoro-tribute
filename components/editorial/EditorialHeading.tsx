'use client';

import { motion } from 'framer-motion';

type EditorialHeadingProps = {
  eyebrow?: string;
  title: string;
  align?: 'left' | 'center';
  size?: 'md' | 'lg' | 'xl';
  className?: string;
  id?: string;
};

const sizes: Record<string, string> = {
  md: 'text-3xl md:text-5xl',
  lg: 'text-4xl md:text-6xl',
  xl: 'text-5xl md:text-8xl',
};

export function EditorialHeading({
  eyebrow,
  title,
  align = 'left',
  size = 'lg',
  className = '',
  id,
}: EditorialHeadingProps) {
  return (
    <div className={`${align === 'center' ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className={`mb-4 flex items-center gap-3 ${align === 'center' ? 'justify-center' : 'justify-start'}`}
        >
          <span className="h-px w-6 bg-wine/50" />
          <p className="eyebrow">{eyebrow}</p>
          {align === 'center' && <span className="h-px w-6 bg-wine/50" />}
        </motion.div>
      )}
      <motion.h2
        id={id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
        className={`font-serif font-normal italic leading-[1.02] tracking-tight text-wine-deep ${sizes[size]}`}
      >
        {title}
      </motion.h2>
    </div>
  );
}
