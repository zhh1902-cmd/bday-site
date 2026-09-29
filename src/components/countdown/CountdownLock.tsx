"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock3, Heart, Lock, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { BirthdayExperience } from "@/components/birthday/BirthdayExperience";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { birthdayConfig } from "@/data/birthday";

type CountdownValues = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeRemaining(targetTime: number): CountdownValues {
  const difference = Math.max(targetTime - Date.now(), 0);

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

type CountdownDreamscapeProps = {
  timeLeft: CountdownValues;
  isLoading?: boolean;
};

function CountdownDreamscape({ timeLeft, isLoading = false }: CountdownDreamscapeProps) {
  const segments = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown-dreamscape relative min-h-svh overflow-hidden bg-[#09050a] text-[#f8eadc]">
      <div className="countdown-light countdown-light-wine absolute -left-32 -top-24 h-120 w-120 rounded-full" />
      <div className="countdown-light countdown-light-rose absolute left-1/2 top-[30%] h-112 w-md -translate-x-1/2 rounded-full" />
      <div className="countdown-light countdown-light-gold absolute -bottom-40 -right-32 h-120 w-120 rounded-full" />
      <div className="countdown-ghost-heart absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" aria-hidden="true"><Heart className="h-full w-full" strokeWidth={0.55} /></div>
      <div className="countdown-ribbon countdown-ribbon-one absolute" aria-hidden="true" />
      <div className="countdown-ribbon countdown-ribbon-two absolute" aria-hidden="true" />
      <RomanticAtmosphere hearts sparkles balloons />

      <main className="relative z-10 flex min-h-svh items-center justify-center px-6 py-12 sm:px-10">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative w-full max-w-5xl text-center"
        >
          <div className="mb-8 flex items-center justify-center gap-4 text-[0.63rem] uppercase tracking-[0.42em] text-[#e4c58a] sm:mb-10">
            <Sparkles size={13} aria-hidden="true" />
            <span>{birthdayConfig.countdown.label}</span>
            <Sparkles size={13} aria-hidden="true" />
          </div>

          <h1 className="mx-auto max-w-4xl font-display leading-[0.9]">
            <span className="block text-5xl text-[#fff7ef] sm:text-8xl md:text-9xl">{birthdayConfig.countdown.headingPrimary}</span>
            <span className="mt-4 block font-display text-3xl italic text-[#e7a8b5]/85 sm:text-5xl md:text-6xl">{birthdayConfig.countdown.headingSecondary}</span>
          </h1>

          <div className="mx-auto mt-12 max-w-4xl sm:mt-16">
            <p className="mb-5 text-[0.62rem] uppercase tracking-[0.36em] text-[#f8eadc]/55">Your surprise unlocks in</p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
              {segments.map((segment) => (
                <div key={segment.label} className="countdown-segment relative px-3 py-5 sm:px-5 sm:py-7">
                  <div className="countdown-segment-glow absolute inset-0 rounded-2xl" aria-hidden="true" />
                  <div className="relative font-display text-5xl leading-none text-[#fff7ef] sm:text-7xl">
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span key={`${segment.label}-${segment.value}`} initial={{ opacity: 0.35, y: 8, filter: "blur(4px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.35 }} className="block">{String(segment.value).padStart(2, "0")}</motion.span>
                    </AnimatePresence>
                  </div>
                  <div className="relative mt-4 text-[0.58rem] uppercase tracking-[0.3em] text-[#e4c58a]/75">{segment.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-10 h-px max-w-xl bg-linear-to-r from-transparent via-[#d4af6a]/60 to-transparent sm:mt-12" />
          <p className="mt-7 font-display text-xl italic text-[#f8eadc]/65 sm:text-2xl">{birthdayConfig.countdown.subline}</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 text-[#e4c58a]/80 sm:mt-12 sm:flex-row sm:gap-4">
            <Lock size={15} aria-hidden="true" />
            <span className="text-[0.64rem] uppercase tracking-[0.3em]">{birthdayConfig.countdown.lockedLabel}</span>
          </div>
          <p className="mt-3 text-sm text-[#f8eadc]/42">{birthdayConfig.countdown.lockedDescription}</p>

          <div className="mt-12 flex items-center justify-center gap-3 text-[0.58rem] uppercase tracking-[0.32em] text-[#e7a8b5]/45 sm:mt-16">
            <Heart size={11} className="fill-current" aria-hidden="true" />
            <span>{birthdayConfig.countdown.footerLine}</span>
            <Heart size={11} className="fill-current" aria-hidden="true" />
          </div>
        </motion.section>
      </main>

      {isLoading && <span className="sr-only">Loading birthday countdown</span>}
      <div className="pointer-events-none absolute bottom-5 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[#e4c58a]/35 sm:flex sm:text-[0.58rem] sm:uppercase sm:tracking-[0.34em]">
        <Clock3 size={12} aria-hidden="true" />
        <span>the story is waiting</span>
      </div>
    </div>
  );
}

export function CountdownLock() {
  const targetTimestamp = useMemo(
    () => new Date(birthdayConfig.birthday.targetDateTime).getTime(),
    [],
  );

  const [timeLeft, setTimeLeft] = useState<CountdownValues>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initializeTimer = () => {
      const nextTime = getTimeRemaining(targetTimestamp);
      setTimeLeft(nextTime);
      setIsUnlocked(Date.now() >= targetTimestamp);
      setIsReady(true);
    };

    initializeTimer();

    if (Date.now() >= targetTimestamp) {
      return;
    }

    const interval = window.setInterval(() => {
      const nextTime = getTimeRemaining(targetTimestamp);
      setTimeLeft(nextTime);
      setIsUnlocked(Date.now() >= targetTimestamp);
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetTimestamp]);

  if (!isReady) {
    return <CountdownDreamscape timeLeft={timeLeft} isLoading />;
  }

  if (isUnlocked) {
    return <BirthdayExperience />;
  }

  return <CountdownDreamscape timeLeft={timeLeft} />;
}
