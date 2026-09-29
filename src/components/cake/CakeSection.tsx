"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { BlowInteraction } from "@/components/cake/BlowInteraction";
import { CakeScene } from "@/components/cake/CakeScene";
import { FinalGiftSection } from "@/components/final-gift/FinalGiftSection";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { cakeConfig, cakeContent } from "@/data/cake";

type CakeState = "intro" | "cake-revealing" | "ready-to-blow" | "extinguishing" | "wished" | "completed";

export function CakeSection() {
  const shouldReduceMotion = useReducedMotion();
  const [state, setState] = useState<CakeState>("intro");
  const [extinguishRequested, setExtinguishRequested] = useState(false);
  const [extinguished, setExtinguished] = useState(false);

  useEffect(() => {
    if (state !== "cake-revealing") return;
    const timeout = window.setTimeout(() => setState("ready-to-blow"), shouldReduceMotion ? 40 : 1300);
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion, state]);

  useEffect(() => {
    if (state !== "extinguishing") return;
    const timeout = window.setTimeout(() => {
      setExtinguished(true);
      setState("wished");
    }, shouldReduceMotion ? 40 : cakeConfig.extinguishDurationMs);
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion, state]);

  const begin = () => setState("cake-revealing");
  const blow = () => {
    if (state !== "ready-to-blow") return;
    setExtinguishRequested(true);
    setState("extinguishing");
  };

  if (state === "completed") return <FinalGiftSection />;

  return (
    <section id="birthday-cake" className="relative overflow-hidden bg-[#050505] px-6 py-28 sm:px-10 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(123,32,56,0.26),transparent_38%),radial-gradient(circle_at_50%_82%,rgba(212,175,106,0.08),transparent_24%)]" />
      <RomanticAtmosphere hearts sparkles />
      <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col items-center justify-center text-center">
        {state === "intro" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex min-h-[60vh] flex-col items-center justify-center">
            <div className="mb-6 text-[0.68rem] uppercase tracking-[0.44em] text-[#d4af6a]">{cakeContent.eyebrow}</div>
            <h2 className="font-display text-5xl text-[#f5e6d3] sm:text-8xl">{cakeContent.introTitle}</h2>
            <p className="mt-7 font-display text-4xl text-[#d4af6a] sm:text-6xl">{cakeContent.title}</p>
            <button type="button" onClick={begin} className="mt-10 min-h-12 border border-[#d4af6a]/55 px-8 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-[#f5e6d3] transition hover:bg-[#4a1020]/55 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{cakeContent.revealLabel}</button>
          </motion.div>
        )}

        {state !== "intro" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: shouldReduceMotion ? 0.01 : 1 }} className="flex w-full flex-col items-center">
            <CakeScene extinguishRequested={extinguishRequested} extinguished={extinguished} />
            {state === "cake-revealing" && <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#d4af6a]">{cakeContent.title}</p>}
            {state === "ready-to-blow" && <div className="w-full"><p className="font-display text-4xl text-[#f5e6d3] sm:text-6xl">{cakeContent.instruction}</p><div className="mt-6"><BlowInteraction onBlow={blow} /></div></div>}
            {state === "extinguishing" && <p className="font-display text-4xl text-[#d4af6a] sm:text-6xl">{cakeContent.extinguishingLabel}</p>}
            {state === "wished" && <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative flex flex-col items-center"><div className="pointer-events-none absolute inset-x-[-25vw] top-1/2 h-10" aria-hidden="true">{[...Array(12)].map((_, index) => <span key={index} className="celebration-burst absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#d4af6a] shadow-[0_0_12px_rgba(212,175,106,0.8)]" style={{ "--burst-x": `${(index % 2 ? 1 : -1) * (70 + index * 11)}px`, "--burst-y": `${-18 - (index % 4) * 16}px`, "--burst-rotate": `${index * 28}deg` } as React.CSSProperties} />)}</div><h2 className="relative z-10 font-display text-6xl text-[#d4af6a] sm:text-8xl">{cakeContent.wishedTitle}</h2><p className="relative z-10 mt-5 font-display text-3xl text-[#f5e6d3]/80 sm:text-5xl">{cakeContent.wishedText}</p><button type="button" onClick={() => setState("completed")} className="relative z-10 mt-10 min-h-12 border border-[#d4af6a]/55 px-8 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-[#f5e6d3] transition hover:bg-[#4a1020]/55 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{cakeContent.continueLabel}</button></motion.div>}
          </motion.div>
        )}
      </div>
    </section>
  );
}