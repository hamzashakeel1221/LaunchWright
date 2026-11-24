export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink py-14 text-white sm:py-20">
      <div className="bg-grid absolute inset-0 -z-10" />
      <div className="absolute -top-32 right-[-10%] -z-10 h-96 w-96 rounded-full bg-teal/25 blur-[110px]" />
      <div className="absolute -bottom-40 left-[-10%] -z-10 h-96 w-96 rounded-full bg-flame/20 blur-[110px]" />
      <div className="wrap">
        <span className="eyebrow !text-flame-soft">{eyebrow}</span>
        <h1 className="text-4xl font-bold tracking-tight !text-white sm:text-5xl md:text-6xl">{title}</h1>
        {lead && <p className="mt-4 max-w-2xl text-[1.05rem] text-[#C9D3E3] sm:text-lg">{lead}</p>}
      </div>
    </section>
  );
}
