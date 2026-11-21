import { Link } from "@tanstack/react-router";
import { Clock3, ListChecks, Sparkles } from "lucide-react";

import bouquet from "@/assets/flower-bouquet.webp";
import { Blossom } from "@/components/decor/Blossom";
import { BrandMark } from "@/components/decor/BrandMark";
import { Button } from "@/components/ui/button";
import type { Quiz } from "@/quizzes";

/** Landing card for a quiz: title, tagline, how it works and the start button. */
export function QuizIntro({ quiz }: { quiz: Quiz }) {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-5 pb-8 pt-5 md:px-10">
      <header className="flex items-center justify-between">
        <BrandMark />
        <span className="text-xs text-muted-foreground">趣味测试 · 第 1 期</span>
      </header>

      <section className="flex flex-1 flex-col items-center justify-center gap-6 py-6 md:flex-row md:gap-14">
        <div className="relative flex w-full max-w-[300px] items-center justify-center md:max-w-[400px]">
          <div className="absolute inset-[-12%] rounded-full bg-halo" aria-hidden="true" />
          <Blossom className="absolute left-2 top-6 size-5 text-lavender animate-sway" />
          <Blossom className="absolute bottom-10 right-0 size-4 text-sage animate-sway [animation-delay:1.5s]" />
          <img
            src={bouquet}
            alt="一束包含牡丹、薰衣草、雏菊和香豌豆的水彩花束"
            width={640}
            height={880}
            className="relative w-[78%] animate-float"
          />
        </div>

        <div className="flex w-full max-w-md flex-col items-center text-center md:items-start md:text-left">
          <p className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
            <Sparkles className="size-3.5" />
            今日推荐
          </p>
          <h1 className="font-display text-5xl leading-tight tracking-wide text-foreground md:text-6xl">
            {quiz.title}
          </h1>
          <p className="mt-3 font-display text-xl text-primary md:text-2xl">{quiz.tagline}</p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            {quiz.description}
          </p>

          <div className="mt-5 flex gap-2 text-xs text-accent-foreground">
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1">
              <ListChecks className="size-3.5" />
              {quiz.questions.length} 道单选题
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1">
              <Clock3 className="size-3.5" />
              {quiz.duration}
            </span>
          </div>

          <Button asChild variant="bloom" size="xl" className="mt-8 w-full md:w-auto">
            <Link to="/quiz/$quizId" params={{ quizId: quiz.id }}>
              开始测试
              <Blossom className="size-5 text-primary-foreground" />
            </Link>
          </Button>
          <p className="mt-3 text-xs text-muted-foreground">无需登录，也不用填写任何个人信息</p>
        </div>
      </section>

      <footer className="text-center text-xs text-muted-foreground/80">
        测试结果仅供娱乐 · 愿你按自己的节奏盛开 ✿
      </footer>
    </main>
  );
}
