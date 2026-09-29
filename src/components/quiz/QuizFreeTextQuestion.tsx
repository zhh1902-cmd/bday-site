"use client";

import { useState } from "react";

import type { QuizQuestion } from "@/data/quiz";

type QuizFreeTextQuestionProps = {
  question: QuizQuestion;
  current: number;
  total: number;
  value: string;
  submitted: boolean;
  onSubmit: (answer: string) => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function QuizFreeTextQuestion({ question, current, total, value, submitted, onSubmit, onPrevious, onNext }: QuizFreeTextQuestionProps) {
  const [draft, setDraft] = useState(value);
  const [editing, setEditing] = useState(false);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between gap-4 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/55">
        <span>Question {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className="text-[#d4af6a]">personal answer</span>
      </div>
      <div className="mt-4 h-px bg-[#f5e6d3]/15"><div className="h-full bg-gradient-to-r from-[#b76e79] to-[#d4af6a]" style={{ width: `${(current / total) * 100}%` }} /></div>
      <div className="mt-12 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-[#d4af6a]">{question.category}</div>
      <h3 className="mt-5 max-w-3xl whitespace-pre-line font-display text-4xl leading-tight text-[#f5e6d3] sm:text-6xl">{question.question}</h3>
      <textarea
        aria-label="Your personal answer"
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        disabled={submitted && !editing}
        placeholder="Type your answer..."
        className="mt-10 min-h-44 w-full resize-y border border-[#f5e6d3]/20 bg-[#0b0b10]/70 p-5 text-base leading-7 text-[#f5e6d3] outline-none transition placeholder:text-[#f5e6d3]/35 focus:border-[#d4af6a] disabled:opacity-75"
      />
      {submitted && !editing && <p className="mt-5 font-display text-3xl text-[#d4af6a]" aria-live="polite">ANSWER RECORDED</p>}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <button type="button" onClick={onPrevious} className="min-h-12 px-2 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/60 transition hover:text-[#f5e6d3] focus-visible:outline-2 focus-visible:outline-[#d4af6a]">← Previous</button>
        {!submitted || editing ? (
          <button type="button" disabled={!draft.trim()} onClick={() => { onSubmit(draft.trim()); setEditing(false); }} className="min-h-12 border border-[#d4af6a]/60 px-6 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3] transition hover:bg-[#4a1020]/60 disabled:cursor-not-allowed disabled:opacity-35 focus-visible:outline-2 focus-visible:outline-[#d4af6a]">{editing ? "Resubmit answer" : "Submit answer"}</button>
        ) : (
          <div className="flex flex-wrap gap-4">
            <button type="button" onClick={() => setEditing(true)} className="min-h-12 px-2 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/60 transition hover:text-[#f5e6d3] focus-visible:outline-2 focus-visible:outline-[#d4af6a]">Edit answer</button>
            <button type="button" onClick={onNext} className="min-h-12 border border-[#d4af6a]/60 px-6 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3] transition hover:bg-[#4a1020]/60 focus-visible:outline-2 focus-visible:outline-[#d4af6a]">{current === total ? "See our result" : "Continue"}</button>
          </div>
        )}
      </div>
    </div>
  );
}
