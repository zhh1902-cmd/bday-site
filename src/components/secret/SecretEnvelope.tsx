"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MailOpen } from "lucide-react";
import { useEffect, useState } from "react";

import { SecretLetter } from "@/components/secret/SecretLetter";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { secretContent } from "@/data/secret";

type SecretEnvelopeProps = {
  onClose: () => void;
};

export function SecretEnvelope({ onClose }: SecretEnvelopeProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsOpen(true), shouldReduceMotion ? 20 : 850);
    return () => window.clearTimeout(timeout);
  }, [shouldReduceMotion]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.7 }} className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#160b12]/95 px-5 py-10 backdrop-blur-xl" role="dialog" aria-modal="true" aria-label="Private letter">
      <button type="button" onClick={onClose} className="absolute right-5 top-5 z-10 min-h-11 min-w-11 text-2xl text-[#f5e6d3]/70 transition hover:text-[#d4af6a] focus-visible:ring-2 focus-visible:ring-[#d4af6a]" aria-label="Close private letter">×</button>
      <RomanticAtmosphere hearts sparkles />
      <div className="flex min-h-full w-full flex-col items-center justify-center">
        {!isOpen && <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[#d4af6a]" aria-label={secretContent.envelopeLabel}><MailOpen size={74} strokeWidth={1} /></motion.div>}
        {isOpen && <SecretLetter />}
      </div>
    </motion.div>
  );
}