"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BlowInteraction } from "@/components/cake/BlowInteraction";
import { CakeScene } from "@/components/cake/CakeScene";
import { FinalGiftSection } from "@/components/final-gift/FinalGiftSection";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { cakeConfig, cakeContent } from "@/data/cake";

type CakeState = "intro" | "cake-revealing" | "ready-to-blow" | "extinguishing" | "wished" | "completed";
type WishStage = "waiting" | "input" | "processing" | "failed" | "completed";

export function CakeSection() {
  const shouldReduceMotion = useReducedMotion();
  const [state, setState] = useState<CakeState>("intro");
  const [extinguishRequested, setExtinguishRequested] = useState(false);
  const [extinguished, setExtinguished] = useState(false);
  const [wishStage, setWishStage] = useState<WishStage>("waiting");
  const [wishErrorMessage, setWishErrorMessage] = useState("");
  const [wishText, setWishText] = useState("");
  const mountedRef = useRef(true);
  const deliveryLockRef = useRef(false);

  useEffect(() => {
    if (state !== "cake-revealing") return;
    const timeout = window.setTimeout(() => setState("ready-to-blow"), shouldReduceMotion ? 40 : 1300);
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion, state]);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

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

  const sendTypedWish = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (deliveryLockRef.current || wishStage !== "input" || !wishText.trim()) return;
    deliveryLockRef.current = true;
    if (mountedRef.current) {
      setWishStage("processing");
      setWishErrorMessage("");
    }

    try {
      const response = await fetch("/api/private-wish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wish: wishText.trim() }),
        cache: "no-store",
      });
      if (!mountedRef.current) return;
      if (response.status === 503) {
        setWishErrorMessage(cakeContent.wishDeliveryFailedMessage);
        setWishStage("failed");
        return;
      }
      if (!response.ok) {
        setWishErrorMessage(cakeContent.wishDeliveryFailedMessage);
        setWishStage("failed");
        return;
      }
      const result = await response.json() as { delivered?: boolean };
      if (!mountedRef.current) return;
      if (result.delivered) {
        setWishText("");
        setWishStage("completed");
      } else {
        setWishErrorMessage(cakeContent.wishDeliveryFailedMessage);
        setWishStage("failed");
      }
    } catch {
      if (mountedRef.current) {
        setWishErrorMessage(cakeContent.wishDeliveryFailedMessage);
        setWishStage("failed");
      }
    } finally {
      deliveryLockRef.current = false;
    }
  };

  if (state === "completed") return <FinalGiftSection />;

  return (
    <section id="birthday-cake" className="relative overflow-hidden bg-[#050505] px-6 py-28 sm:px-10 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(123,32,56,0.26),transparent_38%),radial-gradient(circle_at_50%_82%,rgba(212,175,106,0.08),transparent_24%)]" />
      {state === "extinguishing" && <motion.div className="pointer-events-none absolute inset-0 bg-[#050505]" initial={{ opacity: 0 }} animate={{ opacity: 0.32 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.45 }} aria-hidden="true" />}
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
            {state === "wished" && (
              <motion.div
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 0.6 }}
                className="relative flex w-full flex-col items-center"
              >
                <div className="pointer-events-none absolute inset-x-[-25vw] top-1/2 h-10" aria-hidden="true">
                  {[...Array(12)].map((_, index) => {
                    const particleStyle = { "--burst-x": `${(index % 2 ? 1 : -1) * (70 + index * 11)}px`, "--burst-y": `${-18 - (index % 4) * 16}px`, "--burst-rotate": `${index * 28}deg` } as React.CSSProperties;
                    return index === 0
                      ? <Heart key="wish-heart" size={15} className="celebration-burst absolute left-1/2 top-1/2 fill-[#e7a8b5] text-[#e7a8b5]" style={particleStyle} />
                      : <span key={index} className="celebration-burst absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-[#d4af6a] shadow-[0_0_12px_rgba(212,175,106,0.8)]" style={particleStyle} />;
                  })}
                </div>
                {wishStage === "waiting" && (
                  <>
                    <h2 className="relative z-10 font-display text-5xl text-[#d4af6a] sm:text-8xl">{cakeContent.wishedTitle}</h2>
                    <button type="button" onClick={() => setWishStage("input")} className="relative z-10 mt-8 min-h-12 max-w-full border border-[#d4af6a]/55 px-5 py-3 text-[0.65rem] uppercase tracking-[0.2em] text-[#f5e6d3] transition hover:bg-[#4a1020]/55 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{cakeContent.openWishLabel}</button>
                  </>
                )}
                {wishStage === "input" && (
                  <>
                    <h2 className="relative z-10 font-display text-4xl text-[#d4af6a] sm:text-5xl">{cakeContent.wishInputTitle}</h2>
                    <p className="relative z-10 mt-5 max-w-xl font-display text-2xl text-[#f5e6d3]/80">{cakeContent.wishGuidance}</p>
                    {wishErrorMessage && <p role="alert" className="relative z-10 mt-4 text-sm text-[#e7a8b5]">{wishErrorMessage}</p>}
                    <form onSubmit={sendTypedWish} className="relative z-10 mt-10 flex w-full max-w-xl flex-col items-center gap-5">
                      <textarea aria-label="Birthday wish" maxLength={2000} value={wishText} onChange={(event) => setWishText(event.target.value)} placeholder={cakeContent.wishPlaceholder} className="min-h-32 w-full resize-y border border-[#f5e6d3]/20 bg-[#0b0b10]/70 p-4 text-base leading-7 text-[#f5e6d3] outline-none placeholder:text-[#f5e6d3]/35 focus:border-[#d4af6a]" />
                      <button type="submit" disabled={!wishText.trim()} className="min-h-12 max-w-full border border-[#d4af6a]/55 px-7 py-3 text-[0.65rem] uppercase tracking-[0.25em] text-[#f5e6d3] transition hover:bg-[#4a1020]/55 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{cakeContent.wishSubmitLabel}</button>
                    </form>
                  </>
                )}
                {wishStage === "processing" && <p className="relative z-10 font-display text-3xl text-[#f5e6d3]">{cakeContent.wishSendingLabel}</p>}
                {wishStage === "failed" && (
                  <>
                    <p role="alert" className="relative z-10 max-w-xl font-display text-2xl text-[#f5e6d3]">{wishErrorMessage}</p>
                    <button type="button" onClick={() => { setWishErrorMessage(""); setWishStage("input"); }} className="relative z-10 mt-8 min-h-12 max-w-full border border-[#d4af6a]/55 px-7 py-3 text-[0.65rem] uppercase tracking-[0.25em] text-[#f5e6d3] transition hover:bg-[#4a1020]/55 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{cakeContent.wishRetryLabel}</button>
                  </>
                )}
                {wishStage === "completed" && (
                  <>
                    <h2 className="relative z-10 font-display text-4xl text-[#d4af6a] sm:text-6xl">{cakeContent.wishCompletionTitle}</h2>
                    <p className="relative z-10 mt-5 max-w-xl font-display text-3xl leading-tight text-[#f5e6d3]/80 sm:text-5xl">{cakeContent.wishCompletionText}</p>
                    <button type="button" onClick={() => setState("completed")} className="relative z-10 mt-8 min-h-12 max-w-full border border-[#d4af6a]/55 px-6 py-3 text-[0.65rem] uppercase tracking-[0.22em] text-[#f5e6d3] transition hover:bg-[#4a1020]/55 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{cakeContent.continueLabel}</button>
                  </>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}