import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Bezoria — main editorial typography throughout the magazine.
// Real licensed font file, self-hosted from /public/fonts/Bezoria.otf.
const editorial = localFont({
  src: '../public/fonts/Bezoria.otf',
  variable: '--font-editorial',
  display: 'swap',
  weight: '400',
});

// Praise — cover masthead typography only.
// Real licensed font file, self-hosted from /public/fonts/Praise.ttf.
const cover = localFont({
  src: '../public/fonts/Praise.ttf',
  variable: '--font-cover',
  display: 'swap',
  weight: '400',
});

const sans = localFont({
  src: '../public/fonts/Jost-Variable.ttf',
  variable: '--font-sans',
  display: 'swap',
  weight: '300 600',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://oyetoro-tribute.example.com'),
  title: 'Oyetoro Olajumoke Esther — The Story. The Memories. The Love.',
  description:
    'A private tribute, made public: a letter of apology, a letter of gratitude, a family of memories, and a prayer — for Oyetoro Olajumoke Esther.',
  openGraph: {
    title: 'Oyetoro Olajumoke Esther — The Story. The Memories. The Love.',
    description:
      'A letter of apology, a letter of gratitude, a family of memories, and a prayer.',
    images: ['/images/hero.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Oyetoro Olajumoke Esther — The Story. The Memories. The Love.',
    description:
      'A letter of apology, a letter of gratitude, a family of memories, and a prayer.',
    images: ['/images/hero.jpg'],
  },
};

export const viewport: Viewport = {
  themeColor: '#3D040F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${editorial.variable} ${cover.variable} ${sans.variable}`}
    >
      <body className="bg-paper text-ink font-sans antialiased selection:bg-wine selection:text-paper">
        {children}
      </body>
    </html>
  );
}
