import { CalendarDays } from "lucide-react";

import { BirthdayStats } from "@/components/birthday/BirthdayStats";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { birthdayConfig } from "@/data/birthday";

export function BirthdayInfo() {
  const { birthday, intro, partnerName } = birthdayConfig;

  return (
    <section id="birthday-information" className="relative overflow-hidden bg-[#0b0b10] px-6 py-24 sm:px-10 sm:py-36">
      <div className="pointer-events-none absolute -right-32 top-24 h-80 w-80 rounded-full bg-[#4a1020]/30 blur-3xl" />
      <RomanticAtmosphere hearts={false} balloons sparkles />
      <div className="relative mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <p className="mb-6 text-[0.68rem] uppercase tracking-[0.42em] text-[#d4af6a]">A day worth remembering</p>
          <h2 className="font-display text-4xl leading-tight text-[#f5e6d3] sm:text-6xl">{intro.title}</h2>
          <p className="mt-8 max-w-2xl text-base leading-8 text-[#f5e6d3]/65 sm:text-lg">{intro.description}</p>
        </div>

        <div className="mt-14 grid gap-8 border-l border-[#d4af6a]/40 pl-6 sm:grid-cols-3 sm:gap-12">
          <div className="border-t border-[#d4af6a]/35 px-1 pt-5">
            <div className="text-[0.65rem] uppercase tracking-[0.3em] text-[#f5e6d3]/45">Name</div>
            <div className="mt-3 font-display text-3xl text-[#f5e6d3]">{partnerName}</div>
          </div>
          <div className="border-t border-[#d4af6a]/35 px-1 pt-5">
            <div className="flex items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-[#f5e6d3]/45">
              <CalendarDays size={13} /> Date of birth
            </div>
            <div className="mt-3 font-display text-3xl text-[#f5e6d3]">{birthday.date}</div>
          </div>
          <div className="border-t border-[#d4af6a]/35 px-1 pt-5">
            <div className="text-[0.65rem] uppercase tracking-[0.3em] text-[#f5e6d3]/45">Birthday / age</div>
            <div className="mt-3 font-display text-3xl text-[#f5e6d3]">{birthday.age}</div>
          </div>
        </div>

        <BirthdayStats />
      </div>
    </section>
  );
}