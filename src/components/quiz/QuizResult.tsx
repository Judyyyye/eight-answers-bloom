import { Link } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

import bouquet from "@/assets/flower-bouquet.webp";
import { Blossom } from "@/components/decor/Blossom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Quiz, QuizResultType } from "@/quizzes";

interface QuizResultProps {
  quiz: Quiz;
  result: QuizResultType;
  scores: Record<string, number>;
  /** Other results that tied with the chosen one, if any. */
  tiedWith: QuizResultType[];
  onRestart: () => void;
  onBack: () => void;
}

/** Full result card: flower, persona, signature line, keywords, description, advice, blessing. */
export function QuizResult({ quiz, result, scores, tiedWith, onRestart, onBack }: QuizResultProps) {
  const total = quiz.questions.length;
  return (
    <article className="glass-card animate-bloom-in flex flex-col items-center rounded-3xl px-5 py-8 text-center md:px-10">
      <div className="relative w-28">
        <div className="absolute inset-[-25%] rounded-full bg-halo" aria-hidden="true" />
        <img src={bouquet} alt="" width={640} height={880} className="relative animate-float" />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{quiz.resultIntro}</p>
      <h2 className="mt-2 font-display text-6xl leading-tight tracking-wider text-foreground">
        {result.name}
      </h2>
      <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-1 font-display text-lg text-secondary-foreground">
        <Blossom className="size-4 text-lavender" />
        {result.persona}
      </p>
      <p className="mt-5 max-w-sm font-display text-xl leading-relaxed text-primary">
        「{result.slogan}」
      </p>

      <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label="人格关键词">
        {result.keywords.map((k) => (
          <li key={k} className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
            {k}
          </li>
        ))}
      </ul>

      {tiedWith.length > 0 && (
        <p className="mt-4 text-xs text-muted-foreground">
          本次与{tiedWith.map((r) => `「${r.name}」`).join("")}同分，你选择了「{result.name}」
        </p>
      )}

      <div className="my-6 flex items-center gap-2 text-blush" aria-hidden="true">
        <span className="h-px w-10 bg-border" />
        <Blossom className="size-4" />
        <span className="h-px w-10 bg-border" />
      </div>

      <section className="w-full text-left">
        <h3 className="font-display text-lg text-foreground">人格描述</h3>
        <p className="mt-2 text-[15px] leading-loose text-foreground/85">{result.description}</p>
      </section>

      <section className="mt-6 w-full rounded-2xl bg-blush-soft/70 p-4 text-left md:p-5">
        <h3 className="flex items-center gap-1.5 font-display text-lg text-foreground">
          <Blossom className="size-4 text-blush" />
          给你的花朵建议
        </h3>
        <p className="mt-2 text-[15px] leading-loose text-foreground/85">{result.advice}</p>
      </section>

      <p className="mt-7 max-w-sm font-display text-xl leading-relaxed text-foreground">
        {result.blessing}
      </p>

      <section className="mt-8 w-full text-left" aria-label="六种花朵得分">
        <h3 className="text-xs tracking-widest text-muted-foreground">本次花朵得分</h3>
        <ul className="mt-3 flex flex-col gap-2">
          {quiz.results.map((r) => {
            const score = scores[r.id] ?? 0;
            const isResult = r.id === result.id;
            return (
              <li key={r.id} className="flex items-center gap-3 text-sm">
                <span
                  className={cn(
                    "w-12 shrink-0",
                    isResult ? "font-display text-base text-primary" : "text-muted-foreground",
                  )}
                >
                  {r.name}
                </span>
                <span className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                  <span
                    className={cn("block h-full rounded-full", isResult ? "bg-bloom" : "bg-progress opacity-60")}
                    style={{ width: `${(score / total) * 100}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right tabular-nums text-muted-foreground">
                  {score} 分
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
        <Button variant="bloom" size="pill" onClick={onRestart}>
          <RotateCcw />
          再测一次
        </Button>
        <Button variant="soft" size="pill" onClick={onBack}>
          返回修改答案
        </Button>
        <Button asChild variant="soft" size="pill">
          <Link to="/">回到首页</Link>
        </Button>
      </div>
      <p className="mt-5 text-xs text-muted-foreground/80">
        本测试为趣味自我探索内容，结果仅代表本次答题中相对突出的倾向
      </p>
    </article>
  );
}
