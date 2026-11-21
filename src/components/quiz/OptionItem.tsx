import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface OptionItemProps {
  letter: string;
  text: string;
  selected: boolean;
  onSelect: () => void;
}

/** One answer choice, styled as a petal-soft card that behaves like a radio button. */
export function OptionItem({ letter, text, selected, onSelect }: OptionItemProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left text-[15px] leading-snug transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        selected
          ? "border-primary/40 bg-blush-soft text-foreground shadow-petal"
          : "border-border bg-card/70 text-foreground hover:border-blush hover:bg-card",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full font-display text-base transition-colors",
          selected ? "bg-bloom text-primary-foreground" : "bg-secondary text-secondary-foreground",
        )}
      >
        {selected ? <Check className="size-4" /> : letter}
      </span>
      <span className="flex-1">{text}</span>
    </button>
  );
}
