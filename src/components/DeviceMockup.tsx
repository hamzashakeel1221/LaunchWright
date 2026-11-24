/** Decorative laptop + phone mockup for the hero. */
export function DeviceMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]" aria-hidden="true">
      {/* Laptop / browser */}
      <div className="animate-floaty overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)]">
        <div className="flex items-center gap-1.5 bg-[#EEF1F6] px-3 py-2.5">
          <i className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
          <div className="ml-3 h-5 flex-1 rounded-md bg-white text-[10px] leading-5 text-muted/70 px-2">yourbusiness.com</div>
        </div>
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div className="h-3 w-20 rounded bg-ink" />
            <div className="flex gap-2"><i className="h-2 w-8 rounded bg-mist" /><i className="h-2 w-8 rounded bg-mist" /><i className="h-2 w-8 rounded bg-mist" /></div>
          </div>
          <div className="relative mt-4 h-28 overflow-hidden rounded-xl bg-gradient-to-br from-ink via-ink-2 to-[#0e5a63] sm:h-32">
            <div className="absolute -right-6 -bottom-10 h-32 w-32 rounded-full bg-flame/40 blur-2xl" />
            <div className="absolute top-5 left-4 h-3 w-36 rounded bg-white/90" />
            <div className="absolute top-10 left-4 h-2 w-24 rounded bg-white/50" />
            <div className="absolute bottom-4 left-4 h-6 w-20 rounded-full bg-flame" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-line p-2.5">
                <div className="mb-2 h-6 w-6 rounded-md bg-teal/20" />
                <div className="h-1.5 w-full rounded bg-mist" />
                <div className="mt-1 h-1.5 w-2/3 rounded bg-mist" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Phone */}
      <div className="absolute -right-2 -bottom-10 w-[34%] min-w-[120px] rounded-[1.6rem] border-[5px] border-[#0b1628] bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.7)] sm:-right-6">
        <div className="mx-auto mt-1.5 h-1.5 w-10 rounded-full bg-[#0b1628]" />
        <div className="p-2.5">
          <div className="h-16 rounded-lg bg-gradient-to-br from-ink to-[#0e5a63]" />
          <div className="mt-2 h-1.5 w-3/4 rounded bg-mist" />
          <div className="mt-1 h-1.5 w-1/2 rounded bg-mist" />
          <div className="mt-2.5 h-5 rounded-full bg-flame" />
          <div className="mt-2 h-5 rounded-full bg-[#25D366]" />
        </div>
      </div>
      {/* Floating badges */}
      <div className="absolute -bottom-6 left-2 flex items-center gap-2 rounded-2xl bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-xl sm:-left-6">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-teal text-xs">✓</span> Tested on every device
      </div>
    </div>
  );
}
