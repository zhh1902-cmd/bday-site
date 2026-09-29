"use client";

import { Heart, Sparkles } from "lucide-react";

type RomanticAtmosphereProps = {
  hearts?: boolean;
  sparkles?: boolean;
  balloons?: boolean;
  className?: string;
};

const positions = [
  { left: "8%", top: "18%", delay: "0s", size: 13 },
  { left: "24%", top: "72%", delay: "-3s", size: 10 },
  { left: "68%", top: "22%", delay: "-6s", size: 15 },
  { left: "88%", top: "66%", delay: "-9s", size: 11 },
];

const sparklePositions = [
  { left: "16%", top: "28%", delay: "-1s", size: 12 },
  { left: "46%", top: "12%", delay: "-2.5s", size: 9 },
  { left: "76%", top: "48%", delay: "-4s", size: 14 },
  { left: "34%", top: "84%", delay: "-5.5s", size: 10 },
  { left: "92%", top: "16%", delay: "-7s", size: 8 },
];

export function RomanticAtmosphere({ hearts = true, sparkles = true, balloons = false, className = "" }: RomanticAtmosphereProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {hearts && positions.map((position, index) => (
        <Heart key={`heart-${index}`} className="romantic-heart absolute fill-current" size={position.size} style={{ left: position.left, top: position.top, animationDelay: position.delay }} />
      ))}
      {sparkles && sparklePositions.map((position, index) => (
        <Sparkles key={`sparkle-${index}`} className="romantic-sparkle absolute" size={position.size} style={{ left: position.left, top: position.top, animationDelay: position.delay }} />
      ))}
      {balloons && <>
        <span className="birthday-balloon absolute left-[5%] top-[28%] h-16 w-12" />
        <span className="birthday-balloon absolute right-[7%] top-[18%] h-20 w-14" style={{ animationDelay: "-5s" }} />
      </>}
    </div>
  );
}