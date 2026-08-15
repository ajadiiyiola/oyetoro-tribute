'use client';

import { motion } from 'framer-motion';
import { EditorialHeading } from '@/components/editorial/EditorialHeading';
import { ScrollReveal } from '@/components/editorial/ScrollReveal';
import { SECTION_IDS } from '@/lib/media-map';

const OPENING = [
  'I just want to take a moment to sincerely appreciate you and say thank you for everything you\u2019ve done for me and my family.',
  'You have been such a blessing to us in so many ways, and honestly, I don\u2019t think I say it enough.',
  'You have always been there for me, always willing to come through whenever I need you. Your generosity and kindness are things I will never take for granted.',
  'You have supported me, encouraged me, and shown up for me in ways that mean more to me than I can properly put into words. Even when you didn\u2019t have to, you always found a way to help and that says so much about the kind of person you are.',
];

const I_SEE_LINES = [
  'I see your heart.',
  'I see your sacrifices.',
  'I see your generosity.',
  'I see your love.',
];

const CLOSING = [
  'And I see all the little and big things you do for me and my family.',
  'I appreciate you more than you know, and I\u2019m genuinely grateful that I have someone like you in my life.',
];

const THANK_YOU_LINES = [
  'Thank you for always being there.',
  'Thank you for always coming through.',
  'Thank you for being not just a friend, but an elder sister, someone I can look up to, trust, and count on.',
];

const BLESSING = [
  'May you always be surrounded by the same love, kindness, and goodness that you so freely give to others.',
  'May life continue to be kind to you, and may you never lack people who will show up for you the way you have always shown up for us.',
];

export function AppreciationSection() {
  return (
    <section id={SECTION_IDS.appreciation} aria-labelledby="appreciation-heading" className="w-full bg-paper-warm">
      <div className="px-6 py-20 md:px-16 md:py-32">
        <div className="mx-auto max-w-3xl">
          <EditorialHeading eyebrow="A Letter of Appreciation" title="Gratitude" id="appreciation-heading" align="center" />

          <div className="mt-14 space-y-6 font-sans text-base leading-relaxed text-ink/80 md:text-lg">
            {OPENING.map((line, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p className={i === 0 ? 'drop-cap' : undefined}>{line}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Major typography moment — full-bleed wine background, per the brief */}
      <div className="flex min-h-[100svh] w-full flex-col items-center justify-center bg-wine-deep px-6 py-24 text-center">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl font-serif text-4xl font-light leading-[1.05] text-paper sm:text-6xl md:text-7xl"
        >
          I want you to know
          <br />
          <span className="italic">that I see you.</span>
        </motion.p>

        <div className="mx-auto mt-16 max-w-md space-y-4 md:mt-24">
          {I_SEE_LINES.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.7, delay: i * 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-2xl italic text-champagne-soft md:text-3xl"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      <div className="px-6 py-20 md:px-16 md:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="space-y-6 font-sans text-base leading-relaxed text-ink/80 md:text-lg">
            {CLOSING.map((line, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p>{line}</p>
              </ScrollReveal>
            ))}
          </div>

          <div className="rule my-14" />

          <div className="space-y-3 text-center">
            {THANK_YOU_LINES.map((line, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p className="font-serif text-xl italic text-wine-deep md:text-2xl">{line}</p>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-14 space-y-5 text-center font-sans text-base leading-relaxed text-ink/70 md:text-lg">
            {BLESSING.map((line, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <p>{line}</p>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.1} className="mt-16 text-center">
            <p className="font-serif text-3xl italic text-wine md:text-4xl">
              I love and appreciate you so much.
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
