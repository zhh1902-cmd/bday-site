import { JourneyIntro } from "@/components/journey/JourneyIntro";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";

export function JourneySection() {
  return (
    <section id="our-journey" className="relative overflow-hidden bg-[#09070a] px-6 py-28 sm:px-10 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(123,32,56,0.22),transparent_34%),radial-gradient(circle_at_20%_58%,rgba(212,175,106,0.06),transparent_24%)]" />
      <RomanticAtmosphere hearts sparkles />
      <div className="relative mx-auto max-w-6xl">
        <JourneyIntro />
        <JourneyTimeline />
      </div>
    </section>
  );
}