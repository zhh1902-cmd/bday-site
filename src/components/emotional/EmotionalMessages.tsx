"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { useState } from "react";

import { SecretMessage } from "@/components/secret/SecretMessage";
import { EmotionalMessageStep } from "@/components/emotional/EmotionalMessageStep";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { emotionalContent, emotionalMessages } from "@/data/messages";

export function EmotionalMessages() {
  const shouldReduceMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const isComplete = currentStep >= emotionalMessages.length;
  const currentMessage = emotionalMessages[currentStep];

  return (
    <section id="emotional-messages" className="relative overflow-hidden bg-[#050505] px-6 py-28 sm:px-10 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(123,32,56,0.22),transparent_40%),radial-gradient(circle_at_50%_80%,rgba(212,175,106,0.06),transparent_24%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-25" aria-hidden="true">
        {[...Array(12)].map((_, index) => <span key={index} className="absolute h-px w-px rounded-full bg-[#d4af6a] shadow-[0_0_16px_4px_rgba(212,175,106,0.65)]" style={{ left: `${(index * 29) % 100}%`, top: `${(index * 37) % 100}%` }} />)}
      </div>
      <RomanticAtmosphere hearts sparkles />
      <div className="relative mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.9, ease: "easeOut" }} className="mx-auto max-w-4xl text-center">
          <div className="mb-6 text-[0.68rem] uppercase tracking-[0.44em] text-[#d4af6a]">{emotionalContent.eyebrow}</div>
          <h2 className="font-display text-5xl leading-none text-[#f5e6d3] sm:text-8xl">{emotionalContent.title}</h2>
          <p className="mt-7 font-display text-3xl text-[#f5e6d3]/75 sm:text-5xl">{emotionalContent.intro}</p>
        </motion.div>

        <AnimatePresence mode="wait" initial={false}>
          {!isComplete && currentMessage && (
            <EmotionalMessageStep key={currentMessage.id} message={currentMessage} step={currentStep + 1} total={emotionalMessages.length} continueLabel={emotionalContent.continueLabel} onContinue={() => setCurrentStep((current) => current + 1)} />
          )}
          {isComplete && !showSecret && (
            <motion.div key="secret-transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.6 }} className="flex min-h-128 flex-col items-center justify-center text-center">
              <div className="heartbeat-glow flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af6a]/40 text-[#d4af6a]" aria-hidden="true"><Heart size={18} className="fill-current" /></div>
              <p className="mt-8 font-display text-4xl text-[#f5e6d3] sm:text-6xl">{emotionalContent.secretTransition}</p>
              <p className="mt-5 max-w-xl text-base leading-8 text-[#f5e6d3]/55 sm:text-lg">{emotionalContent.secretIntro}</p>
              <button type="button" onClick={() => setShowSecret(true)} className="mt-10 min-h-12 border border-[#d4af6a]/45 px-7 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/80 transition hover:border-[#d4af6a] hover:bg-[#4a1020]/45 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">Continue</button>
            </motion.div>
          )}
          {isComplete && showSecret && <SecretMessage key="secret-message" />}
        </AnimatePresence>
      </div>
    </section>
  );
}