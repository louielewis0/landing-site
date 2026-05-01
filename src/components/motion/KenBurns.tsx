import type { ReactNode } from "react";

type KenBurnsProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Wraps an image (or any child) in a slow Ken Burns zoom/pan.
 * Animation timing is defined in globals.css via the .ken-burns keyframes.
 */
export default function KenBurns({ children, className = "" }: KenBurnsProps) {
  return <div className={`ken-burns ${className}`.trim()}>{children}</div>;
}
