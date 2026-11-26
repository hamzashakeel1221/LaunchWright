import Link from "next/link";
import type { Metadata } from "next";
import { getApprovedReviews, getPublishedProjects, getReviewStats, safe } from "@/lib/queries";
import { ProjectCard } from "@/components/ProjectCard";
import { ReviewCard } from "@/components/ReviewCard";
import { Stars } from "@/components/Stars";
import { Reveal } from "@/components/Reveal";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ArrowRight, ArrowUpRight, Check, Clock, Code, Globe, Mail, Pen, Phone, Rocket, Shield, Sparkle, Test, WhatsApp, Wrench, Zap } from "@/components/Icons";
import { site, whatsappLink, whatsappMessage } from "@/lib/site";
import { servicesData } from "@/lib/services";
import { faqSchema, pageMeta } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Website Design & Development for Small Businesses",
    description: site.description,
    path: "/",
  }),
  title: { absolute: `${site.name} | Website Design & Development for Small Businesses` },
};

const steps = [
  { icon: Pen, title: "Design", text: "We plan your pages and design a look that fits your brand. You approve it before we build." },
  { icon: Code, title: "Develop", text: "We build a fast, secure website that looks right on phones, tablets and computers." },
  { icon: Test, title: "Test", text: "We check every page, link and form on real devices and browsers before launch." },
  { icon: Rocket, title: "Launch", text: "We put your site online, connect your domain and set it up for Google." },
];

const industries = ["Restaurants", "Salons & barbers", "Clinics & dentists", "Gyms & trainers", "Plumbers & electricians", "Cleaning services", "Retail shops", "Real estate", "Bakeries & cafés", "Auto repair", "Consultants", "Photographers", "Schools & tutors", "Hotels"];
const capabilities = ["Mobile-first design", "SEO-ready", "Lightning-fast pages", "Secure HTTPS", "WhatsApp buttons", "Online stores", "Admin panels", "Booking & quote forms", "Google Maps", "Custom domains", "Speed optimised", "Analytics"];

const included = ["Custom design for your brand", "Full development, built mobile-first", "SEO setup: titles, schema, sitemap", "Testing on phones, tablets and computers", "Launch and domain setup"];
const care = ["Daily checks that your site is up", "Updates to prices, menus, offers and photos", "Security updates and backups", "Help whenever you need a change"];

const faqs = [
  { q: "How much does a website cost?", a: "Websites start from $150 during our limited-time launch offer (the regular starting price is $500), and that includes 2 months of free maintenance. Larger or custom sites, such as online stores, are quoted individually. Tell us about your business and we'll send a free quote with no obligation, usually within 24 hours." },
  { q: "How long does it take to build a website?", a: "It depends on the size of the site. Most small business websites take one to three weeks. You get a clear timeline with your quote, and updates at every step." },
  { q: "Will my website show up on Google?", a: "Every site we build is SEO-ready: fast, mobile-friendly, with keyword-rich titles, structured data and a sitemap submitted to Google Search Console. No one can guarantee first place, but we give your site the best possible start." },
  { q: "What do I need to give you?", a: "Your business name, your logo if you have one, photos, and the details customers need (services, opening hours, location). We can help write the text." },
  { q: "What happens after the 2 months of maintenance?", a: "Your website stays online. You can keep us on for ongoing website care, or simply ask us for changes whenever you need them." },
  { q: "Do you work with businesses outside my country?", a: "Yes. Everything happens online over WhatsApp, phone and email, so we work with businesses anywhere in the world." },
];

const stats = [
  { value: "2 months", label: "of maintenance included free" },
  { value: "100%", label: "mobile-friendly, every page" },
  { value: "24h", label: "to get your free quote" },
  { value: "Global", label: "we work with any country" },
];

export default async function Home() {
  const [projects, reviews, reviewStats] = await Promise.all([
    safe(getPublishedProjects(4), []),
    safe(getApprovedReviews(3), []),
    safe(getReviewStats(), { count: 0, average: 0 }),
  ]);
  const [design, development, ecommerce, redesign, seo, maintenance] = servicesData;

  return (
    <>
      <JsonLd data={faqSchema(faqs)} />

      {/* ============ HERO ============ */}
      <section className="relative isolate overflow-hidden pt-28 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pt-24">
        <div className="bg-grid absolute inset-0 -z-10" />
        <div className="animate-aurora absolute -top-48 -left-40 -z-10 h-[34rem] w-[34rem] rounded-full bg-violet/25 blur-[130px]" />
        <div className="animate-aurora absolute top-1/3 right-[-12rem] -z-10 h-[36rem] w-[36rem] rounded-full bg-flame/25 blur-[140px] [animation-delay:-7s]" />
        <div className="animate-aurora absolute -bottom-40 left-1/3 -z-10 h-[24rem] w-[24rem] rounded-full bg-cyan/10 blur-[120px] [animation-delay:-12s]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-night" />

        <div className="wrap grid items-center lg:grid-cols-[1.08fr_1fr] lg:grid-rows-[auto_auto]">
          <div className="relative z-10 text-center lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
            <span className="eyebrow animate-rise">Website design &amp; development agency</span>
            <h1 className="animate-rise text-[2.55rem] leading-[1.03] font-bold sm:text-[3.7rem] lg:text-[3.9rem] xl:text-[4.6rem] [animation-delay:90ms]">
              Website design that brings customers to your <span className="text-gradient">doorstep.</span>
            </h1>
          </div>

          <div className="relative -mx-5 h-[370px] sm:h-[500px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mx-0 lg:-mr-24 lg:h-[min(760px,88svh)] lg:[mask-image:linear-gradient(90deg,transparent,#000_10%,#000_96%,transparent)] xl:-mr-36">
            <HeroVisual />
          </div>

          <div className="relative z-10 text-center lg:col-start-1 lg:row-start-2 lg:self-start lg:text-left">
            <p className="animate-rise mx-auto mt-2 max-w-xl text-[1.05rem] leading-relaxed text-fog sm:text-lg lg:mx-0 lg:mt-6 [animation-delay:180ms]">
              We design, build, test and launch fast, modern websites for small businesses anywhere in the world. You tell us about your business. We handle everything else.
            </p>
            <div className="animate-rise mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start [animation-delay:270ms]">
              <Link href="/contact" data-magnetic className="btn-primary h-14 px-8 text-base">
                Get a free quote <ArrowRight />
              </Link>
              <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener" data-magnetic className="btn-ghost h-14 px-7 text-base">
                <WhatsApp className="h-5 w-5 text-[#25D366]" /> Chat on WhatsApp
              </a>
            </div>
            <ul className="animate-rise mt-9 mb-6 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-fog lg:mb-0 lg:justify-start [animation-delay:360ms]">
              {["2 months free maintenance", "Mobile-first & SEO-ready", "Free quote in 24h"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-amber to-flame text-white"><Check className="h-3 w-3" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <a href="#services" aria-label="Scroll to services" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs tracking-widest text-fog uppercase lg:flex">
          <span className="relative h-10 w-6 rounded-full border border-white/20">
            <span className="animate-floaty absolute top-2 left-1/2 h-2 w-1 -translate-x-1/2 rounded-full bg-amber" />
          </span>
        </a>
      </section>

      {/* ============ MARQUEE ============ */}
      <section aria-label="Who we build websites for" className="relative border-y border-white/[.06] bg-night-2/60 py-6">
        <div className="space-y-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
          <div className="animate-marquee flex w-max gap-3">
            {[...industries, ...industries].map((x, i) => (
              <span key={i} className="rounded-full border border-white/[.08] bg-white/[.03] px-4 py-2 text-sm font-medium whitespace-nowrap text-snow/85">{x}</span>
            ))}
          </div>
          <div className="animate-marquee-rev flex w-max gap-3">
            {[...capabilities, ...capabilities].map((x, i) => (
              <span key={i} className="flex items-center gap-2 px-2 py-1 text-sm whitespace-nowrap text-fog">
                <Sparkle className="h-3.5 w-3.5 text-amber" /> {x}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ SERVICES BENTO ============ */}
      <section id="services" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Our services</span>
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">Everything your business needs to <span className="text-gradient">get online</span></h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-fog">No need to hire a designer, a developer, an SEO expert and a hosting company. One team handles your whole website, from first sketch to launch and beyond.</p>
          </Reveal>

          <div className="mt-16 grid gap-4 md:grid-cols-6">
            {/* Design: large card with visual */}
            <Reveal className="md:col-span-4">
              <Link href={`/services/${design.slug}`} data-spotlight className="group panel flex h-full flex-col overflow-hidden p-6 transition-colors hover:border-white/20 sm:p-8 md:flex-row md:items-center md:gap-8">
                <div className="md:w-[45%]">
                  <ServiceBadge icon={design.icon} />
                  <h3 className="mt-6 text-2xl font-bold sm:text-3xl">{design.name}</h3>
                  <p className="mt-3 text-fog">{design.short}</p>
                  <MoreLink />
                </div>
                <div className="relative mt-8 flex-1 md:mt-0" aria-hidden="true">
                  <div className="absolute -inset-6 rounded-full bg-flame/20 blur-3xl" />
                  <div className="relative rounded-2xl border border-white/10 bg-night-3/90 p-3 shadow-2xl transition duration-700 group-hover:-translate-y-1 group-hover:rotate-[-1deg]">
                    <div className="flex gap-1.5 px-1 pb-2.5"><i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" /><i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" /><i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" /></div>
                    <div className="rounded-xl bg-gradient-to-br from-[#1e2a4a] to-[#3a2340] p-4">
                      <div className="h-3 w-2/3 rounded-full bg-white/90" />
                      <div className="mt-2 h-3 w-1/2 rounded-full bg-white/90" />
                      <div className="mt-3 h-2 w-3/4 rounded-full bg-white/30" />
                      <div className="mt-4 h-7 w-24 rounded-full bg-gradient-to-r from-amber to-flame" />
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                      {["from-amber to-flame", "from-violet to-fuchsia-500", "from-cyan to-sky-500"].map((g) => (
                        <div key={g} className="rounded-lg bg-white/[.05] p-2.5"><div className={`h-5 w-5 rounded-md bg-gradient-to-br ${g}`} /><div className="mt-2 h-1.5 w-4/5 rounded-full bg-white/40" /><div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-white/20" /></div>
                      ))}
                    </div>
                  </div>
                  <div className="animate-floaty absolute -right-2 -bottom-5 w-24 rounded-2xl border border-white/10 bg-night-3 p-2 shadow-2xl sm:w-28">
                    <div className="rounded-xl bg-gradient-to-b from-[#2a1f3d] to-[#1a2236] p-2"><div className="h-12 rounded-lg bg-gradient-to-br from-amber to-flame/60" /><div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/60" /><div className="mt-1.5 h-4 rounded-full bg-gradient-to-r from-amber to-flame" /></div>
                  </div>
                </div>
              </Link>
            </Reveal>

            {/* Development */}
            <Reveal delay={80} className="md:col-span-2">
              <ServiceCard s={development}>
                <div className="mt-6 rounded-xl border border-white/[.07] bg-night/70 p-4 font-mono text-[0.72rem] leading-relaxed" aria-hidden="true">
                  <p><span className="text-violet">const</span> <span className="text-cyan">site</span> = <span className="text-amber">build</span>({"{"}</p>
                  <p className="pl-4">fast: <span className="text-emerald-400">true</span>,</p>
                  <p className="pl-4">secure: <span className="text-emerald-400">true</span>,</p>
                  <p className="pl-4">mobile: <span className="text-emerald-400">true</span>,</p>
                  <p>{"}"});</p>
                </div>
              </ServiceCard>
            </Reveal>

            <Reveal className="md:col-span-2"><ServiceCard s={ecommerce}>
              <div className="mt-6 grid grid-cols-3 gap-2" aria-hidden="true">
                {["from-amber to-flame", "from-violet to-fuchsia-500", "from-cyan to-sky-500"].map((g) => (
                  <div key={g} className="rounded-xl border border-white/[.07] bg-white/[.03] p-2"><div className={`aspect-square rounded-lg bg-gradient-to-br ${g} opacity-80`} /><div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/40" /><div className="mt-1.5 h-1.5 w-1/3 rounded-full bg-amber/80" /></div>
                ))}
              </div>
            </ServiceCard></Reveal>

            <Reveal delay={80} className="md:col-span-2"><ServiceCard s={seo}>
              <div className="mt-6 space-y-2" aria-hidden="true">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-2 text-xs text-fog"><Globe className="h-3.5 w-3.5" /> website design near me</div>
                <div className="rounded-xl border border-amber/30 bg-amber/[.06] p-3">
                  <p className="text-[0.7rem] text-emerald-400">yourbusiness.com</p>
                  <p className="text-sm font-semibold text-[#8ab4ff]">Your Business | Trusted local experts</p>
                  <div className="mt-1.5 h-1.5 w-4/5 rounded-full bg-white/25" />
                </div>
              </div>
            </ServiceCard></Reveal>

            <Reveal delay={160} className="md:col-span-2"><ServiceCard s={redesign}>
              <div className="mt-6 flex items-center gap-3" aria-hidden="true">
                <div className="flex-1 rounded-xl border border-white/[.07] bg-white/[.03] p-3 grayscale"><div className="h-2 w-3/4 rounded bg-white/30" /><div className="mt-2 h-8 rounded bg-white/10" /><p className="mt-2 text-center text-[0.65rem] text-fog">Before</p></div>
                <ArrowRight className="h-5 w-5 flex-none text-amber" />
                <div className="flex-1 rounded-xl border border-amber/30 bg-gradient-to-br from-amber/15 to-violet/15 p-3"><div className="h-2 w-3/4 rounded-full bg-white/80" /><div className="mt-2 h-8 rounded-lg bg-gradient-to-r from-amber to-flame" /><p className="mt-2 text-center text-[0.65rem] text-white">After</p></div>
              </div>
            </ServiceCard></Reveal>

            <Reveal className="md:col-span-3"><ServiceCard s={maintenance}>
              <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs" aria-hidden="true">
                {[["Uptime", "Checked daily"], ["Backups", "Regular"], ["Changes", "On request"]].map(([a, b]) => (
                  <div key={a} className="rounded-xl border border-white/[.07] bg-white/[.03] p-3"><p className="font-semibold text-white">{a}</p><p className="mt-0.5 text-fog">{b}</p></div>
                ))}
              </div>
            </ServiceCard></Reveal>

            <Reveal delay={80} className="md:col-span-3">
              <div className="ring-glow panel relative flex h-full flex-col justify-between overflow-hidden p-6 sm:p-8">
                <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-flame/25 blur-3xl" />
                <div className="relative">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/[.06] text-amber"><Sparkle className="h-6 w-6" /></span>
                  <h3 className="mt-6 text-2xl font-bold">Not sure what you need?</h3>
                  <p className="mt-3 max-w-md text-fog">Tell us about your business in a WhatsApp message. We&apos;ll suggest the right website and send a free quote.</p>
                </div>
                <div className="relative mt-6 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">Get a free quote <ArrowRight /></Link>
                  <Link href="/services" className="btn-outline">All services</Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="process" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -z-10 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet/10 blur-[140px]" />
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">From first message to <span className="text-gradient-cool">launch day</span></h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-fog">Every step is our responsibility. You approve the design, we handle the rest and keep you updated.</p>
          </Reveal>
          <ol className="relative mt-16 grid gap-4 md:grid-cols-4">
            <div className="absolute top-[3.25rem] right-[12%] left-[12%] hidden h-px overflow-hidden bg-white/10 md:block">
              <span className="animate-beam absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-amber to-transparent" />
            </div>
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 110} className="relative">
                <div data-spotlight className="panel h-full p-6 text-center sm:p-7">
                  <span className="relative mx-auto grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-night-3 text-white shadow-[0_0_30px_-5px_rgba(255,140,70,.5)]">
                    <s.icon className="h-6 w-6 text-amber" />
                    <span className="absolute -top-2 -right-2 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-amber to-flame text-[0.7rem] font-bold">{i + 1}</span>
                  </span>
                  <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-2 text-fog">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============ STATS / WHY ============ */}
      <section className="relative py-8 md:py-12">
        <div className="wrap">
          <Reveal className="panel grid overflow-hidden !rounded-[2rem] sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <div key={s.label} className={`p-7 text-center sm:p-9 ${i > 0 ? "border-t border-white/[.07] sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-white/[.07]" : ""} ${i >= 2 ? "sm:border-t sm:border-white/[.07] lg:border-t-0" : ""} ${i > 0 ? "lg:border-l lg:border-white/[.07]" : ""}`}>
                <p className="text-gradient font-display text-4xl font-bold sm:text-5xl">{s.value}</p>
                <p className="mt-2 text-sm text-fog">{s.label}</p>
              </div>
            ))}
          </Reveal>

          <div className="mt-20 grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow">Why WebDoorstep</span>
              <h2 className="text-4xl font-bold sm:text-5xl">Built to win you <span className="text-gradient">customers</span>, not just look nice</h2>
              <p className="mt-5 text-lg text-fog">Your website is the front door of your business online. We make sure people can find it, trust it, and contact you in one tap.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary">Start your website <ArrowRight /></Link>
                <Link href="/projects" className="btn-outline">See our work</Link>
              </div>
            </Reveal>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Phone, t: "Phone-first design", d: "Most customers find you on a phone. Every page is designed for small screens first." },
                { icon: Zap, t: "Fast & secure", d: "Quick-loading pages on a global network, with HTTPS on every page." },
                { icon: Globe, t: "Ready for Google", d: "Keywords, titles, structured data and a sitemap so search engines understand you." },
                { icon: WhatsApp, t: "One-tap contact", d: "WhatsApp, call and quote buttons where customers expect them." },
                { icon: Wrench, t: "Easy changes", d: "New prices or photos? Send a message and we update it." },
                { icon: Clock, t: "Quick replies", d: "Talk directly to the people building your site, in your time zone." },
              ].map((f, i) => (
                <Reveal key={f.t} delay={(i % 2) * 90}>
                  <div data-spotlight className="panel h-full p-5 sm:p-6">
                    <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[.05] text-amber"><f.icon className="h-5 w-5" /></span>
                    <h3 className="mt-4 text-lg font-semibold">{f.t}</h3>
                    <p className="mt-1.5 text-sm text-fog">{f.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PACKAGES ============ */}
      <section id="packages" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="wrap">
          <Reveal className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">Packages</span>
            <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">Simple, complete, <span className="text-gradient">done for you</span></h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg text-fog">Websites start from <strong className="text-white">$150</strong> during our launch offer. Bigger or custom sites get a free quote after a short chat about what you need. No hidden costs.</p>
          </Reveal>
          <div className="mt-16 grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
            <Reveal>
              <div data-tilt="3" className="ring-glow panel relative flex h-full flex-col overflow-hidden !rounded-[2rem] p-7 sm:p-10">
                <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-flame/25 blur-3xl" />
                <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-violet/20 blur-3xl" />
                <span className="relative mb-6 self-start rounded-full bg-gradient-to-r from-amber to-flame px-3.5 py-1 text-xs font-semibold tracking-wider text-white uppercase">Launch offer · limited time</span>
                <h3 className="relative text-3xl font-bold sm:text-4xl">Your complete website</h3>
                <p className="relative mt-3 text-fog">Everything you need to get your business online and found.</p>
                <p className="relative mt-6 mb-8 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-lg text-fog line-through decoration-flame decoration-2"><span className="sr-only">Regular price </span>$500</span>
                  <span className="text-gradient text-5xl font-extrabold sm:text-6xl"><span className="sr-only">Launch price </span>$150</span>
                  <span className="text-sm font-semibold tracking-wide text-fog uppercase">starting price · one-time</span>
                </p>
                <ul className="relative mb-8 space-y-3.5">
                  {included.map((t) => (
                    <li key={t} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full bg-gradient-to-br from-amber to-flame text-white"><Check className="h-3.5 w-3.5" /></span>{t}</li>
                  ))}
                  <li className="flex gap-3 rounded-2xl border border-amber/30 bg-amber/[.07] p-4">
                    <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-white text-flame"><Wrench className="h-3.5 w-3.5" /></span>
                    <span><strong className="text-amber">2 months of maintenance included:</strong> fixes, small text and photo updates, and checks that your site is running.</span>
                  </li>
                </ul>
                <Link href="/contact" data-magnetic className="btn-primary relative mt-auto h-14 w-full text-base sm:w-auto sm:self-start sm:px-8">Claim the $150 launch price <ArrowRight /></Link>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div data-tilt="3" className="panel flex h-full flex-col !rounded-[2rem] p-7 sm:p-10">
                <span className="mb-6 self-start rounded-full border border-white/15 px-3.5 py-1 text-xs font-semibold tracking-wider text-fog uppercase">Optional add-on</span>
                <h3 className="text-3xl font-bold">Ongoing website care</h3>
                <p className="mt-3 mb-8 text-fog">Want us to keep running your site after the first 2 months? We look after it every day.</p>
                <ul className="mb-8 space-y-3.5">
                  {care.map((t) => (
                    <li key={t} className="flex gap-3"><span className="mt-0.5 grid h-6 w-6 flex-none place-items-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan"><Check className="h-3.5 w-3.5" /></span>{t}</li>
                  ))}
                </ul>
                <Link href="/contact" className="btn-dark mt-auto h-14 w-full text-base sm:w-auto sm:self-start sm:px-8">Ask about website care</Link>
              </div>
            </Reveal>
          </div>
          <p className="mt-8 flex items-center justify-center gap-2 text-center text-fog"><Shield className="h-4 w-4 text-amber" /> Quotes are free and there&apos;s no obligation.</p>
        </div>
      </section>

      {/* ============ PROJECTS ============ */}
      <section className="relative py-20 md:py-28">
        <div className="wrap">
          <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow">Our work</span>
              <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">Recent projects</h2>
              <p className="mt-4 text-fog">Projects marked “Sample” are designs we made to show our work. They are not client websites.</p>
            </div>
            {projects.length > 0 && <Link href="/projects" className="btn-outline">See all projects <ArrowUpRight /></Link>}
          </Reveal>
          {projects.length > 0 ? (
            <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0">
              {projects.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 2) * 90} className="w-[86%] flex-none snap-center sm:w-auto"><ProjectCard p={p} /></Reveal>
              ))}
            </div>
          ) : (
            <div className="panel mt-12 p-10 text-center text-fog">New projects are being added. Check back soon.</div>
          )}
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute top-1/2 left-0 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-flame/10 blur-[120px]" />
        <div className="wrap">
          <Reveal className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="eyebrow">Reviews</span>
              <h2 className="text-4xl font-bold sm:text-5xl md:text-6xl">{reviews.length > 0 ? "What clients say" : "Be one of our first clients"}</h2>
              {reviewStats.count > 0 && (
                <p className="mt-4 flex items-center gap-3 text-fog">
                  <Stars rating={Math.round(reviewStats.average)} /> {reviewStats.average.toFixed(1)} out of 5 from {reviewStats.count} review{reviewStats.count === 1 ? "" : "s"}
                </p>
              )}
            </div>
            {reviews.length > 0 && <Link href="/reviews#write" className="btn-outline">Write a review</Link>}
          </Reveal>
          {reviews.length > 0 ? (
            <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
              {reviews.map((r, i) => (
                <Reveal key={r.id} delay={i * 90} className="w-[86%] flex-none snap-center md:w-auto"><ReviewCard r={r} /></Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="panel mt-12 grid gap-8 p-8 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-amber/30 bg-amber/10 px-3 py-1 text-xs font-semibold tracking-widest text-amber uppercase"><Sparkle className="h-3.5 w-3.5" /> Founding clients</span>
                <h3 className="mt-5 text-2xl font-bold sm:text-3xl">WebDoorstep is new, and we&apos;re taking on our first clients now.</h3>
                <p className="mt-4 text-fog">That means you get the founder&apos;s full attention on your project. See the quality for yourself in <Link href="/projects" className="font-semibold text-amber underline underline-offset-4">our work</Link>, then tell us about your business.</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/contact" className="btn-primary">Get a free quote <ArrowRight className="h-4 w-4" /></Link>
                  <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener" className="btn-outline"><WhatsApp className="h-4 w-4" /> Chat on WhatsApp</a>
                </div>
              </div>
              <ul className="grid gap-3">
                {[
                  "Free quote with no obligation, usually within 24 hours",
                  "You work directly with the person building your site",
                  "Mobile-first, fast and SEO-ready from day one",
                  "2 months of maintenance included free after launch",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3 rounded-2xl border border-white/[.07] bg-white/[.03] p-4 text-white/90">
                    <Check className="mt-0.5 h-5 w-5 flex-none text-amber" /> <span>{t}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="about" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="wrap">
          <Reveal className="panel grid gap-8 p-8 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-12">
            <div className="grid h-24 w-24 flex-none place-items-center rounded-3xl bg-gradient-to-br from-amber to-flame text-4xl font-extrabold text-white shadow-lg shadow-flame/20 sm:h-28 sm:w-28" aria-hidden="true">H</div>
            <div>
              <span className="eyebrow">About us</span>
              <h2 className="text-3xl font-bold sm:text-4xl">Hi, I&apos;m Hamza, the founder of WebDoorstep.</h2>
              <p className="mt-4 max-w-3xl text-fog">I started WebDoorstep because too many good small businesses lose customers to slow, outdated or missing websites. I design, build and launch every site myself, so you talk to the person doing the work, not a sales team. You get a clear quote, a design you approve before anything is built, and 2 months of free maintenance after launch.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener" className="btn-outline"><WhatsApp className="h-4 w-4" /> Message me on WhatsApp</a>
                <Link href="/contact" className="btn-primary">Get a free quote <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="relative scroll-mt-24 py-20 md:py-28">
        <div className="wrap grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">FAQ</span>
            <h2 className="text-4xl font-bold sm:text-5xl">Questions, answered</h2>
            <p className="mt-5 text-lg text-fog">Something else on your mind? <a href={whatsappLink()} target="_blank" rel="noopener" className="font-semibold text-amber underline underline-offset-4">Ask us on WhatsApp.</a></p>
          </Reveal>
          <Reveal delay={80}><Faq items={faqs} /></Reveal>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="px-4 pt-8 pb-24 md:pb-32">
        <Reveal className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] border border-white/10 bg-night-2 px-6 py-16 text-center sm:px-12 md:py-24">
          <div className="bg-grid absolute inset-0 -z-10" />
          <div className="absolute top-0 left-1/2 -z-10 h-full w-56 -translate-x-1/2 bg-gradient-to-b from-[#fff3e0] via-amber/70 to-transparent opacity-25 blur-2xl" />
          <div className="absolute -top-40 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-flame/40 blur-[110px]" />
          <span className="eyebrow">Ready when you are</span>
          <h2 className="mx-auto max-w-3xl text-4xl font-bold sm:text-6xl">Your next customer is <span className="text-gradient">one step away</span></h2>
          <p className="mx-auto mt-5 max-w-xl text-fog sm:text-lg">Tell us about your business and get a free quote. WhatsApp is the fastest way to reach us.</p>
          <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3">
            <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener" data-spotlight className="glass flex items-center gap-3 rounded-2xl p-4 text-left transition hover:-translate-y-1">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-[#25D366]"><WhatsApp className="h-6 w-6" /></span>
              <span><span className="block text-xs text-fog">WhatsApp</span><span className="block font-semibold">{site.phoneDisplay}</span></span>
            </a>
            <a href={`tel:${site.phoneE164}`} data-spotlight className="glass flex items-center gap-3 rounded-2xl p-4 text-left transition hover:-translate-y-1">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-amber to-flame"><Phone /></span>
              <span><span className="block text-xs text-fog">Call us</span><span className="block font-semibold">{site.phoneDisplay}</span></span>
            </a>
            <Link href="/contact" data-spotlight className="glass flex items-center gap-3 rounded-2xl p-4 text-left transition hover:-translate-y-1">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-gradient-to-br from-violet to-cyan"><Mail /></span>
              <span><span className="block text-xs text-fog">Contact form</span><span className="block font-semibold">Send a message</span></span>
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ServiceBadge({ icon }: { icon: Parameters<typeof ServiceIcon>[0]["icon"] }) {
  return (
    <span className="relative grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/[.08] to-white/[.02] text-amber shadow-[0_0_30px_-8px_rgba(255,140,70,.6)]">
      <ServiceIcon icon={icon} />
    </span>
  );
}

function MoreLink() {
  return (
    <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-amber transition-all group-hover:gap-2.5">
      Learn more <ArrowRight />
    </span>
  );
}

function ServiceCard({ s, children }: { s: (typeof servicesData)[number]; children?: React.ReactNode }) {
  return (
    <Link href={`/services/${s.slug}`} data-spotlight className="group panel flex h-full flex-col p-6 transition-colors hover:border-white/20 sm:p-7">
      <ServiceBadge icon={s.icon} />
      <h3 className="mt-6 text-xl font-bold sm:text-2xl">{s.name}</h3>
      <p className="mt-2 text-fog">{s.short}</p>
      {children}
      <div className="mt-auto pt-2"><MoreLink /></div>
    </Link>
  );
}
