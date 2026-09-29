import type { QuizDifficulty } from "@/data/quiz";
import { Heart } from "lucide-react";

type QuizProgressProps = {
  current: number;
  total: number;
  difficulty: QuizDifficulty;
};

export function QuizProgress({ current, total, difficulty }: QuizProgressProps) {
  const percentage = (current / total) * 100;

  return (
    <div aria-label={`Question ${current} of ${total}`}>
      <div className="flex items-end justify-between gap-4 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/55">
        <span>Question {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className="text-[#d4af6a]">{difficulty}</span>
      </div>
      <div className="mt-4 flex items-center gap-3" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current}>
        <Heart size={12} className="heartbeat-glow shrink-0 fill-[#b76e79] text-[#e7a8b5]" aria-hidden="true" />
        <div className="h-px flex-1 bg-[#f5e6d3]/15">
          <div className="h-full bg-gradient-to-r from-[#b76e79] to-[#d4af6a] transition-[width] duration-700 ease-out" style={{ width: `${percentage}%` }} />
        </div>
      </div>
    </div>
  );
}