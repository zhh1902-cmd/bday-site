"use client";

import { LockKeyhole, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useEffectEvent, useState } from "react";

import { privateAlbumContent } from "@/data/privateAlbum";

type PrivateAlbumAccessProps = {
  onClose: () => void;
  onUnlocked: () => void;
  previewMode: boolean;
};

export function PrivateAlbumAccess({ onClose, onUnlocked, previewMode }: PrivateAlbumAccessProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const reportUnlocked = useEffectEvent(onUnlocked);

  useEffect(() => {
    let active = true;

    void checkSession().then((isUnlocked) => {
      if (active && isUnlocked) reportUnlocked();
      else if (active) setIsCheckingSession(false);
    });

    return () => { active = false; };
  }, []);

  const unlock = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    event.currentTarget.reset();

    try {
      const response = await fetch("/api/private-album/unlock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
        cache: "no-store",
      });

      if (response.status === 401) {
        setErrorMessage(privateAlbumContent.wrongPassword);
        return;
      }
      if (!response.ok) {
        setErrorMessage("Private access is not configured yet.");
        return;
      }

      onUnlocked();
    } catch {
      setErrorMessage("We could not reach the private album. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-[#080509]/98 px-5 py-12 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.35 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="private-album-title"
    >
      <button type="button" onClick={onClose} className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-[#f5e6d3]/20 text-[#f5e6d3]/75 transition hover:border-[#d4af6a] hover:text-[#d4af6a] focus-visible:outline-2 focus-visible:outline-[#d4af6a] sm:right-9 sm:top-8" aria-label="Close private album">
        <X size={20} aria-hidden="true" />
      </button>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,rgba(89,19,48,0.27),transparent_43%),radial-gradient(circle_at_50%_72%,rgba(212,175,106,0.06),transparent_24%)]" />
      <motion.div
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 0.65 }}
        className="relative w-full max-w-md text-center"
      >
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center border border-[#d4af6a]/35 text-[#e8c98e] shadow-[0_0_50px_rgba(119,34,65,0.18)]">
          <LockKeyhole size={25} strokeWidth={1.35} aria-hidden="true" />
        </div>
        {previewMode && <div className="mb-4 text-[0.58rem] uppercase tracking-[0.28em] text-[#d48698]">Development Preview · Password Required</div>}
        <div className="text-[0.62rem] uppercase tracking-[0.38em] text-[#d4af6a]">{privateAlbumContent.eyebrow}</div>
        <h2 id="private-album-title" className="mt-4 font-display text-5xl text-[#f5e6d3] sm:text-6xl">{privateAlbumContent.name}</h2>
        <p className="mt-3 font-display text-xl text-[#f5e6d3]/75">{privateAlbumContent.subtitle}</p>
        {isCheckingSession ? (
          <p className="mt-6 text-sm leading-7 text-[#f5e6d3]/55">Mana little secret ki malli vasthunnam... ❤️</p>
        ) : (
          <>
            <p className="mx-auto mt-6 max-w-xs whitespace-pre-line font-display text-2xl leading-8 text-[#f5e6d3]/75">{privateAlbumContent.lockMessage}</p>
            <form onSubmit={unlock} className="mt-9 text-left">
              <label htmlFor="private-album-password" className="mb-2 block text-[0.6rem] uppercase tracking-[0.25em] text-[#d4af6a]/85">Password</label>
              <input
                id="private-album-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                disabled={isSubmitting}
                className="h-12 w-full border border-[#f5e6d3]/20 bg-[#110b10] px-4 text-base text-[#f5e6d3] outline-none transition placeholder:text-[#f5e6d3]/25 focus:border-[#d4af6a]/75 disabled:opacity-60"
              />
              {errorMessage && <p role="alert" className="mt-3 text-sm leading-6 text-[#e3a6ad]">{errorMessage}</p>}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 flex min-h-12 w-full items-center justify-center border border-[#d4af6a]/60 bg-[#4c142d]/55 px-5 text-[0.62rem] uppercase tracking-[0.32em] text-[#f5e6d3] transition hover:border-[#d4af6a] hover:bg-[#641b3b]/65 focus-visible:outline-2 focus-visible:outline-[#d4af6a] disabled:cursor-wait disabled:opacity-55"
              >
                {isSubmitting ? "Koncham sepu agu nana..." : "Unlock"}
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

async function checkSession(): Promise<boolean> {
  try {
    const response = await fetch("/api/private-album/session", { cache: "no-store" });
    if (!response.ok) return false;
    const payload = await response.json() as { unlocked?: boolean };
    return payload.unlocked === true;
  } catch {
    return false;
  }
}