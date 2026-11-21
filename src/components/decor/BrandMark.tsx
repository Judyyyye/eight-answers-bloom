import { Link } from "@tanstack/react-router";

import { Blossom } from "./Blossom";

/** The 「今天测点啥」 brand pill, links back home. */
export function BrandMark() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 rounded-full glass-card px-3.5 py-1.5 text-sm font-medium text-foreground transition-transform active:scale-95"
    >
      <Blossom className="size-4 text-blush" />
      <span className="font-display text-base tracking-wider">今天测点啥</span>
    </Link>
  );
}
