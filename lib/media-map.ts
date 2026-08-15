/**
 * MEDIA MAP
 * ---------
 * This is the single source of truth for where each real asset belongs.
 * Drop your real files into /public/images, /public/videos and /public/music
 * using the exact filenames below. Nothing else in the codebase needs to change.
 *
 * IMAGES (21 total)
 *  - hero.jpg            → her strongest solo portrait. Used on the cover and the
 *                          hero reveal. (Tip: this can be a duplicate of photo-01.)
 *  - photo-01 … photo-19 → the 19 general personal/family photographs.
 *                          These populate the horizontal cinematic gallery.
 *  - photo-20            → SPECIAL: full family photograph
 *                          (mother, brother, recipient, sister/client).
 *  - photo-21            → SPECIAL: girls' photograph
 *                          (mother, recipient, sister/client).
 *
 * VIDEOS (2 total)
 *  - travel-uk.mp4        → her travelling back to the UK.
 *  - travel-uk-poster.jpg → optional poster frame for the video above.
 *  - family-hair.mp4      → the playful family hair moment.
 *  - family-hair-poster.jpg → optional poster frame for the video above.
 *
 * MUSIC (1 total)
 *  - background-song.mp3  → "You're Still the One (International Mix)" — Shania Twain.
 *                          Provided by the family. No lyrics are reproduced anywhere
 *                          in this codebase.
 */

export const HERO_IMAGE = {
  src: '/images/hero.jpg',
  alt: 'A portrait of Oyetoro Olajumoke Esther',
};

export const GALLERY_IMAGES: { src: string; alt: string }[] = Array.from(
  { length: 19 },
  (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      src: `/images/photo-${n}.jpg`,
      alt: `A memory, photograph ${i + 1} of 19`,
    };
  }
);

export const FAMILY_FULL_IMAGE = {
  src: '/images/photo-20.jpg',
  alt: 'Mother, brother, Oyetoro Olajumoke Esther, and sister together',
  caption: 'THE PEOPLE WHO MADE THE MEMORIES',
};

export const FAMILY_GIRLS_IMAGE = {
  src: '/images/photo-21.jpg',
  alt: 'Mother, Oyetoro Olajumoke Esther, and sister together',
  caption: 'A MOMENT TO KEEP',
};

export const TRAVEL_VIDEO = {
  src: '/videos/travel-uk.mp4',
  label: 'Travelling back to the UK',
};

export const FAMILY_HAIR_VIDEO = {
  src: '/videos/family-hair.mp4',
  label: 'A family hair moment',
};

export const BACKGROUND_MUSIC = {
  src: '/music/background-song.mp3',
  title: "You're Still the One (International Mix)",
  artist: 'Shania Twain',
};

export const SECTION_IDS = {
  hero: 'hero',
  apology: 'apology',
  appreciation: 'appreciation',
  memories: 'memories',
  family: 'family',
  travel: 'travel-video',
  playful: 'family-video',
  prayer: 'prayer',
  closing: 'closing',
} as const;
