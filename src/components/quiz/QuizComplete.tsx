import { Link } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

import bouquet from "@/assets/flower-bouquet.webp";
import { Button } from "@/components/ui/button";

interface QuizCompleteProps {
  onRestart: () => void;
  onBack: () => void;
}

/** Shown after the last question. The flower result page will plug in here later. */
export function QuizComplete({ onRestart, onBack }: QuizCompleteProps) {
  return (
    <section className="glass-card animate-bloom-in flex flex-col items-center rounded-3xl px-6 py-8 text-center md:p-10">
      <div className="relative w-36">
        <div className="absolute inset-[-20%] rounded-full bg-halo" aria-hidden="true" />
        <img
          src={bouquet}
          alt=""
          width={640}
          height={880}
          className="relative animate-float"
        />
      </div>
      <h2 className="mt-4 font-display text-3xl text-foreground">8 道题都答完啦</h2>
      <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
        属于你的那朵花正在悄悄盛开…
        <br />
        结果页即将上线，敬请期待 ✿
      </p>
      <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Button variant="soft" size="pill" onClick={onBack}>
          返回修改答案
        </Button>
        <Button variant="soft" size="pill" onClick={onRestart}>
          <RotateCcw />
          重新测试
        </Button>
        <Button asChild variant="bloom" size="pill">
          <Link to="/">回到首页</Link>
        </Button>
      </div>
    </section>
  );
}
