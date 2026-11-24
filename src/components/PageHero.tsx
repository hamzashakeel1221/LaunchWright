export function PageHero({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return (
    <section className="bg-ink bg-[radial-gradient(900px_400px_at_90%_-20%,rgba(31,182,168,.22),transparent_60%),radial-gradient(700px_400px_at_-10%_120%,rgba(255,107,53,.2),transparent_60%)] py-16 text-white md:py-20">
      <div className="wrap">
        <span className="eyebrow !text-flame-soft">{eyebrow}</span>
        <h1 className="text-4xl !text-white md:text-5xl">{title}</h1>
        {lead && <p className="lead mt-4 !text-[#C9D3E3]">{lead}</p>}
      </div>
    </section>
  );
}
