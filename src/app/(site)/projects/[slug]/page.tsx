import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, safe } from "@/lib/queries";
import { ProjectCover } from "@/components/ProjectCard";
import { External } from "@/components/Icons";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await safe(getProjectBySlug((await params).slug), null);
  return p ? { title: p.title, description: p.description.slice(0, 160) } : { title: "Project not found" };
}

export default async function ProjectPage({ params }: Props) {
  const p = await safe(getProjectBySlug((await params).slug), null);
  if (!p) notFound();
  return (
    <section className="py-12 md:py-16">
      <div className="wrap max-w-4xl">
        <Link href="/projects" className="text-sm font-medium text-muted hover:text-ink">← All projects</Link>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold tracking-wider text-teal uppercase">{p.category}</span>
          {p.isSample && <span className="rounded-full bg-ink px-3 py-1 text-[0.7rem] font-semibold tracking-widest text-white uppercase">Sample</span>}
        </div>
        <h1 className="mt-2 text-3xl md:text-5xl">{p.title}</h1>
        {p.isSample && <p className="mt-2 text-sm text-muted">This is a sample design made to show our work. It is not a client website.</p>}
        <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-mist">
          <ProjectCover imageId={p.imageId} title={p.title} priority />
        </div>
        <div className="mt-8 space-y-4 text-lg whitespace-pre-line text-body">{p.description}</div>
        <div className="mt-10 flex flex-wrap gap-3">
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener" className="btn-dark">Visit website <External /></a>
          )}
          <Link href="/contact" className="btn-primary">Get a website like this</Link>
        </div>
      </div>
    </section>
  );
}
