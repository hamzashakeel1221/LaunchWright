import type { Metadata } from "next";
import { getPublishedProjects, safe } from "@/lib/queries";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata: Metadata = pageMeta({
  title: "Our Work: Website Design Portfolio",
  description: "See websites designed and built by WebDoorstep for small businesses: modern, mobile-friendly and fast. Get a website like these with a free quote.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await safe(getPublishedProjects(), []);
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Our work", path: "/projects" }])} />
      <PageHero
        eyebrow="Our work"
        title={<>Websites we&apos;ve <span className="text-gradient">designed &amp; built</span></>}
        lead={projects.some((p) => p.isSample) ? "Projects marked “Sample” are designs we made to show our work. They are not client websites." : "A selection of websites we have designed and built, each one fast, mobile-friendly and made to bring in customers."}
        crumbs={[{ name: "Home", href: "/" }, { name: "Our work", href: "/projects" }]}
      />
      <section className="pb-24 md:pb-32">
        <div className="wrap">
          {projects.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p, i) => <Reveal key={p.slug} delay={(i % 3) * 80}><ProjectCard p={p} /></Reveal>)}
            </div>
          ) : (
            <div className="panel p-10 text-center text-fog">New projects are being added. Check back soon.</div>
          )}
        </div>
      </section>
    </>
  );
}
