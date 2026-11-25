import Link from "next/link";
import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ArrowRight } from "@/components/Icons";
import { servicesData } from "@/lib/services";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Website Design & Development Services",
  description: "Website design, development, e-commerce stores, redesigns, SEO-ready websites and maintenance for small businesses worldwide. One team for your whole website. Free quote.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Services"
        title={<>Website services that <span className="text-gradient">grow your business</span></>}
        lead="From your first website to an online store, a redesign or ongoing care: one team handles design, development, SEO and launch, for businesses anywhere in the world."
        crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }]}
      />
      <section className="pb-24 md:pb-32">
        <div className="wrap grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) * 90}>
              <Link href={`/services/${s.slug}`} data-spotlight data-tilt="4" className="group panel flex h-full flex-col p-7 transition-colors hover:border-white/20 sm:p-8">
                <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.08] to-white/[.02] text-amber shadow-[0_0_30px_-8px_rgba(255,140,70,.6)]">
                  <ServiceIcon icon={s.icon} className="h-7 w-7" />
                </span>
                <h2 className="mt-7 text-2xl font-bold">{s.name}</h2>
                <p className="mt-3 text-fog">{s.short}</p>
                <ul className="mt-6 space-y-2 text-sm text-snow/80">
                  {s.included.slice(0, 4).map((x) => <li key={x} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-amber" />{x}</li>)}
                </ul>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-semibold text-amber transition-all group-hover:gap-2.5">Learn more <ArrowRight /></span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
