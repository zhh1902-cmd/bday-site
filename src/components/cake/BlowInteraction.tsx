"use client";

import { useEffect, useRef, useState } from "react";

import { cakeConfig, cakeContent } from "@/data/cake";

type BlowInteractionProps = {
  onBlow: () => void;
};

export function BlowInteraction({ onBlow }: BlowInteractionProps) {
  const [isListening, setIsListening] = useState(false);
  const mountedRef = useRef(true);
  const operationRef = useRef(false);
  const streamRef = useRef<MediaStream | null>(null);
  const contextRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const lowPassRef = useRef<BiquadFilterNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const frameRef = useRef<number | null>(null);
  const fallbackTimerRef = useRef<number | null>(null);
  const sustainedStartRef = useRef<number | null>(null);
  const calibrationStartRef = useRef<number | null>(null);
  const calibrationTotalRef = useRef(0);
  const calibrationSamplesRef = useRef(0);
  const ambientRmsRef = useRef(0);
  const isCalibratedRef = useRef(false);
  const completedRef = useRef(false);

  const cleanup = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    if (fallbackTimerRef.current !== null) window.clearTimeout(fallbackTimerRef.current);
    fallbackTimerRef.current = null;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    filterRef.current?.disconnect();
    filterRef.current = null;
    lowPassRef.current?.disconnect();
    lowPassRef.current = null;
    analyserRef.current?.disconnect();
    analyserRef.current = null;
    const audioContext = contextRef.current;
    if (audioContext && audioContext.state !== "closed") void audioContext.close().catch(() => undefined);
    contextRef.current = null;
    sustainedStartRef.current = null;
    calibrationStartRef.current = null;
    calibrationTotalRef.current = 0;
    calibrationSamplesRef.current = 0;
    ambientRmsRef.current = 0;
    isCalibratedRef.current = false;
    operationRef.current = false;
    if (mountedRef.current) setIsListening(false);
  };

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      cleanup();
    };
  }, []);

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
    const mean = data.reduce((sum, value) => sum + value, 0) / data.length;
    const squaredDeviation = data.reduce((sum, value) => sum + ((value - mean) / 128) ** 2, 0);
    const rms = Math.sqrt(squaredDeviation / data.length);
    const peakToPeak = (Math.max(...data) - Math.min(...data)) / 128;

    if (calibrationStartRef.current === null) calibrationStartRef.current = timestamp;
    if (!isCalibratedRef.current && timestamp - calibrationStartRef.current < cakeConfig.microphoneBaselineMs) {
      calibrationTotalRef.current += rms;
      calibrationSamplesRef.current += 1;
      frameRef.current = requestAnimationFrame(analyze);
      return;
    }
    if (!isCalibratedRef.current) {
      ambientRmsRef.current = calibrationSamplesRef.current > 0
        ? calibrationTotalRef.current / calibrationSamplesRef.current
        : 0;
      isCalibratedRef.current = true;
    }

    const blowThreshold = Math.max(
      cakeConfig.microphoneMinimumRms,
      ambientRmsRef.current * cakeConfig.microphoneNoiseMultiplier + cakeConfig.microphoneNoiseMargin,
    );
    if (rms > blowThreshold && peakToPeak >= cakeConfig.microphoneMinimumPeakToPeak) {
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
    if (operationRef.current || completedRef.current) return;
    operationRef.current = true;
    setIsListening(true);
    fallbackTimerRef.current = window.setTimeout(completeBlow, cakeConfig.microphoneSafetyTimeoutMs);
    if (!window.isSecureContext) {
      completeBlow();
      return;
    }
    const getUserMedia = navigator.mediaDevices?.getUserMedia?.bind(navigator.mediaDevices);
    if (!getUserMedia) {
      completeBlow();
      return;
    }

    try {
      const audioWindow = window as Window & typeof globalThis & { webkitAudioContext?: typeof AudioContext };
      const AudioContextConstructor = audioWindow.AudioContext || audioWindow.webkitAudioContext;
      if (!AudioContextConstructor) throw new Error("audio_context_unavailable");
      const audioContext = new AudioContextConstructor();
      contextRef.current = audioContext;
      await audioContext.resume();
      if (completedRef.current || !mountedRef.current) return;

      const stream = await getUserMedia({ audio: true });
      if (completedRef.current || !mountedRef.current) {
        stream.getTracks().forEach((track) => track.stop());
        return;
      }
      streamRef.current = stream;
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.15;
      const filter = audioContext.createBiquadFilter();
      filter.type = "highpass";
      filter.frequency.value = 90;
      const lowPass = audioContext.createBiquadFilter();
      lowPass.type = "lowpass";
      lowPass.frequency.value = 1800;
      const source = audioContext.createMediaStreamSource(stream);
      source.connect(filter);
      filter.connect(lowPass);
      lowPass.connect(analyser);
      sourceRef.current = source;
      filterRef.current = filter;
      lowPassRef.current = lowPass;
      analyserRef.current = analyser;
      setIsListening(true);
      frameRef.current = requestAnimationFrame(analyze);
    } catch (cause) {
      void cause;
      if (mountedRef.current) completeBlow();
      else cleanup();
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <p className="mx-auto max-w-xl text-sm leading-7 text-[#f5e6d3]/55">{cakeContent.microphoneExplanation}</p>
      {isListening && <p className="mt-5 text-[0.65rem] uppercase tracking-[0.28em] text-[#d4af6a]" aria-live="polite">{cakeContent.listeningLabel}</p>}
      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={() => void startMicrophone()} disabled={isListening} className="min-h-12 border border-[#d4af6a]/60 bg-[#4a1020]/45 px-6 py-3 text-[0.64rem] uppercase tracking-[0.25em] text-[#f5e6d3] transition hover:bg-[#7b2038]/60 disabled:cursor-wait disabled:opacity-70 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{isListening ? cakeContent.listeningLabel : cakeContent.microphoneButton}</button>
      </div>
    </div>
  );
}