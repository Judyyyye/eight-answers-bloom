import { Blossom } from "@/components/decor/Blossom";
import { Button } from "@/components/ui/button";
import type { QuizResultType } from "@/quizzes";

interface QuizTieBreakerProps {
  tied: QuizResultType[];
  score: number;
  onChoose: (resultId: string) => void;
  onBack: () => void;
}

/** Shown when several results share the top score: the user picks the one more like them. */
export function QuizTieBreaker({ tied, score, onChoose, onBack }: QuizTieBreakerProps) {
  return (
    <section className="glass-card animate-bloom-in rounded-3xl p-5 md:p-8">
      <p className="font-display text-sm tracking-widest text-primary">平分啦</p>
      <h2 className="mt-1 font-display text-2xl leading-snug text-foreground md:text-[28px]">
        有 {tied.length} 朵花同时为你盛开
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        它们都得到了 {score} 分。选一朵「更像现在的我」吧，这不会改变你的原始分数。
      </p>
      <div className="mt-5 flex flex-col gap-3">
        {tied.map((result) => (
          <button
            key={result.id}
            type="button"
            onClick={() => onChoose(result.id)}
            className="group flex w-full items-start gap-3 rounded-2xl border border-border bg-card/70 px-4 py-4 text-left transition-all duration-200 hover:border-blush hover:bg-blush-soft hover:shadow-petal active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary">
              <Blossom className="size-6 text-blush" />
            </span>
            <span className="flex-1">
              <span className="flex items-baseline gap-2">
                <span className="font-display text-xl text-foreground">{result.name}</span>
                <span className="text-xs text-secondary-foreground">{result.persona}</span>
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                {result.slogan}
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button variant="soft" size="pill" onClick={onBack}>
          返回修改答案
        </Button>
      </div>
    </section>
  );
}
