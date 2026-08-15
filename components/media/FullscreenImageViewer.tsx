'use client';

import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, PanInfo } from 'framer-motion';
import Image from 'next/image';

type Photo = { src: string; alt: string };

type FullscreenImageViewerProps = {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

export function FullscreenImageViewer({
  photos,
  index,
  onClose,
  onNavigate,
}: FullscreenImageViewerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isOpen = index !== null;

  const goNext = useCallback(() => {
    if (index === null) return;
    onNavigate((index + 1) % photos.length);
  }, [index, onNavigate, photos.length]);

  const goPrev = useCallback(() => {
    if (index === null) return;
    onNavigate((index - 1 + photos.length) % photos.length);
  }, [index, onNavigate, photos.length]);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, goNext, goPrev]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -80) goNext();
    else if (info.offset.x > 80) goPrev();
  };

  const current = index !== null ? photos[index] : null;

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 backdrop-blur-md"
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close photograph"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-paper/70 md:right-8 md:top-8"
          >
            <span aria-hidden="true" className="text-lg">
              ✕
            </span>
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous photograph"
                className="absolute left-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-paper/70 md:left-6"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next photograph"
                className="absolute right-2 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-paper/30 text-paper transition-colors hover:border-paper/70 md:right-6"
              >
                ›
              </button>
            </>
          )}

          <motion.div
            key={current.src}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[80vh] w-[92vw] max-w-5xl md:h-[86vh]"
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              sizes="92vw"
              style={{ objectFit: 'contain' }}
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
