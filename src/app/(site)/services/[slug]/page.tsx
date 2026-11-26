import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ArrowRight, Check, WhatsApp } from "@/components/Icons";
import { getService, servicesData } from "@/lib/services";
import { breadcrumbSchema, faqSchema, pageMeta, serviceSchema } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return servicesData.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getService((await params).slug);
  if (!s) return { title: "Service not found" };
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/services/${s.slug}`, keywords: [s.name.toLowerCase(), ...site.keywords] });
}

export default async function ServicePage({ params }: Props) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = servicesData.filter((x) => x.slug !== s.slug);
  const path = `/services/${s.slug}`;

  return (
    <>
      <JsonLd data={[serviceSchema(s), faqSchema(s.faqs), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }, { name: s.name, path }])]} />
      <PageHero eyebrow={s.name} title={s.h1} lead={s.intro} crumbs={[{ name: "Home", href: "/" }, { name: "Services", href: "/services" }, { name: s.name, href: path }]}>
        <div className="animate-rise mt-9 flex flex-col gap-3 sm:flex-row [animation-delay:240ms]">
          <Link href="/contact" data-magnetic className="btn-primary h-14 px-8 text-base">Get a free quote <ArrowRight /></Link>
          <a href={whatsappLink(`Hi ${site.name}, I'm interested in ${s.name.toLowerCase()}.`)} target="_blank" rel="noopener" className="btn-ghost h-14 px-7 text-base"><WhatsApp className="h-5 w-5 text-[#25D366]" /> Ask on WhatsApp</a>
        </div>
      </PageHero>

      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <h2 className="text-3xl font-bold sm:text-4xl">Why choose WebDoorstep for {s.name.toLowerCase()}</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {s.points.map((p, i) => (
              <Reveal key={p.title} delay={(i % 2) * 90}>
                <div data-spotlight className="panel h-full p-6 sm:p-8">
                  <span className="font-display text-sm font-bold text-amber">0{i + 1}</span>
                  <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
                  <p className="mt-2 text-fog">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="wrap grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
          <Reveal>
            <div className="ring-glow panel relative h-full overflow-hidden !rounded-[2rem] p-7 sm:p-10">
              <div className="absolute -top-28 -right-28 h-72 w-72 rounded-full bg-flame/20 blur-3xl" />
              <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-amber to-flame text-white"><ServiceIcon icon={s.icon} className="h-7 w-7" /></span>
              <h2 className="relative mt-6 text-3xl font-bold">What&apos;s included</h2>
              <ul className="relative mt-6 grid gap-3.5 sm:grid-cols-2">
                {s.included.map((x) => (
                  <li key={x} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-gradient-to-br from-amber to-flame text-white"><Check className="h-3.5 w-3.5" /></span>{x}</li>
                ))}
                <li className="flex gap-3 sm:col-span-2"><span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-white text-flame"><Check className="h-3.5 w-3.5" /></span><span><strong className="text-amber">Plus free maintenance</strong> after launch: 1 month with the launch offer, 2 months at the regular price.</span></li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={90}>
            <div className="panel h-full !rounded-[2rem] p-7 sm:p-10">
              <h2 className="text-2xl font-bold">Perfect for</h2>
              <ul className="mt-6 space-y-3">
                {s.idealFor.map((x) => <li key={x} className="flex items-center gap-3 text-snow/90"><span className="h-2 w-2 flex-none rounded-full bg-gradient-to-br from-violet to-cyan" />{x}</li>)}
              </ul>
              <Link href="/contact" className="btn-primary mt-8">Get a free quote <ArrowRight /></Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="text-3xl font-bold sm:text-4xl">{s.name}: common questions</h2>
          </Reveal>
          <Reveal delay={80}><Faq items={s.faqs} /></Reveal>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <h2 className="text-2xl font-bold sm:text-3xl">More services</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((o) => (
              <Link key={o.slug} href={`/services/${o.slug}`} data-spotlight className="group panel flex flex-col p-5 transition-colors hover:border-white/20">
                <span className="text-amber"><ServiceIcon icon={o.icon} /></span>
                <span className="mt-4 font-semibold text-white">{o.name}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-3 text-sm text-fog transition-all group-hover:gap-2 group-hover:text-amber">View <ArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
