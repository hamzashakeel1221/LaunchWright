import Link from "next/link";
import { getApprovedReviews, getPublishedProjects, getReviewStats, safe } from "@/lib/queries";
import { ProjectCard } from "@/components/ProjectCard";
import { ReviewCard } from "@/components/ReviewCard";
import { Stars } from "@/components/Stars";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { DeviceMockup } from "@/components/DeviceMockup";
import { Check, Code, Globe, Mail, Pen, Phone, Rocket, Shield, Test, WhatsApp, Wrench } from "@/components/Icons";
import { site, whatsappLink } from "@/lib/site";

export const dynamic = "force-dynamic";

const steps = [
  { icon: Pen, title: "Design", text: "We plan your pages and design a look that fits your brand. You approve it before we build." },
  { icon: Code, title: "Develop", text: "We build a fast, secure website that looks right on phones, tablets and computers." },
  { icon: Test, title: "Test", text: "We check every page, link and form on real devices and browsers before launch." },
  { icon: Rocket, title: "Deploy", text: "We put your site online and connect your domain, so customers can find you." },
];

const features = [
  { title: "Phone-first design", text: "Most customers find you on their phone. Every page is designed for small screens first.", icon: Phone, big: true },
  { title: "WhatsApp & contact built in", text: "One tap to call, message or email you.", icon: WhatsApp },
  { title: "Fast and secure", text: "Quick to load, with a secure HTTPS connection.", icon: Shield },
  { title: "Ready for Google", text: "Page titles and descriptions set up so search engines understand your business.", icon: Globe },
  { title: "Easy changes", text: "Need new prices or photos? Send a message and we update it.", icon: Wrench, big: true },
];

const included = ["Custom design for your brand", "Full development, built to work on phones", "Testing on phones, tablets and computers", "Launch and domain setup"];
const care = ["Daily checks that your site is up and working", "Updates to prices, menus, offers and photos", "Security updates and backups", "Help whenever you need a change"];
const industries = ["Restaurants", "Salons & barbers", "Plumbers", "Clinics", "Gyms", "Cleaning services", "Retail shops", "Real estate", "Telecom", "Bakeries", "Auto repair", "Consultants"];

const faqs = [
  { q: "How much does a website cost?", a: "Every business needs something different, so we don't use fixed prices. Tell us about your business and we'll send a free quote with no obligation." },
  { q: "How long does it take?", a: "It depends on the size of the site. We'll give you a clear timeline together with your quote, and keep you updated at each step." },
  { q: "What do I need to give you?", a: "Your business name, logo if you have one, photos, and the details customers need (services, opening hours, location). We can help write the text." },
  { q: "What happens after the 2 months of maintenance?", a: "Your website stays online. If you want, we can keep looking after it with our ongoing website care, or you can ask us for changes whenever you need them." },
  { q: "Do you work with businesses outside my country?", a: "Yes. Everything happens online over WhatsApp, phone and email, so we work with businesses anywhere in the world." },
];

export default async function Home() {
  const [projects, reviews, stats] = await Promise.all([
    safe(getPublishedProjects(4), []),
    safe(getApprovedReviews(3), []),
    safe(getReviewStats(), { count: 0, average: 0 }),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink pt-10 pb-24 text-white sm:pt-16 md:pt-20 md:pb-32">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="animate-glow absolute -top-40 right-[-10%] -z-10 h-[520px] w-[520px] rounded-full bg-teal/30 blur-[120px]" />
        <div className="animate-glow absolute -bottom-48 left-[-15%] -z-10 h-[520px] w-[520px] rounded-full bg-flame/25 blur-[120px]" />
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-10">
          <div className="text-center lg:text-left">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-[#DDE5F0] sm:text-sm">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-75" /><span className="relative inline-flex h-2 w-2 rounded-full bg-teal" /></span>
              Taking new projects worldwide
            </span>
            <h1 className="mt-6 text-[2.5rem] leading-[1.05] font-bold tracking-tight !text-white sm:text-6xl lg:text-[4.2rem]">
              No website yet?<br className="hidden sm:block" /> <span className="text-gradient">We build it and launch it</span> for you.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[1.05rem] text-[#C9D3E3] sm:text-lg lg:mx-0">
              Cometfront designs, develops, tests and launches a professional website for your business. You tell us about your business. We handle everything else.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <Link href="/contact" className="btn-primary h-14 px-7 text-base">Get a free quote →</Link>
              <a href={whatsappLink("Hi Cometfront, I'd like a website for my business.")} target="_blank" rel="noopener" className="btn-ghost h-14 px-7 text-base">
                <WhatsApp className="h-5 w-5" /> Chat on WhatsApp
              </a>
            </div>
            <ul className="mt-9 grid grid-cols-3 gap-2 text-left sm:flex sm:flex-wrap sm:justify-center sm:gap-6 lg:justify-start">
              {[
                ["Phone-first", "design"],
                ["2 months", "maintenance included"],
                ["Any country", "we work online"],
              ].map(([a, b]) => (
                <li key={a} className="glass rounded-2xl px-3 py-3 sm:bg-transparent sm:p-0 sm:backdrop-blur-none sm:[border:0]">
                  <span className="block font-display text-sm font-bold text-white sm:text-base">{a}</span>
                  <span className="block text-xs text-[#9FB0C8] sm:text-sm">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-2 pb-6 sm:px-8 lg:px-0">
            <DeviceMockup />
          </div>
        </div>
      </section>

      {/* INDUSTRIES MARQUEE */}
      <section className="border-b border-line bg-white py-5" aria-label="Industries we build websites for">
        <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
          <div className="animate-marquee flex w-max gap-3">
            {[...industries, ...industries].map((x, i) => (
              <span key={i} className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium whitespace-nowrap text-ink">{x}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="scroll-mt-20 py-20 md:py-28">
        <div className="wrap">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Every step is our responsibility</h2>
            <p className="mt-4 text-lg text-muted">No need to hire a designer, a developer and a hosting expert. We handle the whole job and keep you updated.</p>
          </Reveal>
          <ol className="relative mt-14 grid gap-0 md:grid-cols-4 md:gap-5">
            <div className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-flame/0 via-flame/50 to-flame/0 md:block" />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 90} className="relative flex gap-5 pb-10 last:pb-0 md:flex-col md:items-center md:gap-0 md:pb-0 md:text-center">
                {i < steps.length - 1 && <span className="absolute top-14 bottom-0 left-7 w-px bg-gradient-to-b from-flame/50 to-line md:hidden" />}
                <span className="relative z-10 grid h-14 w-14 flex-none place-items-center rounded-2xl bg-ink text-white shadow-lg ring-8 ring-cream">
                  <s.icon className="h-6 w-6" />
                  <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-flame text-[0.7rem] font-bold">{i + 1}</span>
                </span>
                <div className="pt-1 md:mt-5 md:pt-0">
                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="mt-1.5 text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-14 flex flex-col items-start gap-4 rounded-3xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:p-8">
            <span className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-flame/15 text-flame"><Shield /></span>
            <p className="text-[1.02rem]"><strong className="text-flame-soft">One team, one point of contact.</strong> If something isn&apos;t right, it&apos;s our job to fix it, from the first design until after launch.</p>
          </Reveal>
        </div>
      </section>

      {/* FEATURES BENTO */}
      <section className="bg-white py-20 md:py-28">
        <div className="wrap">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">What every website gets</span>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Built to bring you customers</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 70} className={`card-hover rounded-3xl border border-line p-6 sm:p-7 ${f.big ? "bg-gradient-to-br from-cream to-white lg:col-span-2" : "bg-cream"} ${i === 0 ? "lg:row-span-1" : ""}`}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-white"><f.icon className="h-6 w-6" /></span>
                <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-muted">{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section id="packages" className="scroll-mt-20 py-20 md:py-28">
        <div className="wrap">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Packages</span>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">What you get</h2>
            <p className="mt-4 text-lg text-muted">Every business is different, so we send a free quote after a short chat about what you need.</p>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
            <Reveal className="relative flex flex-col overflow-hidden rounded-[2rem] bg-ink p-7 text-white sm:p-10">
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-flame/25 blur-3xl" />
              <span className="relative mb-5 self-start rounded-full bg-flame px-3.5 py-1 text-xs font-semibold tracking-wider uppercase">Website package</span>
              <h3 className="relative text-3xl font-bold !text-white">Your complete website</h3>
              <p className="relative mt-2 mb-7 text-[#C9D3E3]">Everything you need to get your business online.</p>
              <ul className="relative mb-8 space-y-3.5">
                {included.map((t) => (
                  <li key={t} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal/20 text-teal"><Check className="h-3.5 w-3.5" /></span>{t}</li>
                ))}
                <li className="flex gap-3 rounded-2xl bg-white/5 p-3.5 ring-1 ring-flame/30">
                  <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-flame text-white"><Wrench className="h-3.5 w-3.5" /></span>
                  <span><strong className="text-flame-soft">2 months of maintenance included:</strong> fixes, small text and photo updates, and checks that your site is running.</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-primary relative mt-auto h-13 w-full sm:w-auto sm:self-start">Ask for a quote</Link>
            </Reveal>
            <Reveal delay={100} className="flex flex-col rounded-[2rem] border border-line bg-white p-7 sm:p-10">
              <span className="mb-5 self-start rounded-full bg-flame/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-flame-dark uppercase">Optional add-on</span>
              <h3 className="text-3xl font-bold">Ongoing website care</h3>
              <p className="mt-2 mb-7 text-muted">Want us to keep running your site after the first 2 months? We can manage it for you every day.</p>
              <ul className="mb-8 space-y-3.5">
                {care.map((t) => (
                  <li key={t} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-teal/15 text-teal"><Check className="h-3.5 w-3.5" /></span>{t}</li>
                ))}
              </ul>
              <Link href="/contact" className="btn-dark mt-auto h-13 w-full sm:w-auto sm:self-start">Ask about website care</Link>
            </Reveal>
          </div>
          <p className="mt-6 text-center text-muted">Quotes are free and there&apos;s no obligation.</p>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="bg-white py-20 md:py-28">
        <div className="wrap">
          <Reveal className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">Our work</span>
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Projects</h2>
              <p className="mt-4 text-muted">Projects marked “Sample” are designs we made to show our work. They are not client websites.</p>
            </div>
            {projects.length > 0 && <Link href="/projects" className="btn-outline">See all projects →</Link>}
          </Reveal>
          {projects.length > 0 ? (
            <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0">
              {projects.map((p) => (
                <div key={p.slug} className="w-[85%] flex-none snap-center sm:w-auto"><ProjectCard p={p} /></div>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-line bg-cream p-10 text-center text-muted">New projects are being added. Check back soon.</div>
          )}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <Reveal className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Reviews</span>
              <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">What people say</h2>
              {stats.count > 0 && (
                <p className="mt-4 flex items-center gap-3 text-muted">
                  <Stars rating={Math.round(stats.average)} /> {stats.average.toFixed(1)} out of 5 from {stats.count} review{stats.count === 1 ? "" : "s"}
                </p>
              )}
            </div>
            <Link href="/reviews#write" className="btn-outline">Write a review</Link>
          </Reveal>
          {reviews.length > 0 ? (
            <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
              {reviews.map((r) => (
                <div key={r.id} className="w-[85%] flex-none snap-center md:w-auto"><ReviewCard r={r} /></div>
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-dashed border-line bg-white p-10 text-center text-muted">
              No reviews yet. Worked with us? <Link href="/reviews#write" className="font-semibold text-flame-dark underline">Be the first to leave one.</Link>
            </div>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20 bg-white py-20 md:py-28">
        <div className="wrap grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Questions, answered</h2>
            <p className="mt-4 text-muted">Something else on your mind? <a href={whatsappLink()} target="_blank" rel="noopener" className="font-semibold text-flame-dark underline">Ask us on WhatsApp.</a></p>
          </Reveal>
          <Reveal delay={80}><Faq items={faqs} /></Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 md:py-24">
        <Reveal className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-ink px-6 py-14 text-center text-white sm:px-12 md:py-20">
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="absolute -top-32 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-flame/30 blur-[100px]" />
          <h2 className="mx-auto max-w-3xl text-3xl font-bold !text-white sm:text-5xl">Let&apos;s get your business online</h2>
          <p className="mx-auto mt-4 max-w-xl text-[#C9D3E3] sm:text-lg">Tell us about your business and we&apos;ll send you a free quote. WhatsApp is the fastest way to reach us.</p>
          <div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:grid-cols-3">
            <a href={whatsappLink("Hi Cometfront, I'd like a website for my business.")} target="_blank" rel="noopener" className="glass flex items-center gap-3 rounded-2xl p-4 text-left transition hover:-translate-y-1">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[#25D366]"><WhatsApp className="h-6 w-6" /></span>
              <span><span className="block text-xs text-[#9FB0C8]">WhatsApp</span><span className="block font-semibold">{site.phoneDisplay}</span></span>
            </a>
            <a href={`tel:${site.phoneE164}`} className="glass flex items-center gap-3 rounded-2xl p-4 text-left transition hover:-translate-y-1">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-flame"><Phone /></span>
              <span><span className="block text-xs text-[#9FB0C8]">Call us</span><span className="block font-semibold">{site.phoneDisplay}</span></span>
            </a>
            <Link href="/contact" className="glass flex items-center gap-3 rounded-2xl p-4 text-left transition hover:-translate-y-1">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-teal"><Mail /></span>
              <span><span className="block text-xs text-[#9FB0C8]">Contact form</span><span className="block font-semibold">Send a message</span></span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
