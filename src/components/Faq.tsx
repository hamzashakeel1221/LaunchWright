export type FaqItem = { q: string; a: string };

export function Faq({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-white">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 font-semibold text-ink transition hover:bg-cream sm:px-7 [&::-webkit-details-marker]:hidden">
            <span className="text-[1.02rem]">{f.q}</span>
            <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-mist text-lg text-ink transition group-open:rotate-45 group-open:bg-flame group-open:text-white">+</span>
          </summary>
          <p className="px-5 pb-6 text-muted sm:px-7">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
