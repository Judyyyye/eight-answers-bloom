import { cn } from "@/lib/utils";

/** Small five-petal flower used as a light decorative accent. Color comes from text-* tokens. */
export function Blossom({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={cn("size-6", className)}>
      <g fill="currentColor" opacity="0.85">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse key={deg} cx="20" cy="10.5" rx="6" ry="9" transform={`rotate(${deg} 20 20)`} />
        ))}
      </g>
      <circle cx="20" cy="20" r="4" className="fill-card" />
    </svg>
  );
}
