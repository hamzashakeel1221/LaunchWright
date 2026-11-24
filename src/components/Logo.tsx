export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#FF6B35" />
      <path d="M35.6 16.6 47.4 28.4 12 52z" fill="#fff" fillOpacity=".35" />
      <path d="M37.4 18.4 45.6 26.6 18 46z" fill="#fff" fillOpacity=".7" />
      <circle cx="41.5" cy="22.5" r="8.5" fill="#fff" />
      <path d="M47 41l1.6 4.4L53 47l-4.4 1.6L47 53l-1.6-4.4L41 47l4.4-1.6z" fill="#12213A" />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 font-display text-xl font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
      <LogoMark />
      Cometfront
    </span>
  );
}
