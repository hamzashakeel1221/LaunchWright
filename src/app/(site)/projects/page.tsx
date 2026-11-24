import type { Metadata } from "next";
import { getPublishedProjects, safe } from "@/lib/queries";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHero } from "@/components/PageHero";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Projects", description: "Websites designed and built by Cometfront." };

export default async function ProjectsPage() {
  const projects = await safe(getPublishedProjects(), []);
  return (
    <>
      <PageHero eyebrow="Our work" title="Projects" lead="Projects marked “Sample” are designs we made to show our work. They are not client websites." />
      <section className="py-16 md:py-20">
        <div className="wrap">
          {projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-line bg-white p-10 text-center text-muted">New projects are being added. Check back soon.</div>
          )}
        </div>
      </section>
    </>
  );
}
