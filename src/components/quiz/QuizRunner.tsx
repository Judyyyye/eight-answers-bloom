import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducer } from "react";

import { Blossom } from "@/components/decor/Blossom";
import { BrandMark } from "@/components/decor/BrandMark";
import { Button } from "@/components/ui/button";
import {
  canGoNext,
  canGoPrev,
  createSession,
  isLastQuestion,
  quizSessionReducer,
} from "@/lib/quiz-session";
import type { Quiz } from "@/quizzes";

import { QuestionCard } from "./QuestionCard";
import { QuizComplete } from "./QuizComplete";
import { QuizProgress } from "./QuizProgress";

/** Runs any quiz: one question at a time with progress and previous / next buttons. */
export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const [state, dispatch] = useReducer(quizSessionReducer, quiz.questions.length, createSession);
  const question = quiz.questions[state.current];
  if (!question) return null;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col px-5 pb-6 pt-5">
      <header className="flex items-center justify-between">
        <BrandMark />
        <span className="inline-flex items-center gap-1 font-display text-base text-foreground">
          <Blossom className="size-4 text-lavender" />
          {quiz.title}
        </span>
      </header>

      <div className="mt-6">
        <QuizProgress current={state.current} total={state.total} />
      </div>

      <div className="mt-5 flex-1">
        {state.finished ? (
          <QuizComplete
            onBack={() => dispatch({ type: "prev" })}
            onRestart={() => dispatch({ type: "restart" })}
          />
        ) : (
          <QuestionCard
            key={question.id}
            question={question}
            index={state.current}
            selectedId={state.answers[state.current] ?? null}
            onSelect={(optionId) => dispatch({ type: "select", optionId })}
          />
        )}
      </div>

      {!state.finished && (
        <nav className="sticky bottom-0 mt-6 flex gap-3 pb-[env(safe-area-inset-bottom)] pt-2">
          <Button
            variant="soft"
            size="pill"
            className="flex-1"
            disabled={!canGoPrev(state)}
            onClick={() => dispatch({ type: "prev" })}
          >
            <ChevronLeft />
            上一题
          </Button>
          <Button
            variant="bloom"
            size="pill"
            className="flex-[1.4]"
            disabled={!canGoNext(state)}
            onClick={() => dispatch({ type: "next" })}
          >
            {isLastQuestion(state) ? "完成测试" : "下一题"}
            <ChevronRight />
          </Button>
        </nav>
      )}
      {!state.finished && !canGoNext(state) && (
        <p className="mt-2 text-center text-xs text-muted-foreground">选一个最像你的答案吧</p>
      )}
    </main>
  );
}
