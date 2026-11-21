import type { QuizQuestion } from "@/quizzes";

import { OptionItem } from "./OptionItem";

const LETTERS = ["A", "B", "C", "D", "E", "F"];

interface QuestionCardProps {
  question: QuizQuestion;
  index: number;
  selectedId: string | null;
  onSelect: (optionId: string) => void;
}

/** Shows a single question and its options. Re-keyed per question so it animates in. */
export function QuestionCard({ question, index, selectedId, onSelect }: QuestionCardProps) {
  const headingId = `question-${question.id}`;
  return (
    <section className="glass-card animate-bloom-in rounded-3xl p-5 md:p-8">
      <p className="font-display text-sm tracking-widest text-primary">Q{index + 1}</p>
      <h2 id={headingId} className="mt-1 font-display text-2xl leading-snug text-foreground md:text-[28px]">
        {question.text}
      </h2>
      <div role="radiogroup" aria-labelledby={headingId} className="mt-5 flex flex-col gap-3">
        {question.options.map((option, i) => (
          <OptionItem
            key={option.id}
            letter={LETTERS[i] ?? String(i + 1)}
            text={option.text}
            selected={selectedId === option.id}
            onSelect={() => onSelect(option.id)}
          />
        ))}
      </div>
    </section>
  );
}
