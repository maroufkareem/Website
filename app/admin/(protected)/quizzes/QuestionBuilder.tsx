"use client";

import { useState } from "react";

export type BuilderQuestion = {
  prompt: string;
  type: "multiple_choice" | "true_false";
  options: string[];
  correctIndex: number;
  explanation: string;
};

const TRUE_FALSE_OPTIONS = ["True", "False"];

function blankQuestion(): BuilderQuestion {
  return {
    prompt: "",
    type: "multiple_choice",
    options: ["", ""],
    correctIndex: 0,
    explanation: "",
  };
}

const input =
  "w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-[#C9A65A]";
const label = "mb-1 block text-xs font-semibold text-neutral-300";

export default function QuestionBuilder({ initial }: { initial: BuilderQuestion[] }) {
  const [questions, setQuestions] = useState<BuilderQuestion[]>(
    initial.length ? initial : [blankQuestion()]
  );

  function update(index: number, patch: Partial<BuilderQuestion>) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, ...patch } : q)));
  }

  function setType(index: number, type: BuilderQuestion["type"]) {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== index) return q;
        if (type === "true_false") {
          return { ...q, type, options: [...TRUE_FALSE_OPTIONS], correctIndex: Math.min(q.correctIndex, 1) };
        }
        // Coming back from true/false, keep the labels as a starting point.
        return { ...q, type };
      })
    );
  }

  function setOption(qIndex: number, oIndex: number, value: string) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex ? { ...q, options: q.options.map((o, j) => (j === oIndex ? value : o)) } : q
      )
    );
  }

  function addOption(qIndex: number) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, options: [...q.options, ""] } : q))
    );
  }

  function removeOption(qIndex: number, oIndex: number) {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex || q.options.length <= 2) return q;
        const options = q.options.filter((_, j) => j !== oIndex);
        // Keep the answer pointing at the same option where possible.
        let correctIndex = q.correctIndex;
        if (oIndex === q.correctIndex) correctIndex = 0;
        else if (oIndex < q.correctIndex) correctIndex -= 1;
        return { ...q, options, correctIndex };
      })
    );
  }

  function move(index: number, delta: number) {
    setQuestions((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  }

  const incomplete = questions.filter(
    (q) => !q.prompt.trim() || q.options.length < 2 || q.options.some((o) => !o.trim())
  ).length;

  return (
    <div className="space-y-4">
      {/* The builder state travels to the server action as JSON in one field. */}
      <input type="hidden" name="questions" value={JSON.stringify(questions)} />

      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg font-bold text-[#FCFAF6]">
          Questions <span className="text-sm font-normal text-neutral-500">({questions.length})</span>
        </h2>
        <button
          type="button"
          onClick={() => setQuestions((prev) => [...prev, blankQuestion()])}
          className="rounded border border-[#C9A65A]/50 px-3 py-1.5 text-xs font-semibold text-[#C9A65A] hover:bg-[#C9A65A]/10"
        >
          + Add question
        </button>
      </div>

      {incomplete > 0 && (
        <p className="rounded border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-xs text-amber-200">
          {incomplete} question{incomplete === 1 ? " is" : "s are"} incomplete (needs a prompt and at
          least two filled options). Incomplete questions are dropped when you save.
        </p>
      )}

      {questions.map((question, qIndex) => (
        <div
          key={qIndex}
          className="rounded-lg border border-neutral-800 bg-[#0d0d0d] p-4 space-y-3"
        >
          <div className="flex items-start justify-between gap-3">
            <span className="mt-2 text-xs font-semibold text-neutral-500">Q{qIndex + 1}</span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => move(qIndex, -1)}
                disabled={qIndex === 0}
                className="rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-300 disabled:opacity-30"
                aria-label="Move question up"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={() => move(qIndex, 1)}
                disabled={qIndex === questions.length - 1}
                className="rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-300 disabled:opacity-30"
                aria-label="Move question down"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => setQuestions((prev) => prev.filter((_, i) => i !== qIndex))}
                className="rounded border border-red-500/40 px-2 py-1 text-xs text-red-400"
              >
                Remove
              </button>
            </div>
          </div>

          <label className="block">
            <span className={label}>Question</span>
            <textarea
              rows={2}
              value={question.prompt}
              onChange={(e) => update(qIndex, { prompt: e.target.value })}
              className={input}
              placeholder="e.g. Which organelle is the site of aerobic respiration?"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={label}>Type</span>
              <select
                value={question.type}
                onChange={(e) => setType(qIndex, e.target.value as BuilderQuestion["type"])}
                className={input}
              >
                <option value="multiple_choice">Multiple choice</option>
                <option value="true_false">True / False</option>
              </select>
            </label>
            <label className="block">
              <span className={label}>Correct answer</span>
              <select
                value={question.correctIndex}
                onChange={(e) => update(qIndex, { correctIndex: Number(e.target.value) })}
                className={input}
              >
                {question.options.map((option, oIndex) => (
                  <option key={oIndex} value={oIndex}>
                    {option.trim() || `Option ${oIndex + 1}`}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="space-y-2">
            {/* Caption for a group of inputs, so not a <label>. */}
            <span className={label}>Options</span>
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="flex items-center gap-2">
                <span
                  className={`w-4 text-center text-xs ${
                    question.correctIndex === oIndex ? "text-[#C9A65A]" : "text-neutral-600"
                  }`}
                  title={question.correctIndex === oIndex ? "Correct answer" : undefined}
                >
                  {question.correctIndex === oIndex ? "✓" : "○"}
                </span>
                <input
                  type="text"
                  value={option}
                  disabled={question.type === "true_false"}
                  onChange={(e) => setOption(qIndex, oIndex, e.target.value)}
                  className={`${input} disabled:opacity-60`}
                  placeholder={`Option ${oIndex + 1}`}
                />
                {question.type === "multiple_choice" && question.options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeOption(qIndex, oIndex)}
                    className="rounded border border-neutral-700 px-2 py-1 text-xs text-neutral-400"
                    aria-label={`Remove option ${oIndex + 1}`}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {question.type === "multiple_choice" && (
              <button
                type="button"
                onClick={() => addOption(qIndex)}
                className="text-xs font-semibold text-[#C9A65A] hover:underline"
              >
                + Add option
              </button>
            )}
          </div>

          <label className="block">
            <span className={label}>Explanation (optional — shown after marking)</span>
            <input
              type="text"
              value={question.explanation}
              onChange={(e) => update(qIndex, { explanation: e.target.value })}
              className={input}
              placeholder="Why the correct answer is correct"
            />
          </label>
        </div>
      ))}
    </div>
  );
}
