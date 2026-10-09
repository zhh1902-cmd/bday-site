"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { FinalMessage } from "@/components/final-gift/FinalMessage";
import { GiftReveal } from "@/components/final-gift/GiftReveal";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { finalGiftContent } from "@/data/finalGift";

type GiftStage = "wait" | "arrangement" | "gift" | "delivery" | "dont-wait" | "final";

const stageOrder: GiftStage[] = ["wait", "arrangement", "gift", "delivery", "dont-wait", "final"];

export function FinalGiftSection() {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<GiftStage>("wait");

  useEffect(() => {
    const nextStage = stageOrder[stageOrder.indexOf(stage) + 1];
    const duration = finalGiftContent.finalTransitionTiming[stage as keyof typeof finalGiftContent.finalTransitionTiming];
    if (!nextStage || !duration) return;
    const timeout = window.setTimeout(() => setStage(nextStage), shouldReduceMotion ? 80 : duration);
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion, stage]);

  const advance = () => {
    const nextStage = stageOrder[stageOrder.indexOf(stage) + 1];
    if (nextStage) setStage(nextStage);
  };

  const showGift = stage === "gift" || stage === "delivery" || stage === "dont-wait";

  return (
    <section id="final-gift" className="relative min-h-screen overflow-hidden bg-[#030304] px-6 py-16 sm:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(74,16,32,0.38),transparent_38%),radial-gradient(circle_at_50%_90%,rgba(212,175,106,0.08),transparent_30%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        {[...Array(16)].map((_, index) => <span key={index} className="absolute h-px w-px rounded-full bg-[#d4af6a] shadow-[0_0_14px_3px_rgba(212,175,106,0.6)]" style={{ left: `${(index * 17) % 100}%`, top: `${(index * 31) % 100}%` }} />)}
      </div>
      <RomanticAtmosphere hearts sparkles balloons />
      <div className="relative mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl flex-col items-center justify-center text-center">
        <AnimatePresence mode="wait" initial={false}>
          {stage !== "final" ? (
            <motion.div key={stage} initial={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(10px)", y: 10 }} animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} exit={{ opacity: 0, filter: shouldReduceMotion ? "blur(0px)" : "blur(8px)", y: -10 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.7, ease: "easeOut" }} className="flex min-h-[70vh] w-full flex-col items-center justify-center">
              {stage === "wait" && <h2 className="font-display text-6xl text-[#f5e6d3] sm:text-8xl">{finalGiftContent.waitLine}</h2>}
              {stage === "arrangement" && <h2 className="max-w-3xl font-display text-5xl leading-tight text-[#f5e6d3] sm:text-7xl">{finalGiftContent.arrangementLine}</h2>}
              {stage === "gift" && <><GiftReveal visible={showGift} /><button type="button" onClick={advance} className="min-h-12 border border-[#d4af6a]/50 px-7 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/80 transition hover:bg-[#4a1020]/50 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{finalGiftContent.continueLabel}</button></>}
              {stage === "delivery" && <><GiftReveal visible={showGift} /><p className="max-w-3xl font-display text-4xl leading-tight text-[#f5e6d3] sm:text-6xl">{finalGiftContent.deliveryLine}</p><button type="button" onClick={advance} className="mt-10 min-h-12 border border-[#d4af6a]/50 px-7 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/80 transition hover:bg-[#4a1020]/50 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{finalGiftContent.continueLabel}</button></>}
              {stage === "dont-wait" && <><GiftReveal visible={showGift} /><p className="font-display text-5xl text-[#d4af6a] sm:text-8xl">{finalGiftContent.dontWaitLine}</p><button type="button" onClick={advance} className="mt-10 min-h-12 border border-[#d4af6a]/50 px-7 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/80 transition hover:bg-[#4a1020]/50 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{finalGiftContent.continueLabel}</button></>}
            </motion.div>
          ) : <FinalMessage key="final-message" />}
        </AnimatePresence>
      </div>
    </section>
  );
}