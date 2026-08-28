"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";

export type PublicQuestion = {
  id: number;
  prompt: string;
  type: string;
  options: string[];
};

type Props = {
  slug: string;
  passMark: number;
  questions: PublicQuestion[];
};

type Result = {
  score: number;
  total: number;
  percent: number;
  passed: boolean;
  passMark: number;
  results: {
    id: number;
    correctIndex: number;
    chosenIndex: number;
    correct: boolean;
    explanation: string;
  }[];
};

type Stage = "intro" | "taking" | "submitting" | "done";

export default function QuizRunner({ slug, passMark, questions }: Props) {
  const [stage, setStage] = useState<Stage>("intro");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  const answered = answers.filter((a) => a >= 0).length;

  function startQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setError("");
    setStage("taking");
  }

  async function submitQuiz(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStage("submitting");

    try {
      const response = await fetch("/api/quiz-attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, name, email, answers }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setResult((await response.json()) as Result);
      setStage("done");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setStage("taking");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  /* ---------- results ---------- */
  if (stage === "done" && result) {
    return (
      <div className="quiz-result">
        <p className="eyebrow gold">{result.passed ? "Passed" : "Keep practising"}</p>
        <h2>
          {result.score} / {result.total}
        </h2>
        <p className="quiz-percent">
          {result.percent}% — pass mark {result.passMark}%
        </p>

        <ol className="quiz-review">
          {questions.map((question, index) => {
            const r = result.results[index];
            const chosen = r.chosenIndex >= 0 ? question.options[r.chosenIndex] : "No answer";
            return (
              <li key={question.id} className={r.correct ? "is-correct" : "is-wrong"}>
                <p className="quiz-review-prompt">
                  {index + 1}. {question.prompt}
                </p>
                <p className="quiz-review-answer">
                  <span>{r.correct ? "Correct" : "Your answer"}:</span> {chosen}
                </p>
                {!r.correct && (
                  <p className="quiz-review-answer correct">
                    <span>Correct answer:</span> {question.options[r.correctIndex]}
                  </p>
                )}
                {r.explanation && <p className="quiz-review-explanation">{r.explanation}</p>}
              </li>
            );
          })}
        </ol>

        <Link className="btn secondary" href="/quizzes">
          BACK TO QUIZZES
        </Link>
      </div>
    );
  }

  /* ---------- name / email gate ---------- */
  if (stage === "intro") {
    return (
      <form className="enquiry-form quiz-intro" onSubmit={startQuiz}>
        <p className="quiz-intro-note">
          {questions.length} question{questions.length === 1 ? "" : "s"} · pass mark {passMark}%
        </p>
        <p className="quiz-intro-note">
          Enter your details so Dr. Kareem can see how you did.
        </p>
        <div className="enquiry-form-row">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </div>
        <button type="submit" className="btn primary">
          START QUIZ
        </button>
      </form>
    );
  }

  /* ---------- questions ---------- */
  return (
    <form className="quiz-form" onSubmit={submitQuiz}>
      <p className="quiz-progress">
        {answered} of {questions.length} answered
      </p>

      <ol className="quiz-questions">
        {questions.map((question, qIndex) => (
          <li key={question.id} className="quiz-question">
            <p className="quiz-prompt">
              {qIndex + 1}. {question.prompt}
            </p>
            <div className="quiz-options">
              {question.options.map((option, oIndex) => {
                const id = `q${question.id}-o${oIndex}`;
                return (
                  <label key={id} htmlFor={id} className="quiz-option">
                    <input
                      id={id}
                      type="radio"
                      name={`question-${question.id}`}
                      checked={answers[qIndex] === oIndex}
                      onChange={() =>
                        setAnswers((prev) => {
                          const next = [...prev];
                          next[qIndex] = oIndex;
                          return next;
                        })
                      }
                    />
                    <span>{option}</span>
                  </label>
                );
              })}
            </div>
          </li>
        ))}
      </ol>

      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="btn primary" disabled={stage === "submitting"}>
        {stage === "submitting" ? "SUBMITTING…" : "SUBMIT ANSWERS"}
      </button>
      {answered < questions.length && (
        <p className="form-note">
          {questions.length - answered} question
          {questions.length - answered === 1 ? "" : "s"} still unanswered — these will be marked
          wrong.
        </p>
      )}
    </form>
  );
}
