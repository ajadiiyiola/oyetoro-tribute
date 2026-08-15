'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { EditorialHeading } from '@/components/editorial/EditorialHeading';
import { ScrollReveal } from '@/components/editorial/ScrollReveal';
import { GALLERY_IMAGES, SECTION_IDS } from '@/lib/media-map';

const OPENING = [
  'My prayer for you is that God will continue to bless you beyond your imagination and reward you for every good thing you have done, even the ones nobody saw.',
  'May God grant you the deepest desires of your heart. May He hear even the prayers you have not been able to put into words and answer you in ways that leave you amazed and grateful.',
];

const MIDDLE = [
  'May your lines continually fall in pleasant places. May doors of favor, opportunities, blessings, and divine connections open for you. Wherever you go, may things work in your favor, and may you never have to struggle for what God has already ordained for you.',
  'May the Lord bless the work of your hands and cause everything you touch to prosper. May He give you wisdom to make the right decisions, strength for every season, and grace to overcome every challenge that comes your way.',
  'May you experience happiness that comes from within, peace that cannot be explained, and joy that no circumstance can take away. May God surround you with people who genuinely love, value, support, and celebrate you.',
];

const QUIETER = [
  'May you never lack help when you need it. Just as you have always shown up for others, may God raise people who will show up for you. May you receive kindness in abundance, favor in unexpected places, and blessings from directions you never anticipated.',
  'May God protect you and everyone you love. May He keep you in good health, preserve your life, order your steps, and shield you from every evil. May no plan against you prosper, and may you always have reasons to testify of His goodness.',
  'And when you think you have seen the best of what God can do, may He surprise you with something even greater.',
];

const NEARLY_TYPOGRAPHY = [
  'May this season of your life bring answered prayers, beautiful testimonies, divine restoration, new opportunities, financial blessings, peace of mind, and fulfillment.',
  'May everything you have prayed for privately become a public testimony. May God make your heart glad and give you reasons to smile from the depths of your soul.',
  'You have been a blessing to so many, and my prayer is that your own life will overflow with blessings in return.',
  'May God continue to go before you, make every crooked path straight, and cause everything concerning you to work together for your good.',
];

const DECLARATIONS = [
  'You will not labor in vain.',
  'You will not be forgotten.',
  'You will not be stranded.',
  'You will not lack help.',
  'You will not miss your season.',
];

export function PrayerSection() {
  const openingImage = GALLERY_IMAGES[6];

  return (
    <section
      id={SECTION_IDS.prayer}
      aria-label="A prayer"
      className="w-full bg-paper"
    >
      {/* Beginning: one meaningful photograph, refined typography */}
      <div className="relative flex min-h-[90svh] w-full items-end overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={openingImage.src}
            alt={openingImage.alt}
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-paper/10 to-transparent" />
        </motion.div>
        <div className="relative z-10 w-full px-6 pb-20 md:px-16 md:pb-28">
          <EditorialHeading eyebrow="Volume Five · The Final Word" title="A Prayer" size="xl" />
        </div>
      </div>

      {/* Opening lines — still some visual richness */}
      <div className="mx-auto max-w-2xl px-6 py-20 md:py-28">
        <div className="space-y-6 font-sans text-base leading-relaxed text-ink/85 md:text-lg">
          {OPENING.map((line, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p>{line}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Middle — fewer photographs, more whitespace */}
      <div className="mx-auto max-w-2xl space-y-6 px-6 py-16 font-sans text-base leading-relaxed text-ink/80 md:py-24 md:text-lg">
        {MIDDLE.map((line, i) => (
          <ScrollReveal key={i} delay={i * 0.08}>
            <p>{line}</p>
          </ScrollReveal>
        ))}
      </div>

      {/* Quieter — larger typography, wine background begins to take over */}
      <div className="w-full bg-wine-deep px-6 py-20 text-center md:py-32">
        <div className="mx-auto max-w-2xl space-y-8 font-serif text-lg leading-relaxed text-paper/90 md:text-2xl">
          {QUIETER.map((line, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <p>{line}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Nearly pure typography — wine background, white Bezoria-style typography */}
      <div className="w-full bg-wine-deep px-6 py-24 text-center md:py-40">
        <div className="mx-auto max-w-3xl space-y-10 font-serif text-xl italic leading-snug text-paper sm:text-2xl md:text-4xl">
          {NEARLY_TYPOGRAPHY.map((line, i) => (
            <ScrollReveal key={i} delay={i * 0.12} duration={1.1}>
              <p>{line}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Final declarations — the words are the visual experience */}
      <div className="w-full bg-wine-deep px-6 py-32 text-center md:py-48">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-16 md:gap-24">
          {DECLARATIONS.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-3xl uppercase tracking-tight text-paper sm:text-5xl md:text-6xl"
            >
              {line}
            </motion.p>
          ))}

          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 font-cover text-6xl text-champagne-soft md:text-8xl"
          >
            Amen.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
