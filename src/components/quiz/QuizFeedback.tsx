"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

import { quizContent, type QuizQuestion } from "@/data/quiz";

type QuizFeedbackProps = {
  question: QuizQuestion;
  selectedAnswer: number;
};

export function QuizFeedback({ question, selectedAnswer }: QuizFeedbackProps) {
  const shouldReduceMotion = useReducedMotion();
  const isCorrect = Array.isArray(question.answer) ? question.answer.includes(selectedAnswer) : question.answer !== undefined && selectedAnswer === question.answer;
  const correctAnswer = Array.isArray(question.answer) ? question.answer.map((answer) => question.options?.[answer]).join(", ") : question.options?.[question.answer ?? 0];

  return (
    <motion.div initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.45, ease: "easeOut" }} className="mt-8 border-t border-[#d4af6a]/25 pt-6">
      <div className={`flex items-center gap-3 font-display text-3xl ${isCorrect ? "text-[#d4af6a]" : "text-[#b76e79]"}`} aria-live="polite">
        {isCorrect ? <Sparkles size={22} aria-hidden="true" /> : <Heart size={20} className="fill-current" aria-hidden="true" />}
        {isCorrect ? quizContent.correctMessage : quizContent.incorrectMessage}
      </div>
      <p className="mt-4 text-sm text-[#f5e6d3]/60">
        {quizContent.correctAnswerLabel}: <span className="text-[#f5e6d3]">{correctAnswer}</span>
      </p>
      {question.explanation && <p className="mt-3 max-w-2xl text-sm leading-7 text-[#f5e6d3]/55">{question.explanation}</p>}
    </motion.div>
  );
}