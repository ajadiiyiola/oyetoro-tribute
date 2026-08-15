'use client';

import { useState } from 'react';
import { MusicProvider, useMusic } from '@/lib/MusicContext';
import { MagazineCover } from '@/components/editorial/MagazineCover';
import { Navigation } from '@/components/navigation/Navigation';
import { HeroPortrait } from '@/components/sections/HeroPortrait';
import { ApologySection } from '@/components/sections/ApologySection';
import { AppreciationSection } from '@/components/sections/AppreciationSection';
import { HorizontalMemoryGallery } from '@/components/sections/HorizontalMemoryGallery';
import { FamilySection } from '@/components/sections/FamilySection';
import { TravelVideoSection, PlayfulVideoSection } from '@/components/sections/VideoSection';
import { PrayerSection } from '@/components/sections/PrayerSection';
import { FinalFamilySection } from '@/components/sections/FinalFamilySection';

function Experience() {
  const [opened, setOpened] = useState(false);
  const { begin } = useMusic();

  const handleOpen = () => {
    setOpened(true);
    begin();
  };

  return (
    <>
      <MagazineCover onOpen={handleOpen} />
      <Navigation visible={opened} />
      <main>
        <HeroPortrait />
        <ApologySection />
        <AppreciationSection />
        <HorizontalMemoryGallery />
        <FamilySection />
        <TravelVideoSection />
        <PlayfulVideoSection />
        <PrayerSection />
        <FinalFamilySection />
      </main>
    </>
  );
}

export default function Page() {
  return (
    <MusicProvider>
      <Experience />
    </MusicProvider>
  );
}
