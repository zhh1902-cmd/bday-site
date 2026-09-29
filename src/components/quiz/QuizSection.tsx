"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { QuizIntro } from "@/components/quiz/QuizIntro";
import { QuizFreeTextQuestion } from "@/components/quiz/QuizFreeTextQuestion";
import { QuizQuestion } from "@/components/quiz/QuizQuestion";
import { QuizResult } from "@/components/quiz/QuizResult";
import { RomanticAtmosphere } from "@/components/effects/RomanticAtmosphere";
import { quizQuestions } from "@/data/quiz";

type QuizAnswer = number | string;
type QuizAnswers = Record<string, QuizAnswer>;

export function QuizSection() {
  const shouldReduceMotion = useReducedMotion();
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const question = quizQuestions[currentQuestion];
  const currentAnswer = answers[question.id];
  const submitted = currentAnswer !== undefined;
  const selectedAnswer = typeof currentAnswer === "number" ? currentAnswer : null;
  const score = quizQuestions.filter((item) => item.type === "multiple-choice" && typeof answers[item.id] === "number" && (Array.isArray(item.answer) ? item.answer.includes(answers[item.id] as number) : answers[item.id] === item.answer)).length;
  const personalAnswers = quizQuestions.filter((item) => item.type === "free-text" && typeof answers[item.id] === "string").length;

  const startQuiz = () => {
    setQuizStarted(true);
    setQuizCompleted(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const selectAnswer = (answer: number) => {
    if (answers[question.id] !== undefined) return;
    setAnswers((current) => ({ ...current, [question.id]: answer }));
  };

  const submitTextAnswer = (answer: string) => {
    setAnswers((current) => ({ ...current, [question.id]: answer }));
  };

  const showNextQuestion = () => {
    if (currentQuestion === quizQuestions.length - 1) {
      setQuizCompleted(true);
      return;
    }
    setCurrentQuestion((current) => current + 1);
  };

  const showPreviousQuestion = () => {
    setCurrentQuestion((current) => Math.max(0, current - 1));
  };

  useEffect(() => {
    if (!quizStarted || quizCompleted) return;
    document.getElementById("relationship-quiz")?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
  }, [currentQuestion, quizCompleted, quizStarted, shouldReduceMotion]);

  const reviewAnswers = () => {
    setQuizCompleted(false);
    setCurrentQuestion(0);
  };

  return (
    <section id="relationship-quiz" className="relative overflow-hidden bg-[#050505] px-6 py-28 sm:px-10 sm:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(123,32,56,0.22),transparent_34%),radial-gradient(circle_at_82%_72%,rgba(212,175,106,0.05),transparent_22%)]" />
      <RomanticAtmosphere hearts sparkles />
      <div className="relative mx-auto max-w-6xl">
        <AnimatePresence mode="wait" initial={false}>
          {!quizStarted ? (
            <motion.div key="intro" exit={{ opacity: 0, y: -20 }} transition={{ duration: shouldReduceMotion ? 0.01 : 0.4 }}><QuizIntro onStart={startQuiz} /></motion.div>
          ) : quizCompleted ? (
            <motion.div key="result" exit={{ opacity: 0 }}><QuizResult questions={quizQuestions} answers={answers} score={score} personalAnswers={personalAnswers} onReview={reviewAnswers} onRetry={startQuiz} /></motion.div>
          ) : (
              <>
                <div className="mx-auto mb-8 flex max-w-4xl flex-wrap gap-2" aria-label="Question navigator">
                  {quizQuestions.map((item, index) => {
                    const answered = answers[item.id] !== undefined;
                    const isCurrent = index === currentQuestion;
                    return <button key={item.id} type="button" disabled={!answered && !isCurrent} onClick={() => setCurrentQuestion(index)} aria-label={`Go to question ${index + 1}`} aria-current={isCurrent ? "step" : undefined} className={`h-7 w-7 text-[0.6rem] ${isCurrent ? "bg-[#d4af6a] text-[#050505]" : answered ? "border border-[#b76e79]/60 text-[#d4af6a]" : "border border-[#f5e6d3]/10 text-[#f5e6d3]/25"}`}>{String(index + 1).padStart(2, "0")}</button>;
                  })}
                </div>
                {question.type === "free-text" ? (
                  <QuizFreeTextQuestion key={question.id} question={question} current={currentQuestion + 1} total={quizQuestions.length} value={typeof currentAnswer === "string" ? currentAnswer : ""} submitted={submitted} onSubmit={submitTextAnswer} onPrevious={showPreviousQuestion} onNext={showNextQuestion} />
                ) : (
                  <QuizQuestion key={question.id} question={question} current={currentQuestion + 1} total={quizQuestions.length} selectedAnswer={selectedAnswer} submitted={submitted} onAnswer={selectAnswer} onNext={showNextQuestion} onPrevious={showPreviousQuestion} />
                )}
              </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}