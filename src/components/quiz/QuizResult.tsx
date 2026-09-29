"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { quizContent, type QuizDifficulty, type QuizQuestion } from "@/data/quiz";

type QuizResultProps = {
  questions: QuizQuestion[];
  answers: Record<string, number | string>;
  score: number;
  personalAnswers: number;
  onReview: () => void;
  onRetry: () => void;
};

const difficulties: QuizDifficulty[] = ["easy", "medium", "hard", "impossible"];

export function QuizResult({ questions, answers, score, personalAnswers, onReview, onRetry }: QuizResultProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayScore, setDisplayScore] = useState(0);
  const visibleScore = shouldReduceMotion ? score : displayScore;
  const objectiveQuestions = questions.filter((question) => question.type === "multiple-choice");
  const percentage = Math.round((score / objectiveQuestions.length) * 100);

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }
    let current = 0;
    const interval = window.setInterval(() => {
      current += 1;
      setDisplayScore(Math.min(current, score));
      if (current >= score) window.clearInterval(interval);
    }, 70);
    return () => window.clearInterval(interval);
  }, [score, shouldReduceMotion]);

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.8, ease: "easeOut" }} className="mx-auto max-w-4xl text-center">
      <div className="text-[0.68rem] uppercase tracking-[0.44em] text-[#d4af6a]">{quizContent.resultEyebrow}</div>
      <h3 className="mt-6 font-display text-5xl text-[#f5e6d3] sm:text-7xl">YOU MADE IT THROUGH OUR STORY</h3>
      <div className="mt-8 font-display text-8xl leading-none text-[#d4af6a] sm:text-9xl" aria-live="polite">{visibleScore} <span className="text-4xl text-[#f5e6d3]/45 sm:text-5xl">/ {objectiveQuestions.length}</span></div>
      <div className="mx-auto mt-8 h-px max-w-xl bg-[#f5e6d3]/15" role="progressbar" aria-label="Memory score" aria-valuemin={0} aria-valuemax={objectiveQuestions.length} aria-valuenow={score}>
        <motion.div initial={{ width: 0 }} animate={{ width: `${percentage}%` }} transition={{ duration: shouldReduceMotion ? 0.01 : 1.2, ease: "easeOut" }} className="h-full bg-[#d4af6a]" />
      </div>
      <p className="mt-8 whitespace-pre-line font-display text-3xl text-[#f5e6d3]/85">You remembered the dates.{"\n"}You remembered the moments.{"\n"}And then you answered the questions that only we can answer.</p>
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-2 border-y border-[#f5e6d3]/15">
        <div className="border-b border-[#f5e6d3]/15 px-3 py-5 sm:border-b-0 sm:border-r"><div className="font-display text-3xl text-[#f5e6d3]">{score} / {objectiveQuestions.length}</div><div className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-[#f5e6d3]/45">Memory score</div></div>
        <div className="border-b border-[#f5e6d3]/15 px-3 py-5 sm:border-b-0"><div className="font-display text-3xl text-[#f5e6d3]">{personalAnswers} / 2</div><div className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-[#f5e6d3]/45">Personal answers</div></div>
        <div className="border-r border-[#f5e6d3]/15 px-3 py-5"><div className="font-display text-3xl text-[#f5e6d3]">{percentage}%</div><div className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-[#f5e6d3]/45">Remembered</div></div>
        <div className="px-3 py-5"><div className="font-display text-3xl text-[#f5e6d3]">{Object.keys(answers).length} / {questions.length}</div><div className="mt-2 text-[0.6rem] uppercase tracking-[0.2em] text-[#f5e6d3]/45">Answered</div></div>
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-[0.62rem] uppercase tracking-[0.2em] text-[#f5e6d3]/50">
        {difficulties.map((difficulty) => {
          const levelQuestions = questions.filter((question) => question.difficulty === difficulty);
          const levelScore = levelQuestions.filter((question) => question.type === "multiple-choice" && typeof answers[question.id] === "number" && (Array.isArray(question.answer) ? question.answer.includes(answers[question.id] as number) : answers[question.id] === question.answer)).length;
          return <span key={difficulty}>{difficulty}: <strong className="font-normal text-[#d4af6a]">{levelScore}/{levelQuestions.length}</strong></span>;
        })}
      </div>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <button type="button" onClick={onReview} className="min-h-12 border border-[#d4af6a]/60 px-8 py-3 text-[0.68rem] uppercase tracking-[0.3em] text-[#f5e6d3] transition hover:bg-[#4a1020]/60 focus-visible:ring-2 focus-visible:ring-[#d4af6a]">Review our answers</button>
        <button type="button" onClick={onRetry} className="min-h-12 px-6 py-3 text-[0.68rem] uppercase tracking-[0.3em] text-[#f5e6d3]/60 transition hover:text-[#f5e6d3] focus-visible:ring-2 focus-visible:ring-[#d4af6a]">{quizContent.retryLabel}</button>
      </div>
    </motion.div>
  );
}