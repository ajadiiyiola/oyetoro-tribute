# Oyetoro Olajumoke Esther — Luxury Tribute Magazine

A public-facing, luxury-editorial digital tribute site. Built with Next.js 14
(App Router), TypeScript, Tailwind CSS, Framer Motion, and GSAP ScrollTrigger.

## 1. Getting started

```bash
npm install
npm run dev       # local development, http://localhost:3000
npm run build      # production build
npm run start       # serve the production build
```

Requires Node 18+.

## 2. The cover photograph

Her real photograph goes in **one place**: `/public/images/hero.jpg`. It's
used automatically as both the cover image and the hero reveal right after
the cover opens — nothing else needs to change. Nothing in this project
generates, invents, or permanently displays a placeholder face; the wine-toned
placeholder you see now disappears the moment you drop the real file in under
that same name.

## 3. Full asset naming contract

Everything currently in `/public/images`, `/public/videos`, and `/public/music`
is a generated placeholder so the site runs out of the box. Replace each file
**with the same filename** and nothing else needs to change:

```
/public/images
  hero.jpg          → her strongest portrait (cover + hero reveal)
  photo-01.jpg       ┐
  photo-02.jpg       │  the 19 general memory photographs,
  ...                │  used in the horizontal cinematic gallery
  photo-19.jpg       ┘
  photo-20.jpg       → SPECIAL: full family photo (mother, brother, recipient, sister)
  photo-21.jpg       → SPECIAL: girls' photo (mother, recipient, sister)
  travel-uk-poster.jpg     → optional poster frame for the travel video
  family-hair-poster.jpg   → optional poster frame for the family-hair video

/public/videos
  travel-uk.mp4       → her travelling back to the UK
  family-hair.mp4      → the playful family hair moment

/public/music
  background-song.mp3  → "You're Still the One (International Mix)" — Shania Twain
```

This mapping lives in one place: `lib/media-map.ts`. You never need to touch
a component to swap a file.

**Video format note:** export both videos as standard H.264 (yuv420p) `.mp4`
with `faststart` enabled:
```bash
ffmpeg -i input.mov -c:v libx264 -profile:v baseline -pix_fmt yuv420p -movflags +faststart -c:a aac travel-uk.mp4
```

## 4. Typography

The magazine loads your **real, licensed Bezoria and Praise** font files:

- **Cover masthead** (`font-cover`) — `/public/fonts/Praise.ttf`. Used only
  on the cover masthead.
- **Main editorial typography** (`font-serif`) — `/public/fonts/Bezoria.otf`.
  Used for every heading and emotional typography moment through the rest of
  the magazine.
- **Supporting text** (`font-sans`) — Jost, a clean modern sans for body
  copy, captions, and UI (SIL Open Font License, unchanged from before).

**Note on this build environment:** I don't have your actual font files
where I run `npm run build`, so `/public/fonts/Bezoria.otf` and
`/public/fonts/Praise.ttf` in this delivered copy contain temporary
stand-ins (Playfair Display and Italiana, both SIL Open Font License)
renamed to those exact filenames, purely so the project builds and previews
here. In your own copy of the project, with your real `Bezoria.otf` and
`Praise.ttf` already in `/public/fonts/`, the exact same code will load your
real fonts automatically — no further changes needed. See
`/public/fonts/README-PLACEHOLDER-FONTS.txt` for the same note in the
project itself.

If your real files are `.ttf` instead of `.otf`, either rename them to match,
or update the two `src` paths in the `localFont(...)` calls near the top of
`app/layout.tsx`.

## 5. Colour system

Rich, saturated wine + white, per your reference — not the muted version from
the first draft:

- `wine-deep` `#3A0710` — near-black burgundy, used for full-bleed dramatic
  typography moments (cover, "I see you", the final prayer declarations)
- `wine` `#6E0E1E` — the primary rich burgundy for headings and accents
- `wine-light` / `wine-soft` — lighter supporting tones
- `champagne` `#C9A15A` / `champagne-soft` `#E4D3B0` — muted gold, used
  sparingly for accents on dark backgrounds
- `paper` / `paper-warm` / `paper-ivory` — white and warm-white backgrounds

## 6. What's implemented

- **Cover** — original masthead (her name + tagline, no invented logo), her
  photograph full-bleed, wine-tinted, small Vogue-structure editorial
  furniture (issue line, cover lines). Auto-opens after ~4.6s or on tap, with
  a curtain-wipe reveal into a soft dissolve — a magazine-opening illusion,
  not a literal 3D page flip.
- **Hero** — full-bleed portrait with integrated overlapping typography
- **Apology** ("A Letter From the Heart") — mobile-first spread (image leads
  on phone, side-by-side on desktop), paragraph-by-paragraph reveal, and a
  full-bleed wine-background moment for "I'm genuinely sorry."
- **Appreciation** ("A Letter of Appreciation") — includes the major
  typography moment, "I want you to know that I see you.", as a full-viewport
  wine-background/white-typography spread
- **Horizontal cinematic memory gallery** — GSAP ScrollTrigger pin + horizontal
  scroll on desktop, native touch swipe on mobile, curated asymmetric widths
- **Fullscreen photo viewer** — keyboard (Esc / ← / →), swipe, prev/next
- **Family** — the two special photographs in an asymmetric editorial layout
  with wine caption tags, not a plain stack
- **Two video features** — autoplay-on-scroll-into-view, pause-on-leave,
  cinematic crop, background-music ducking while playing
- **Background music** — single global audio element, discreet mute/unmute
  only (no big play button), ducks under both videos, fades out at the close
- **Prayer** — progressively more typographic, shifting from white to a
  wine-deep background as it deepens, ending in the five declarations and
  "Amen." set in the cover font
- **Closing** — both special family photos again, a wine-deep "With love,
  always." band, then the music fades
- **Navigation** — discreet menu button, wine-deep full-screen table of
  contents with numbered entries, no persistent navbar
- `prefers-reduced-motion` respected throughout (gallery falls back to a
  plain scrollable strip; all motion designed to degrade gracefully)
- Semantic HTML, alt text, visible focus states, accessible dialog/nav
  controls, Open Graph metadata

No birthday language, imagery, or framing appears anywhere in the copy or
code.

## 7. Before you publish

- Update `metadataBase` in `app/layout.tsx` to your real domain so Open
  Graph/social preview images resolve correctly.
- Swap in your real assets per §2–3.
- If you're working from this delivered copy, overwrite the placeholder font
  files with your real Bezoria.otf and Praise.ttf (see §4).
- Run `npm run build` once more after asset replacement to confirm image
  crops look right, then deploy (Vercel is the simplest path for a Next.js
  App Router project).
