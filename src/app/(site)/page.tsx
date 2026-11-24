import Link from "next/link";
import { getApprovedReviews, getPublishedProjects, getReviewStats, safe } from "@/lib/queries";
import { ProjectCard } from "@/components/ProjectCard";
import { ReviewCard } from "@/components/ReviewCard";
import { Stars } from "@/components/Stars";
import { Check, Code, Globe, Mail, Pen, Phone, Rocket, Shield, Test, WhatsApp, Wrench } from "@/components/Icons";
import { site, whatsappLink } from "@/lib/site";

export const revalidate = 3600;

const steps = [
  { icon: Pen, title: "Design", text: "We plan your pages and design a look that fits your brand. You approve the design before we build it." },
  { icon: Code, title: "Develop", text: "We build a fast, secure website that looks right on phones, tablets and computers." },
  { icon: Test, title: "Test", text: "We check every page, link and form on different devices and browsers before anyone else sees it." },
  { icon: Rocket, title: "Deploy", text: "We put your website online and connect your domain name, so customers can find you." },
];

const included = [
  "Custom design for your brand",
  "Full development, built to work on phones",
  "Testing on phones, tablets and computers",
  "Launch and domain setup",
];

const care = [
  "Daily checks that your site is up and working",
  "Updates to prices, menus, offers and photos",
  "Security updates and backups",
  "Help whenever you need a change",
];

const regions = ["United States", "United Kingdom", "Australia", "Canada", "Europe", "Middle East", "Anywhere else"];

export default async function Home() {
  const [projects, reviews, stats] = await Promise.all([
    safe(getPublishedProjects(4), []),
    safe(getApprovedReviews(3), []),
    safe(getReviewStats(), { count: 0, average: 0 }),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="overflow-hidden bg-ink bg-[radial-gradient(1200px_500px_at_85%_-10%,rgba(31,182,168,.25),transparent_60%),radial-gradient(900px_500px_at_-10%_110%,rgba(255,107,53,.22),transparent_60%)] pt-16 pb-24 text-white md:pt-24 md:pb-28">
        <div className="wrap grid items-center gap-14 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <span className="eyebrow !text-flame-soft">{site.tagline}</span>
            <h1 className="text-4xl leading-[1.1] !text-white sm:text-5xl lg:text-6xl">
              No website yet? <span className="text-flame">We&apos;ll build it and launch it</span> for you.
            </h1>
            <p className="lead mt-6 !text-[#C9D3E3]">
              Launchwright designs, develops, tests and launches a professional website for your business. You tell us about your
              business, and we take care of everything else, from the first sketch until your site is live.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contact" className="btn-primary">Get a free quote</Link>
              <a href={whatsappLink("Hi Launchwright, I'd like a website for my business.")} target="_blank" rel="noopener" className="btn-ghost">
                <WhatsApp className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] text-[#C9D3E3]">
              {["Works on phones", "2 months of maintenance included", "Clients in any country"].map((t) => (
                <li key={t} className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal" />{t}</li>
              ))}
            </ul>
          </div>
          <div className="relative mx-auto w-full max-w-md" aria-hidden="true">
            <div className="overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-20px_rgba(0,0,0,.5)]">
              <div className="flex gap-1.5 bg-[#E9EDF3] px-3 py-2.5">
                <i className="h-2.5 w-2.5 rounded-full bg-flame" /><i className="h-2.5 w-2.5 rounded-full bg-[#C6CDD8]" /><i className="h-2.5 w-2.5 rounded-full bg-[#C6CDD8]" />
              </div>
              <div className="p-5">
                <div className="relative mb-4 h-24 rounded-xl bg-gradient-to-r from-ink to-ink-2">
                  <div className="absolute bottom-4 left-4 h-5 w-20 rounded-full bg-flame" />
                </div>
                <div className="mb-2.5 h-2.5 w-3/4 rounded bg-mist" />
                <div className="mb-4 h-2.5 w-1/2 rounded bg-mist" />
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="h-14 rounded-lg bg-mist" /><div className="h-14 rounded-lg bg-mist" /><div className="h-14 rounded-lg bg-mist" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-3 flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-xl sm:-left-6">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-teal text-xs text-white">✓</span>Tested on every device
            </div>
            <div className="absolute -top-4 -right-2 flex items-center gap-2 rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-ink shadow-xl sm:-right-4">
              <span className="grid h-6 w-6 place-items-center rounded-full bg-flame text-xs text-white">↑</span>Live and online
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-20 py-20 md:py-24">
        <div className="wrap">
          <span className="eyebrow">How it works</span>
          <h2 className="text-3xl md:text-4xl">Every step is our responsibility</h2>
          <p className="lead mt-3">You don&apos;t need to hire a designer, a developer and a hosting expert. We handle the full job, and you get updates at each stage.</p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="card p-6">
                <span className="font-display text-sm font-bold text-flame-dark">0{i + 1}</span>
                <div className="my-4 grid h-11 w-11 place-items-center rounded-xl bg-mist text-ink"><s.icon /></div>
                <h3 className="text-lg">{s.title}</h3>
                <p className="mt-1 text-[0.95rem] text-muted">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-4 rounded-2xl bg-ink p-6 text-white sm:flex-row sm:items-center">
            <Shield className="h-8 w-8 flex-none text-flame" />
            <p><strong className="text-flame">One team, one point of contact.</strong> If something isn&apos;t right, it&apos;s our job to fix it, from the design stage until after launch.</p>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="scroll-mt-20 border-y border-line bg-white py-20 md:py-24">
        <div className="wrap">
          <span className="eyebrow">Packages</span>
          <h2 className="text-3xl md:text-4xl">What you get</h2>
          <p className="lead mt-3">Every business is different, so we send you a quote after a short chat about what you need.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-3xl bg-ink p-7 text-white md:p-9">
              <span className="mb-4 self-start rounded-full bg-flame px-3 py-1 text-xs font-semibold tracking-wider uppercase">Website package</span>
              <h3 className="text-2xl !text-white">Your complete website</h3>
              <p className="mt-1 mb-6 text-[#C9D3E3]">Everything you need to get your business online.</p>
              <ul className="mb-8 space-y-3">
                {included.map((t) => <li key={t} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none text-teal" />{t}</li>)}
                <li className="flex gap-3">
                  <Wrench className="mt-0.5 h-5 w-5 flex-none text-flame" />
                  <span><strong className="text-flame-soft">2 months of maintenance included</strong>: fixes, small text and photo updates, and checks that the site is running</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-primary mt-auto self-start">Ask for a quote</Link>
            </div>
            <div className="flex flex-col rounded-3xl border border-line bg-cream p-7 md:p-9">
              <span className="mb-4 self-start rounded-full bg-flame/15 px-3 py-1 text-xs font-semibold tracking-wider text-flame-dark uppercase">Optional add-on</span>
              <h3 className="text-2xl">Ongoing website care</h3>
              <p className="mt-1 mb-6 text-muted">Want us to keep running your site after the first 2 months? We can manage it for you every day.</p>
              <ul className="mb-8 space-y-3">
                {care.map((t) => <li key={t} className="flex gap-3"><Check className="mt-1 h-4 w-4 flex-none text-teal" />{t}</li>)}
              </ul>
              <Link href="/contact" className="btn-dark mt-auto self-start">Ask about website care</Link>
            </div>
          </div>
          <p className="mt-6 text-center text-[0.95rem] text-muted">Quotes are free and there&apos;s no obligation.</p>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 md:py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Our work</span>
              <h2 className="text-3xl md:text-4xl">Projects</h2>
              <p className="lead mt-3">Projects marked “Sample” are designs we made to show our work. They are not client websites.</p>
            </div>
            {projects.length > 0 && <Link href="/projects" className="btn-outline">See all projects</Link>}
          </div>
          {projects.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {projects.map((p) => <ProjectCard key={p.slug} p={p} />)}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-muted">New projects are being added. Check back soon.</div>
          )}
        </div>
      </section>

      {/* WORLDWIDE */}
      <section className="border-y border-line bg-white py-20 md:py-24">
        <div className="wrap grid items-center gap-12 md:grid-cols-2">
          <div>
            <span className="eyebrow">Wherever you are</span>
            <h2 className="text-3xl md:text-4xl">We work with businesses in any country</h2>
            <p className="lead mt-3">Everything happens online, so your location doesn&apos;t matter. We work with you over WhatsApp, phone or email.</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {regions.map((r) => <span key={r} className="rounded-full border border-line bg-cream px-4 py-2 text-[0.95rem] font-medium">{r}</span>)}
            </div>
          </div>
          <div className="space-y-5">
            {[
              { t: "Made for your customers", d: "Your site is written for your local market, in clear and simple language." },
              { t: "Phones come first", d: "Most of your customers will visit on a phone, so we design for phones first." },
              { t: "Simple updates", d: "Send us a message when something changes, and we'll update your site." },
            ].map((x) => (
              <div key={x.t} className="flex gap-4">
                <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-teal/15 text-teal"><Globe /></span>
                <p className="text-muted"><strong className="block text-ink">{x.t}</strong>{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 md:py-24">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="eyebrow">Reviews</span>
              <h2 className="text-3xl md:text-4xl">What people say</h2>
              {stats.count > 0 && (
                <p className="mt-3 flex items-center gap-3 text-muted">
                  <Stars rating={Math.round(stats.average)} /> {stats.average.toFixed(1)} out of 5 from {stats.count} review{stats.count === 1 ? "" : "s"}
                </p>
              )}
            </div>
            <Link href="/reviews#write" className="btn-outline">Write a review</Link>
          </div>
          {reviews.length > 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {reviews.map((r) => <ReviewCard key={r.id} r={r} />)}
            </div>
          ) : (
            <div className="mt-10 rounded-2xl border border-dashed border-line bg-white p-10 text-center text-muted">
              No reviews yet. Worked with us? <Link href="/reviews#write" className="font-semibold text-flame-dark underline">Be the first to leave one.</Link>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-20 text-white">
        <div className="wrap">
          <span className="eyebrow !text-flame-soft">Contact</span>
          <h2 className="text-3xl !text-white md:text-4xl">Let&apos;s get your business online</h2>
          <p className="lead mt-3 !text-[#C9D3E3]">Tell us about your business, and we&apos;ll send you a free quote. WhatsApp is the fastest way to reach us.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <a href={whatsappLink("Hi Launchwright, I'd like a website for my business.")} target="_blank" rel="noopener" className="rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:-translate-y-1 hover:border-flame">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-[#25D366]"><WhatsApp className="h-6 w-6" /></span>
              <span className="block text-xs font-semibold tracking-widest text-[#9FB0C8] uppercase">WhatsApp</span>
              <span className="mt-1 block font-semibold">{site.phoneDisplay}</span>
            </a>
            <a href={`tel:${site.phoneE164}`} className="rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:-translate-y-1 hover:border-flame">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-flame"><Phone /></span>
              <span className="block text-xs font-semibold tracking-widest text-[#9FB0C8] uppercase">Phone</span>
              <span className="mt-1 block font-semibold">{site.phoneDisplay}</span>
            </a>
            <Link href="/contact" className="rounded-2xl border border-white/10 bg-ink-2 p-6 transition hover:-translate-y-1 hover:border-flame">
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-teal"><Mail /></span>
              <span className="block text-xs font-semibold tracking-widest text-[#9FB0C8] uppercase">Contact form</span>
              <span className="mt-1 block font-semibold">Send us a message</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
