import Link from "next/link";

export function PageHero({ eyebrow, title, lead, crumbs, children }: { eyebrow: string; title: React.ReactNode; lead?: string; crumbs?: { name: string; href: string }[]; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
      {/* Glow layers fade out towards the bottom so there is no hard edge into the next section. */}
      <div className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,#000_45%,transparent)]" aria-hidden="true">
        <div className="bg-grid absolute inset-0" />
        <div className="animate-aurora absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-violet/25 blur-[120px]" />
        <div className="animate-aurora absolute -bottom-40 left-[-10%] h-[28rem] w-[28rem] rounded-full bg-flame/20 blur-[120px] [animation-delay:-6s]" />
      </div>
      <div className="wrap">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-fog">
            <ol className="flex flex-wrap items-center gap-2">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/25">/</span>}
                  {i < crumbs.length - 1 ? <Link href={c.href} className="transition hover:text-white">{c.name}</Link> : <span className="text-white/80">{c.name}</span>}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <span className="eyebrow animate-rise">{eyebrow}</span>
        <h1 className="animate-rise max-w-4xl text-[2.6rem] leading-[1.05] font-bold sm:text-6xl md:text-7xl [animation-delay:80ms]">{title}</h1>
        {lead && <p className="animate-rise mt-6 max-w-2xl text-[1.05rem] text-fog sm:text-lg [animation-delay:160ms]">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
