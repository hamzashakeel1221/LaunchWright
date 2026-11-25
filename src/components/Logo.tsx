export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="wd-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF8A3D" />
          <stop offset="1" stopColor="#FF4F2E" />
        </linearGradient>
        <linearGradient id="wd-l" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFF7E6" />
          <stop offset="1" stopColor="#FFD9A8" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#wd-g)" />
      <rect x="19" y="12" width="26" height="36" rx="2.5" fill="url(#wd-l)" />
      <path d="M19 12.6 31 17v32.6L19 48z" fill="#0B1222" />
      <circle cx="28" cy="33" r="1.6" fill="#FF8A3D" />
      <path d="M13 53h38" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <span className={`flex items-center gap-2.5 font-display text-[1.3rem] font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
      <LogoMark />
      <span>
        Web<span className="text-gradient">Doorstep</span>
      </span>
    </span>
  );
}
