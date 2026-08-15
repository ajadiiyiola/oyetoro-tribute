'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';
import { EditorialHeading } from '@/components/editorial/EditorialHeading';
import { FullscreenImageViewer } from '@/components/media/FullscreenImageViewer';
import { GALLERY_IMAGES, SECTION_IDS } from '@/lib/media-map';
import { useReducedMotion } from '@/lib/useReducedMotion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const WIDTH_PATTERN = [
  'w-[88vw] md:w-[68vw]',
  'w-[74vw] md:w-[40vw]',
  'w-[80vw] md:w-[52vw]',
  'w-[70vw] md:w-[34vw]',
  'w-[84vw] md:w-[58vw]',
];

export function HorizontalMemoryGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const distance = Math.max(
        0,
        track.scrollWidth - window.innerWidth
      );

      if (distance <= 0) return;

      const tween = gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance}`,
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    mm.add('(max-width: 767px)', () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + 24);

      const tween = gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: 0.7,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    const refresh = () => ScrollTrigger.refresh();

    window.addEventListener('resize', refresh);

    return () => {
      window.removeEventListener('resize', refresh);
      mm.revert();
    };
  }, [reducedMotion]);

  return (
    <section
      id={SECTION_IDS.memories}
      aria-label="A cinematic photo journey through memories"
      className="relative w-full bg-paper-ivory"
    >
      <div className="px-6 pb-10 pt-24 md:px-16 md:pb-0 md:pt-32">
        <EditorialHeading
          eyebrow="Volume Two"
          title="Memories"
          size="lg"
        />
      </div>

      {reducedMotion ? (
        <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-24 md:gap-8 md:px-16">
          {GALLERY_IMAGES.map((photo, i) => (
            <button
              key={photo.src}
              type="button"
              onClick={() => setLightboxIndex(i)}
              aria-label={`Expand photograph: ${photo.alt}`}
              className={`relative aspect-[4/5] shrink-0 snap-center overflow-hidden ${WIDTH_PATTERN[i % WIDTH_PATTERN.length]
                }`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="70vw"
                style={{ objectFit: 'contain' }}
              />
            </button>
          ))}
        </div>
      ) : (
        <div
          ref={sectionRef}
          className="relative h-[100svh] w-full overflow-hidden"
        >
          <div
            ref={trackRef}
            className="no-scrollbar flex h-full w-max items-center gap-6 px-6 will-change-transform md:gap-10 md:px-16"
          >
            {GALLERY_IMAGES.map((photo, i) => (
              <button
                key={photo.src}
                type="button"
                onClick={() => setLightboxIndex(i)}
                aria-label={`Expand photograph: ${photo.alt}`}
                className={`group relative h-[62vh] shrink-0 overflow-hidden md:h-[68vh] ${WIDTH_PATTERN[i % WIDTH_PATTERN.length]
                  }`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="80vw"
                  loading="eager"
                  unoptimized
                  style={{ objectFit: 'contain' }}
                  className="transition-transform duration-700 ease-editorial"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      <FullscreenImageViewer
        photos={GALLERY_IMAGES}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </section>
  );
}