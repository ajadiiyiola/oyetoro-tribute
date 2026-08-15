import { EditorialHeading } from '@/components/editorial/EditorialHeading';
import { VideoFeature } from '@/components/media/VideoFeature';
import { FAMILY_HAIR_VIDEO, SECTION_IDS, TRAVEL_VIDEO } from '@/lib/media-map';

export function TravelVideoSection() {
  return (
    <section
      id={SECTION_IDS.travel}
      aria-label="Travelling back to the UK"
      className="w-full bg-paper-warm px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <EditorialHeading eyebrow="Volume Four" title="The Journey" />
        <div className="mt-12">
          <VideoFeature
            src={TRAVEL_VIDEO.src}
            poster={TRAVEL_VIDEO.poster}
            label={TRAVEL_VIDEO.label}
            tone="cinematic"
          />
        </div>
      </div>
    </section>
  );
}

export function PlayfulVideoSection() {
  return (
    <section
      id={SECTION_IDS.playful}
      aria-label="A playful family moment"
      className="w-full bg-paper px-6 py-24 md:px-16 md:py-32"
    >
      <div className="mx-auto max-w-4xl">
        <EditorialHeading eyebrow="A Lighter Page" title="A Family Moment" align="center" />
        <p className="mx-auto mt-6 max-w-xl text-center font-sans text-ink/70">
          Not every page has to be heavy. Some of the best memories are the
          ones that make you laugh.
        </p>
        <div className="mx-auto mt-12 max-w-2xl">
          <VideoFeature
            src={FAMILY_HAIR_VIDEO.src}
            poster={FAMILY_HAIR_VIDEO.poster}
            label={FAMILY_HAIR_VIDEO.label}
            tone="playful"
          />
        </div>
      </div>
    </section>
  );
}
