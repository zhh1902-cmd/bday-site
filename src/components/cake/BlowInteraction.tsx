"use client";

import { useEffect, useRef, useState } from "react";

import { cakeConfig, cakeContent } from "@/data/cake";

type BlowInteractionProps = {
  onBlow: () => void;
};

export function BlowInteraction({ onBlow }: BlowInteractionProps) {
  const [isListening, setIsListening] = useState(false);
  const [microphoneUnavailable, setMicrophoneUnavailable] = useState(false);
  const [error, setError] = useState("");
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);
  const sustainedStartRef = useRef<number | null>(null);
  const completedRef = useRef(false);

  const cleanup = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    analyserRef.current?.disconnect();
    analyserRef.current = null;
    if (contextRef.current && contextRef.current.state !== "closed") void contextRef.current.close();
    contextRef.current = null;
    sustainedStartRef.current = null;
    setIsListening(false);
  };

  useEffect(() => cleanup, []);

  const completeBlow = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    cleanup();
    onBlow();
  };

  const analyze = (timestamp: number) => {
    const analyser = analyserRef.current;
    if (!analyser || completedRef.current) return;
    const data = new Uint8Array(analyser.fftSize);
    analyser.getByteTimeDomainData(data);
    const rms = Math.sqrt(data.reduce((sum, value) => sum + ((value - 128) / 128) ** 2, 0) / data.length);
    if (rms > cakeConfig.microphoneThreshold) {
      sustainedStartRef.current ??= timestamp;
      if (timestamp - sustainedStartRef.current >= cakeConfig.sustainedBlowMs) {
        completeBlow();
        return;
      }
    } else {
      sustainedStartRef.current = null;
    }
    frameRef.current = requestAnimationFrame(analyze);
  };

  const startMicrophone = async () => {
    if (isListening || completedRef.current) return;
    setError("");
    setMicrophoneUnavailable(false);
    if (!navigator.mediaDevices?.getUserMedia) {
      setMicrophoneUnavailable(true);
      setError("Microphone access is not supported by this browser.");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const audioWindow = window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };
      const AudioContextConstructor = audioWindow.AudioContext || audioWindow.webkitAudioContext;
      if (!AudioContextConstructor) throw new Error("AudioContext unavailable");
      const audioContext = new AudioContextConstructor();
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 512;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(analyser);
      streamRef.current = stream;
      contextRef.current = audioContext;
      sourceRef.current = source;
      analyserRef.current = analyser;
      setIsListening(true);
      frameRef.current = requestAnimationFrame(analyze);
    } catch {
      cleanup();
      setMicrophoneUnavailable(true);
      setError("Microphone access isn't available here.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="mx-auto max-w-xl text-sm leading-7 text-[#f5e6d3]/55">{cakeContent.microphoneExplanation}</p>
      {isListening && <p className="mt-5 text-[0.65rem] uppercase tracking-[0.28em] text-[#d4af6a]" aria-live="polite">{cakeContent.listeningLabel}</p>}
      {error && <p className="mt-5 text-sm text-[#b76e79]" role="alert">{error}</p>}
      {microphoneUnavailable && <p className="mt-3 text-sm text-[#f5e6d3]/55">{cakeContent.fallbackText}</p>}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => void startMicrophone()} disabled={isListening} className="min-h-12 border border-[#d4af6a]/60 bg-[#4a1020]/45 px-6 py-3 text-[0.64rem] uppercase tracking-[0.25em] text-[#f5e6d3] transition hover:bg-[#7b2038]/60 disabled:cursor-wait disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{isListening ? cakeContent.listeningLabel : cakeContent.microphoneButton}</button>
        <button type="button" onClick={completeBlow} className="min-h-12 border border-[#f5e6d3]/25 px-6 py-3 text-[0.64rem] uppercase tracking-[0.25em] text-[#f5e6d3]/80 transition hover:border-[#d4af6a] hover:bg-[#160b12] focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{cakeContent.fallbackLabel}</button>
      </div>
    </div>
  );
}