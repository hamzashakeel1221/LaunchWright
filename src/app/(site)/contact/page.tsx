import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { JsonLd } from "@/components/JsonLd";
import { Mail, Phone, WhatsApp } from "@/components/Icons";
import { site, whatsappLink, whatsappMessage } from "@/lib/site";
import { breadcrumbSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact Us for a Free Website Quote",
  description: "Get a free quote for your business website. Message WebDoorstep on WhatsApp, call, email or use the form. We reply within 24 hours and work with businesses worldwide.",
  path: "/contact",
});

export default function ContactPage() {
  const items = [
    { href: whatsappLink(whatsappMessage), label: "WhatsApp", value: site.phoneDisplay, icon: <WhatsApp className="h-6 w-6" />, color: "bg-[#25D366]", ext: true },
    { href: `tel:${site.phoneE164}`, label: "Phone", value: site.phoneDisplay, icon: <Phone />, color: "bg-gradient-to-br from-amber to-flame" },
    { href: `mailto:${site.email}?subject=${encodeURIComponent("Website quote")}`, label: "Email", value: site.email, icon: <Mail />, color: "bg-gradient-to-br from-violet to-cyan" },
  ];
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }])} />
      <PageHero
        eyebrow="Contact"
        title={<>Let&apos;s get your business <span className="text-gradient">online</span></>}
        lead="Tell us about your business and we'll send you a free quote, usually within 24 hours."
        crumbs={[{ name: "Home", href: "/" }, { name: "Contact", href: "/contact" }]}
      />
      <section className="pb-24 md:pb-32">
        <div className="wrap grid gap-8 lg:grid-cols-[1.4fr_.9fr]">
          <ContactForm />
          <aside className="space-y-4">
            {items.map((i) => (
              <a key={i.label} href={i.href} {...(i.ext ? { target: "_blank", rel: "noopener" } : {})} data-spotlight className="panel flex items-center gap-4 p-5 transition hover:-translate-y-1 hover:border-white/20">
                <span className={`grid h-12 w-12 flex-none place-items-center rounded-xl text-white ${i.color}`}>{i.icon}</span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-widest text-fog uppercase">{i.label}</span>
                  <span className="block font-semibold break-all text-white">{i.value}</span>
                </span>
              </a>
            ))}
            <p className="px-1 text-sm text-fog">We work with businesses in every time zone. WhatsApp is the fastest way to reach us.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
