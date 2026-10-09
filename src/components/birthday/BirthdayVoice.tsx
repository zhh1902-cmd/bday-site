"use client";

import { useEffect } from "react";

const voiceSessionKey = "birthday-voice-2026-10-10";
let spokenInPageSession = false;
let playbackInProgressInPageSession = false;

type BirthdayVoiceProps = {
  enabled: boolean;
};

export function BirthdayVoice({ enabled }: BirthdayVoiceProps) {
  useEffect(() => {
    if (!enabled) return;

    let hasPlayed = false;

    try {
      if (window.sessionStorage.getItem(voiceSessionKey)) return;
    } catch {
      if (spokenInPageSession) return;
    }
    if (spokenInPageSession || playbackInProgressInPageSession) return;

    const recording = new Audio("/audio/birthday/record.mp3");

    const startPlayback = () => {
      if (hasPlayed || playbackInProgressInPageSession) return;
      playbackInProgressInPageSession = true;
      try {
        void recording.play().then(() => {
          hasPlayed = true;
          spokenInPageSession = true;
          playbackInProgressInPageSession = false;
          try {
            window.sessionStorage.setItem(voiceSessionKey, "1");
          } catch {
            // Playback still works if session storage is unavailable.
          }
          window.removeEventListener("pointerdown", startPlayback);
          window.removeEventListener("keydown", startPlayback);
        }).catch(() => {
          playbackInProgressInPageSession = false;
        });
      } catch {
        playbackInProgressInPageSession = false;
      }
    };

    window.addEventListener("pointerdown", startPlayback);
    window.addEventListener("keydown", startPlayback);

    return () => {
      window.removeEventListener("pointerdown", startPlayback);
      window.removeEventListener("keydown", startPlayback);
    };
  }, [enabled]);

  return null;
}