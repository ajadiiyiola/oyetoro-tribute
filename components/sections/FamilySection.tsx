import { EditorialHeading } from '@/components/editorial/EditorialHeading';
import { FamilyPhotoFeature } from './FamilyPhotoFeature';
import { FAMILY_FULL_IMAGE, FAMILY_GIRLS_IMAGE, SECTION_IDS } from '@/lib/media-map';

export function FamilySection() {
  return (
    <section
      id={SECTION_IDS.family}
      aria-label="Family"
      className="w-full bg-paper py-24 md:py-32"
    >
      <div className="px-6 md:px-16">
        <EditorialHeading eyebrow="Volume Three" title="Family" align="center" />
      </div>

      <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        <FamilyPhotoFeature
          src={FAMILY_FULL_IMAGE.src}
          alt={FAMILY_FULL_IMAGE.alt}
          caption={FAMILY_FULL_IMAGE.caption}
          align="inset-right"
        />
        <FamilyPhotoFeature
          src={FAMILY_GIRLS_IMAGE.src}
          alt={FAMILY_GIRLS_IMAGE.alt}
          caption={FAMILY_GIRLS_IMAGE.caption}
          align="inset-left"
        />
      </div>
    </section>
  );
}
