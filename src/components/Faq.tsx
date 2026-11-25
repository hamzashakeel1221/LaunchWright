export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <details key={f.q} className="group panel overflow-hidden !rounded-2xl transition-colors open:border-flame/30" {...(i === 0 ? { open: true } : {})}>
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-semibold text-white sm:px-6 [&::-webkit-details-marker]:hidden">
            <span className="text-[1.02rem]">{f.q}</span>
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full border border-white/10 bg-white/[.05] text-lg text-white transition duration-300 group-open:rotate-45 group-open:border-transparent group-open:bg-gradient-to-br group-open:from-amber group-open:to-flame">+</span>
          </summary>
          <p className="px-5 pb-6 text-fog sm:px-6">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
