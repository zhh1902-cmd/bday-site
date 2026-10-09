"use client";

import { useEffect, useState } from "react";

const voiceSessionKey = "birthday-voice-2026-10-10";
let spokenInPageSession = false;
let playbackInProgressInPageSession = false;
let recording: HTMLAudioElement | null = null;

type BirthdayVoiceProps = {
  enabled: boolean;
};

type PlaybackBlockedSetter = (blocked: boolean) => void;

function isAutoplayBlocked(error: unknown): boolean {
  return typeof error === "object" && error !== null && "name" in error && error.name === "NotAllowedError";
}

function attemptBirthdayPlayback(setPlaybackBlocked: PlaybackBlockedSetter) {
  if (spokenInPageSession || playbackInProgressInPageSession) return;
  if (recording && !recording.paused) return;

  recording ??= new Audio("/audio/birthday/record.mp3");
  playbackInProgressInPageSession = true;
  setPlaybackBlocked(false);

  const markPlaybackStarted = () => {
    spokenInPageSession = true;
    playbackInProgressInPageSession = false;
    try {
      window.sessionStorage.setItem(voiceSessionKey, "1");
    } catch {
      // In-page state still prevents duplicate playback if storage is unavailable.
    }
  };

  const handlePlaybackError = (error: unknown) => {
    playbackInProgressInPageSession = false;
    if (isAutoplayBlocked(error)) {
      setPlaybackBlocked(true);
    } else {
      console.error("Birthday voice playback failed.", error);
    }
  };

  try {
    void recording.play().then(markPlaybackStarted).catch(handlePlaybackError);
  } catch (error) {
    handlePlaybackError(error);
  }
}

export function BirthdayVoice({ enabled }: BirthdayVoiceProps) {
  const [playbackBlocked, setPlaybackBlocked] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    try {
      if (window.sessionStorage.getItem(voiceSessionKey)) {
        spokenInPageSession = true;
        return;
      }
    } catch {
      if (spokenInPageSession) return;
    }

    const attemptPlaybackOnResume = () => {
      if (document.visibilityState === "visible") attemptBirthdayPlayback(setPlaybackBlocked);
    };

    document.addEventListener("visibilitychange", attemptPlaybackOnResume);
    window.addEventListener("pageshow", attemptPlaybackOnResume);
    attemptBirthdayPlayback(setPlaybackBlocked);

    return () => {
      document.removeEventListener("visibilitychange", attemptPlaybackOnResume);
      window.removeEventListener("pageshow", attemptPlaybackOnResume);
    };
  }, [enabled]);

  if (!enabled || !playbackBlocked || spokenInPageSession) return null;

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <button
        type="button"
        onClick={() => attemptBirthdayPlayback(setPlaybackBlocked)}
        className="rounded-full border border-[#e4c58a]/60 bg-[#21101b]/95 px-6 py-3 text-sm text-[#fff7ef] shadow-[0_12px_40px_rgba(22,4,14,0.5)] backdrop-blur transition hover:border-[#e4c58a] hover:bg-[#4a1020] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e4c58a]"
      >
        Tap to hear the birthday message ❤️
      </button>
    </div>
  );
}