"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { secretContent } from "@/data/secret";

type SecretLockProps = {
  onClose: () => void;
  onUnlock: () => void;
};

export function SecretLock({ onClose, onUnlock }: SecretLockProps) {
  const shouldReduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [hasError, setHasError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setHasError(false);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/secret-letter/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode: value }),
        cache: "no-store",
      });
      if (!response.ok) {
        setHasError(true);
        return;
      }
      setValue("");
      onUnlock();
    } catch {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.45 }} className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 px-6 backdrop-blur-xl" role="dialog" aria-modal="true" aria-labelledby="secret-lock-title">
      <form onSubmit={submit} className="relative w-full max-w-lg border border-[#d4af6a]/25 bg-[#0b0b10]/90 px-6 py-10 text-center shadow-[0_30px_100px_rgba(0,0,0,0.55)] sm:px-12 sm:py-14">
        <button type="button" onClick={onClose} className="absolute right-4 top-4 min-h-11 min-w-11 text-2xl text-[#f5e6d3]/55 transition hover:text-[#d4af6a] focus-visible:ring-2 focus-visible:ring-[#d4af6a]" aria-label="Close private message">×</button>
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#d4af6a]/45 text-[#d4af6a]" aria-hidden="true"><Lock size={22} /></div>
        <h2 id="secret-lock-title" className="mt-6 text-[0.7rem] uppercase tracking-[0.42em] text-[#d4af6a]">{secretContent.lockTitle}</h2>
        <p className="mt-5 font-display text-3xl text-[#f5e6d3]">{secretContent.lockIntro}</p>
        <label htmlFor="secret-word" className="mt-9 block text-left text-[0.65rem] uppercase tracking-[0.25em] text-[#f5e6d3]/55">{secretContent.inputLabel}</label>
        <input ref={inputRef} id="secret-word" type="password" value={value} onChange={(event) => { setValue(event.target.value); setHasError(false); }} disabled={isSubmitting} className="mt-3 min-h-12 w-full border border-[#f5e6d3]/20 bg-[#050505] px-4 text-center text-lg tracking-[0.25em] text-[#f5e6d3] outline-none focus:border-[#d4af6a] disabled:opacity-60" aria-describedby="secret-hint secret-error" autoComplete="off" />
        <p id="secret-hint" className="mt-4 text-sm text-[#f5e6d3]/45">{secretContent.hintLabel}: {secretContent.hint}</p>
        {hasError && <p id="secret-error" className="mt-5 text-sm text-[#b76e79]" role="alert">{secretContent.incorrectMessage}</p>}
        <button type="submit" disabled={isSubmitting} className="mt-8 min-h-12 border border-[#d4af6a]/60 px-8 py-3 text-[0.65rem] uppercase tracking-[0.3em] text-[#f5e6d3] transition hover:bg-[#4a1020]/60 focus-visible:ring-2 focus-visible:ring-[#d4af6a] disabled:cursor-wait disabled:opacity-60">{secretContent.unlockLabel}</button>
      </form>
    </motion.div>
  );
}