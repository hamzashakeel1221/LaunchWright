import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, safe } from "@/lib/queries";
import { ProjectCover } from "@/components/ProjectCard";
import { JsonLd } from "@/components/JsonLd";
import { ArrowRight, External } from "@/components/Icons";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await safe(getProjectBySlug((await params).slug), null);
  return p ? pageMeta({ title: `${p.title}: ${p.category} Website`, description: p.description.slice(0, 160), path: `/projects/${p.slug}` }) : { title: "Project not found" };
}

export default async function ProjectPage({ params }: Props) {
  const p = await safe(getProjectBySlug((await params).slug), null);
  if (!p) notFound();
  return (
    <section className="relative overflow-hidden pt-32 pb-24 sm:pt-40">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our work", path: "/projects" }, { name: p.title, path: `/projects/${p.slug}` }])} />
      <div className="absolute -top-40 right-[-10%] -z-10 h-96 w-96 rounded-full bg-violet/20 blur-[120px]" />
      <div className="wrap max-w-5xl">
        <Link href="/projects" className="text-sm font-medium text-fog transition hover:text-white">← All projects</Link>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold tracking-wider text-amber uppercase">{p.category}</span>
          {p.isSample && <span className="rounded-full border border-white/15 px-3 py-1 text-[0.68rem] font-semibold tracking-widest text-white uppercase">Sample</span>}
        </div>
        <h1 className="mt-3 text-4xl font-bold md:text-6xl">{p.title}</h1>
        {p.isSample && <p className="mt-3 text-sm text-fog">This is a sample design made to show our work. It is not a client website.</p>}
        <div className="panel relative mt-10 overflow-hidden p-2">
          <div className="relative aspect-[16/10] overflow-hidden rounded-[1.2rem] bg-night-3">
            <ProjectCover imageId={p.imageId} title={p.title} priority />
          </div>
        </div>
        <div className="mt-10 max-w-3xl space-y-4 text-lg whitespace-pre-line text-snow/90">{p.description}</div>
        <div className="mt-10 flex flex-wrap gap-3">
          {p.liveUrl && (
            <a href={p.liveUrl} target="_blank" rel="noopener" className="btn-outline">Visit website <External /></a>
          )}
          <Link href="/contact" className="btn-primary">Get a website like this <ArrowRight /></Link>
        </div>
      </div>
    </section>
  );
}
