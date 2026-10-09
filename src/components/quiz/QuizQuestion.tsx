"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

import { QuizFeedback } from "@/components/quiz/QuizFeedback";
import { QuizProgress } from "@/components/quiz/QuizProgress";
import type { QuizQuestion as QuizQuestionData } from "@/data/quiz";

type QuizQuestionProps = {
  question: QuizQuestionData;
  current: number;
  total: number;
  selectedAnswer: number | null;
  submitted: boolean;
  onAnswer: (answer: number) => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function QuizQuestion({ question, current, total, selectedAnswer, submitted, onAnswer, onNext, onPrevious }: QuizQuestionProps) {
  const nextRef = useRef(onNext);

  useEffect(() => {
    nextRef.current = onNext;
  }, [onNext]);

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => nextRef.current(), 10000);
    return () => window.clearTimeout(timer);
  }, [question.id, submitted]);

  return (
    <motion.div key={question.id} initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: "easeOut" }} className="mx-auto max-w-4xl">
      <QuizProgress current={current} total={total} difficulty={question.difficulty} />
      <div className="mt-12 flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.32em] text-[#d4af6a]">
        <span>{question.difficulty}</span>
        {question.category && <><span className="text-[#f5e6d3]/25">/</span><span className="text-[#f5e6d3]/45">{question.category}</span></>}
      </div>
      <h3 className="mt-5 max-w-3xl font-display text-4xl leading-tight text-[#f5e6d3] sm:text-6xl">{question.question}</h3>
      <fieldset className="mt-10 grid gap-3" disabled={submitted}>
        <legend className="sr-only">Choose an answer</legend>
        {question.options?.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = submitted && (Array.isArray(question.answer) ? question.answer.includes(index) : question.answer === index);
          const isIncorrect = submitted && isSelected && !isCorrect;
          return (
            <label key={`${question.id}-${option}-${index}`} className={`flex min-h-14 cursor-pointer items-center gap-4 border px-4 py-4 text-sm transition sm:px-5 sm:text-base ${isCorrect ? "border-[#d4af6a] bg-[#4a1020]/55" : isIncorrect ? "border-[#b76e79]/65 bg-[#4a1020]/30" : isSelected ? "border-[#d4af6a]/75 bg-[#160b12]" : "border-[#f5e6d3]/15 bg-[#0b0b10]/70 hover:border-[#d4af6a]/60"} ${submitted ? "cursor-default" : ""}`}>
              <input type="radio" name={question.id} value={index} checked={isSelected} onChange={() => onAnswer(index)} className="h-4 w-4 accent-[#d4af6a]" />
              <span className="text-[#d4af6a]">{String.fromCharCode(65 + index)}</span>
              <span className="leading-6 text-[#f5e6d3]/85">{option}</span>
            </label>
          );
        })}
      </fieldset>
      <div className="mt-8 flex items-center justify-between gap-4">
        <button type="button" onClick={onPrevious} className="min-h-12 px-2 py-3 text-[0.65rem] uppercase tracking-[0.28em] text-[#f5e6d3]/60 transition hover:text-[#f5e6d3] focus-visible:outline-2 focus-visible:outline-[#d4af6a]">← Venakki</button>
        {submitted && selectedAnswer !== null && <QuizFeedback question={question} selectedAnswer={selectedAnswer} />}
      </div>
    </motion.div>
  );
}