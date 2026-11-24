import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import { Mail, Phone, WhatsApp } from "@/components/Icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", description: "Get a free quote for your business website." };

export default function ContactPage() {
  const items = [
    { href: whatsappLink("Hi Cometfront, I'd like a website for my business."), label: "WhatsApp", value: site.phoneDisplay, icon: <WhatsApp className="h-6 w-6" />, color: "bg-[#25D366]", ext: true },
    { href: `tel:${site.phoneE164}`, label: "Phone", value: site.phoneDisplay, icon: <Phone />, color: "bg-flame" },
    { href: `mailto:${site.email}?subject=${encodeURIComponent("Website quote")}`, label: "Email", value: site.email, icon: <Mail />, color: "bg-teal" },
  ];
  return (
    <>
      <PageHero eyebrow="Contact" title="Let's get your business online" lead="Tell us about your business and we'll send you a free quote, usually within 24 hours." />
      <section className="py-16 md:py-20">
        <div className="wrap grid gap-10 lg:grid-cols-[1.4fr_.9fr]">
          <ContactForm />
          <aside className="space-y-4">
            {items.map((i) => (
              <a key={i.label} href={i.href} {...(i.ext ? { target: "_blank", rel: "noopener" } : {})} className="card-hover flex items-center gap-4 rounded-2xl border border-line bg-white p-5">
                <span className={`grid h-11 w-11 flex-none place-items-center rounded-xl text-white ${i.color}`}>{i.icon}</span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold tracking-widest text-muted uppercase">{i.label}</span>
                  <span className="block font-semibold break-all text-ink">{i.value}</span>
                </span>
              </a>
            ))}
            <p className="px-1 text-sm text-muted">We work with businesses in every time zone. WhatsApp is the fastest way to reach us.</p>
          </aside>
        </div>
      </section>
    </>
  );
}
