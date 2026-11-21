/** "第 n / total 题" label plus a soft gradient progress bar. */
export function QuizProgress({ current, total }: { current: number; total: number }) {
  const percent = Math.round(((current + 1) / total) * 100);
  return (
    <div className="w-full">
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">
          第 <span className="font-display text-xl text-foreground">{current + 1}</span> / {total} 题
        </span>
        <span className="text-xs text-muted-foreground">{percent}%</span>
      </div>
      <div
        className="h-2.5 w-full overflow-hidden rounded-full bg-muted"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={current + 1}
        aria-label="答题进度"
      >
        <div
          className="h-full rounded-full bg-progress transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
