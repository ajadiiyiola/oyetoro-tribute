'use client';

import { motion } from 'framer-motion';
import { EditorialHeading } from '@/components/editorial/EditorialHeading';
import { CinematicImage } from '@/components/media/CinematicImage';
import { SECTION_IDS, GALLERY_IMAGES, VOICE_NOTES } from '@/lib/media-map';
import { VoiceNoteCard } from '@/components/media/VoiceNoteCard';

const PARAGRAPHS = [
  'I sincerely want to apologize for hurting your feelings and for the way I handled things. I understand why you felt disrespected and left out, especially when it came to decisions that I should have carried you along with.',
  'Looking back, I realize that I could have communicated better and considered your feelings more. You have always been there for me, and I truly appreciate your support, care, and everything you\u2019ve done for me. The last thing I ever wanted was to make you feel unimportant or disregarded.',
];

const EMPHASIZED = 'I\u2019m genuinely sorry.';

const PARAGRAPH_TWO_TAIL =
  'I take responsibility for my actions, and I hope you can forgive me. I\u2019ll do my best to communicate better, involve you when I should, and be more mindful of how my actions affect you.';

const EMPHASIZED_CLOSE = 'You mean a lot to me, and I really don\u2019t want my actions to make you feel otherwise.';

export function ApologySection() {
  const image = GALLERY_IMAGES[0];

  return (
    <section id={SECTION_IDS.apology} aria-labelledby="apology-heading" className="scrapbook-page w-full bg-paper">
      {/* Mobile-first: full-bleed image opens the spread, editorial text follows below */}
      <div className="relative">
        <CinematicImage
          src={image.src}
          alt={image.alt}
          className="aspect-[3/4] w-full md:hidden"
          sizes="100vw"
        />
      </div>

      <div className="px-6 py-16 md:px-16 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[0.85fr_1fr] md:gap-20">
          <div className="hidden md:block">
            <CinematicImage
              src={image.src}
              alt={image.alt}
              className="aspect-[4/5] w-full"
              sizes="45vw"
            />
          </div>

          <div className="flex flex-col justify-center">
            <EditorialHeading eyebrow="A Letter From the Heart" title="An Apology" id="apology-heading" />

            <div className="mt-10 space-y-6 font-sans text-base leading-relaxed text-ink/80 md:text-lg">
              {PARAGRAPHS.map((paragraph, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className={i === 0 ? 'drop-cap' : undefined}
                >
                  {paragraph}
                </motion.p>
              ))}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {PARAGRAPH_TWO_TAIL}
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen editorial moment: wine background, white typography */}
      <div className="flex min-h-[70svh] w-full items-center justify-center bg-scrapbook-berry px-6 text-center">
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl italic text-paper sm:text-6xl md:text-7xl"
        >
          {EMPHASIZED}
        </motion.p>
      </div>

      <div className="px-6 py-16 md:px-16 md:py-28">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center font-serif text-xl italic leading-relaxed text-wine-deep md:text-3xl"
        >
          {EMPHASIZED_CLOSE}
        </motion.p>
      </div>

      <div className="px-6 pb-24 md:px-16 md:pb-32">
        <div className="mx-auto max-w-2xl">
          <p className="mb-5 text-center font-sans text-[10px] uppercase tracking-widest2 text-scrapbook-berry/65">
            A voice from the family
          </p>
          <VoiceNoteCard
            src={VOICE_NOTES.mummy.src}
            label={VOICE_NOTES.mummy.label}
            note={VOICE_NOTES.mummy.note}
            rotate="-1.5deg"
          />
        </div>
      </div>
    </section>
  );
}
