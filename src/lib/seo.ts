import type { Metadata } from "next";
import { site } from "./site";
import { servicesData, type Service } from "./services";

export const absolute = (path = "/") => `${site.url}${path === "/" ? "" : path}`;

/** Page metadata with canonical URL, Open Graph and Twitter cards. */
export function pageMeta({ title, description, path, keywords }: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  return {
    title,
    description,
    keywords: keywords ?? site.keywords,
    alternates: { canonical: absolute(path) },
    openGraph: { title: `${title} | ${site.name}`, description, url: absolute(path), siteName: site.name, type: "website", locale: "en_US", images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.shortTagline}` }] },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: ["/og.png"] },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/#business`,
    name: site.name,
    alternateName: "Web Doorstep",
    url: site.url,
    logo: `${site.url}/icon-512.png`,
    image: `${site.url}/og.png`,
    description: site.description,
    slogan: site.shortTagline,
    email: site.email,
    telephone: site.phoneE164,
    areaServed: { "@type": "Place", name: "Worldwide" },
    knowsLanguage: ["en", "ur"],
    priceRange: "$$",
    contactPoint: [{ "@type": "ContactPoint", telephone: site.phoneE164, email: site.email, contactType: "sales", availableLanguage: ["English", "Urdu"], areaServed: "Worldwide" }],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Website services",
      itemListElement: servicesData.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.name, description: s.short, url: absolute(`/services/${s.slug}`) } })),
    },
  };
}

export function websiteSchema() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, description: site.description, publisher: { "@id": `${site.url}/#business` }, inLanguage: "en" };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absolute(it.path) })) };
}

export function serviceSchema(s: Service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.name,
    serviceType: s.name,
    description: s.metaDescription,
    url: absolute(`/services/${s.slug}`),
    provider: { "@id": `${site.url}/#business` },
    areaServed: { "@type": "Place", name: "Worldwide" },
  };
}
