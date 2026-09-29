"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Heart, Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SecretEnvelope } from "@/components/secret/SecretEnvelope";
import { SecretLock } from "@/components/secret/SecretLock";
import { secretContent } from "@/data/secret";

export function SecretMessage() {
  const [isLockOpen, setIsLockOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const unlockButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.style.overflow = isLockOpen || isUnlocked ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isLockOpen, isUnlocked]);

  useEffect(() => {
    if (!isLockOpen && !isUnlocked) unlockButtonRef.current?.focus();
  }, [isLockOpen, isUnlocked]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }} className="flex min-h-128 flex-col items-center justify-center text-center">
      <div className="heartbeat-glow relative flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af6a]/45 text-[#d4af6a]" aria-hidden="true"><Lock size={22} /><Heart size={12} className="absolute bottom-0 right-0 fill-current text-[#e7a8b5]" /></div>
      <div className="mt-6 text-[0.68rem] uppercase tracking-[0.42em] text-[#d4af6a]">{secretContent.lockTitle}</div>
      <p className="mt-6 font-display text-4xl text-[#f5e6d3] sm:text-6xl">{secretContent.lockIntro}</p>
      <button ref={unlockButtonRef} type="button" onClick={() => setIsLockOpen(true)} className="mt-10 min-h-12 border border-[#d4af6a]/55 px-8 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-[#f5e6d3] transition hover:bg-[#4a1020]/55 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{secretContent.unlockLabel}</button>

      <AnimatePresence>
        {isLockOpen && <SecretLock onClose={() => setIsLockOpen(false)} onUnlock={() => { setIsLockOpen(false); setIsUnlocked(true); }} />}
        {isUnlocked && <SecretEnvelope onClose={() => setIsUnlocked(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}