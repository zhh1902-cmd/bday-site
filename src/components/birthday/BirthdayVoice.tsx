"use client";

import { useRef, useState } from "react";

type BirthdayVoiceProps = {
  enabled: boolean;
};

export function BirthdayVoice({ enabled }: BirthdayVoiceProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playbackInProgressRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  const finishPlayback = () => {
    playbackInProgressRef.current = false;
    setIsStarting(false);
    setIsPlaying(false);
  };

  const failPlayback = (error?: unknown) => {
    if (!playbackInProgressRef.current) return;
    if (error) console.error("Birthday voice playback failed.", error);
    playbackInProgressRef.current = false;
    setIsStarting(false);
    setIsPlaying(false);
    setPlaybackError(true);
  };

  const playBirthdayMessage = () => {
    if (playbackInProgressRef.current) return;

    playbackInProgressRef.current = true;
    setIsStarting(true);
    setPlaybackError(false);
    const recording = audioRef.current ?? new Audio("/audio/birthday/record.mp3");
    audioRef.current = recording;
    recording.onended = finishPlayback;
    recording.onerror = () => failPlayback(new Error("The birthday recording could not be loaded."));

    try {
      void recording.play().then(() => {
        if (playbackInProgressRef.current) {
          setIsStarting(false);
          setIsPlaying(true);
        }
      }).catch(failPlayback);
    } catch (error) {
      failPlayback(error);
    }
  };

  if (!enabled) return null;

  return (
    <section aria-label="Birthday voice message" className="relative z-20 flex flex-col items-center px-4 pt-6 text-center">
      <button
        type="button"
        onClick={playBirthdayMessage}
        disabled={isStarting || isPlaying}
        className="min-h-12 rounded-full border border-[#e4c58a]/65 bg-linear-to-r from-[#4a1020] to-[#681b35] px-7 py-3 text-sm font-medium tracking-wide text-[#fff7ef] shadow-[0_12px_40px_rgba(22,4,14,0.42)] transition hover:border-[#e4c58a] hover:from-[#681b35] hover:to-[#4a1020] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4c58a] disabled:cursor-not-allowed disabled:opacity-75"
      >
        {isPlaying || isStarting ? "Playing your special message… ❤️" : "Play Your Birthday Message ❤️"}
      </button>
      <p aria-live="polite" className="mt-3 min-h-6 text-sm text-[#e7a8b5]">
        {playbackError ? "We couldn’t play your message. Please tap to try again ❤️" : ""}
      </p>
    </section>
  );
}
