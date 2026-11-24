export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#FF6B35" />
      <path d="M20 46V18h7v22h17v6z" fill="#fff" />
      <path d="M38 18l10 10-6 2-6-6z" fill="#12213A" />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 font-display text-xl font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
      <LogoMark />
      Launchwright
    </span>
  );
}
