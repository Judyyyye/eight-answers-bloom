import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useReducer } from "react";

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
import { computeScores, topResultIds } from "@/lib/quiz-scoring";
import type { Quiz } from "@/quizzes";

import { QuestionCard } from "./QuestionCard";
import { QuizProgress } from "./QuizProgress";
import { QuizResult } from "./QuizResult";
import { QuizTieBreaker } from "./QuizTieBreaker";

/** Runs any quiz: one question at a time with progress and previous / next buttons. */
export function QuizRunner({ quiz }: { quiz: Quiz }) {
  const [state, dispatch] = useReducer(quizSessionReducer, quiz.questions.length, createSession);
  const question = quiz.questions[state.current];

  // Bring each new question / the result back to the top on small screens.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [state.current, state.finished, state.tieChoice]);

  if (!question) return null;

  const back = () => dispatch({ type: "prev" });
  const restart = () => dispatch({ type: "restart" });

  function renderFinished() {
    const scores = computeScores(quiz, state.answers);
    const leaders = topResultIds(quiz, scores)
      .map((id) => quiz.results.find((r) => r.id === id))
      .filter((r) => r !== undefined);
    const chosen =
      leaders.length === 1 ? leaders[0] : leaders.find((r) => r.id === state.tieChoice);
    if (!chosen) {
      return (
        <QuizTieBreaker
          tied={leaders}
          score={scores[leaders[0]?.id ?? ""] ?? 0}
          onChoose={(resultId) => dispatch({ type: "chooseTie", resultId })}
          onBack={back}
        />
      );
    }
    return (
      <QuizResult
        key={chosen.id}
        quiz={quiz}
        result={chosen}
        scores={scores}
        tiedWith={leaders.filter((r) => r.id !== chosen.id)}
        onRestart={restart}
        onBack={back}
      />
    );
  }

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
          renderFinished()
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
            onClick={back}
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
