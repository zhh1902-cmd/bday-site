"use client";

import { ArrowLeft, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type OnlyUsExperienceProps = {
  onClose: () => void;
};

type ExperienceStage = "heart" | "pause" | "message" | "between" | "final";

const waitMessage = "Koncham sepu aagara Sri Mathi Garu ❤️";
const heartMessage = "Ikkada nuvvu anukunnattu alanti pictures em levu.\nIdi cheppadanike petta.\nDachukodaniki em levu. ❤️";
const betweenMessage = "Mana kosam special ga oka album avasaram ledu..\nManaku private antu em ledu.\nUnna anni rojulu enjoy cheyadame,\naa memories ni heart lo save chesukuntam anthe.\nLaptop, phone lo pette memories kaadu ivi...\nmana heart lo save cheskune memories. ❤️";

export function OnlyUsExperience({ onClose }: OnlyUsExperienceProps) {
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<ExperienceStage>("heart");
  const [canGoBack, setCanGoBack] = useState(false);
  const canGoBackRef = useRef(false);
  const autoCloseTimerRef = useRef<number | null>(null);
  const didAutoCloseRef = useRef(false);
  const duration = shouldReduceMotion ? 0 : 0.85;

  const startMessageSequence = () => {
    canGoBackRef.current = false;
    setCanGoBack(false);
    setStage("pause");
  };

  const goBack = () => {
    if (!canGoBack || !canGoBackRef.current || stage !== "message") return;

    canGoBackRef.current = false;
    setCanGoBack(false);
    setStage("between");
  };

  useEffect(() => {
    if (stage !== "pause" && stage !== "between") return;
    const nextStage = stage === "pause" ? "message" : "final";
    const timeout = window.setTimeout(() => setStage(nextStage), stage === "pause" ? 1900 : 2500);
    return () => window.clearTimeout(timeout);
  }, [stage]);

  useEffect(() => () => {
    if (autoCloseTimerRef.current !== null) {
      window.clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#09050a] px-6 py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.65 }}
      role="dialog"
      aria-modal="true"
      aria-label="Only Us"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(104,27,53,0.42),transparent_39%),radial-gradient(ellipse_at_50%_100%,rgba(74,16,32,0.32),transparent_52%),linear-gradient(145deg,#09050a_8%,#160812_52%,#0b060b)]" />
      <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,247,239,0.7)_0.7px,transparent_0.8px)] [background-size:37px_37px]" />
      <motion.div className="pointer-events-none absolute left-[18%] top-[24%] h-40 w-40 rounded-full bg-[#9b3d5b]/10 blur-3xl" animate={shouldReduceMotion ? undefined : { scale: [1, 1.18, 1], opacity: [0.45, 0.75, 0.45] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="pointer-events-none absolute bottom-[18%] right-[16%] h-52 w-52 rounded-full bg-[#d4af6a]/[0.07] blur-3xl" animate={shouldReduceMotion ? undefined : { scale: [1.15, 1, 1.15], opacity: [0.6, 0.35, 0.6] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />

      {stage === "message" && canGoBack && (
        <button
          type="button"
          onClick={goBack}
          className="absolute right-5 top-5 z-10 flex h-11 w-11 items-center justify-center text-[#f5e6d3]/55 transition hover:text-[#e4c58a] focus-visible:outline-2 focus-visible:outline-[#d4af6a] sm:right-9 sm:top-8"
          aria-label="Back"
        >
          <X size={19} strokeWidth={1.4} aria-hidden="true" />
        </button>
      )}

      <div className="relative z-[1] flex w-full max-w-4xl flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {stage === "heart" && (
            <motion.button
              key="heart"
              type="button"
              onClick={startMessageSequence}
              className="flex h-32 w-32 items-center justify-center rounded-full text-[3.35rem] leading-none focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#d4af6a]"
              aria-label="Continue"
              initial={{ opacity: 0, scale: 0.76, y: shouldReduceMotion ? 0 : 18 }}
              animate={{ opacity: 1, scale: 1, y: shouldReduceMotion ? 0 : [0, -7, 0], textShadow: shouldReduceMotion ? "0 0 24px rgba(231,168,181,0.36)" : ["0 0 20px rgba(231,168,181,0.25)", "0 0 42px rgba(231,168,181,0.52)", "0 0 20px rgba(231,168,181,0.25)"] }}
              exit={{ opacity: 0, scale: 0.84, transition: { duration } }}
              transition={{ opacity: { duration }, scale: { duration }, y: { duration: 4.2, repeat: Infinity, ease: "easeInOut" }, textShadow: { duration: 3.8, repeat: Infinity, ease: "easeInOut" } }}
            >
              ❤️
            </motion.button>
          )}

          {stage === "pause" && (
            <motion.p
              key="pause"
              className="font-display text-lg leading-8 text-[#f5e6d3] sm:text-2xl"
              role="status"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, transition: { duration } }}
              transition={{ duration }}
            >
              <span className="border-b border-[#d4af6a]/45 px-3 pb-2 shadow-[0_12px_30px_rgba(104,27,53,0.22)]">{waitMessage}</span>
            </motion.p>
          )}

          {(stage === "message" || stage === "between" || stage === "final") && (
            <motion.div
              key={stage}
              className="flex w-full flex-col items-center"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, filter: shouldReduceMotion ? "none" : "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12, transition: { duration } }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1] }}
              onAnimationComplete={() => {
                if (stage === "message") {
                  canGoBackRef.current = true;
                  setCanGoBack(true);
                }
                if (stage === "final" && autoCloseTimerRef.current === null && !didAutoCloseRef.current) {
                  autoCloseTimerRef.current = window.setTimeout(() => {
                    if (didAutoCloseRef.current) return;
                    didAutoCloseRef.current = true;
                    autoCloseTimerRef.current = null;
                    onClose();
                  }, 5000);
                }
              }}
            >
              {stage !== "final" ? (
                <>
                  <p className="whitespace-pre-line font-display text-[1.55rem] leading-[1.65] text-[#f8eadc] sm:text-4xl sm:leading-[1.55]">{stage === "message" ? heartMessage : betweenMessage}</p>
                  {stage === "message" && canGoBack && (
                    <button
                      type="button"
                      onClick={goBack}
                      className="mt-12 inline-flex min-h-11 items-center gap-2 border-b border-[#d4af6a]/45 px-2 text-[0.63rem] uppercase tracking-[0.24em] text-[#e4c58a] transition hover:border-[#e4c58a] hover:text-[#fff7ef] focus-visible:outline-2 focus-visible:outline-[#d4af6a]"
                    >
                      <ArrowLeft size={14} strokeWidth={1.4} aria-hidden="true" />
                      Back
                    </button>
                  )}
                </>
              ) : (
                <p className="mt-3 font-display text-xl text-[#e4c58a] sm:text-2xl">Mana iddari madhya dachukovalsindi em ledu... anni mana memories eh. ❤️</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}