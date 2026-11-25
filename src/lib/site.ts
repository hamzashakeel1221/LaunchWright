export const site = {
  name: "WebDoorstep",
  /** The public address. Override with NEXT_PUBLIC_SITE_URL until the domain is connected. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://webdoorstep.com").replace(/\/$/, ""),
  tagline: "Website design & development for small businesses",
  shortTagline: "Websites that bring customers to your doorstep",
  description:
    "WebDoorstep is a website design and development agency for small businesses worldwide. We design, build, test and launch fast, mobile-friendly, SEO-ready websites, with 2 months of maintenance included. Get a free quote.",
  phoneDisplay: "+92 326 5477808",
  phoneE164: "+923265477808",
  whatsapp: "923265477808",
  email: "hamzashakeel16829@gmail.com",
  keywords: [
    "website design",
    "website development",
    "web design agency",
    "website designer",
    "website developer",
    "small business website",
    "business website design",
    "custom website design",
    "affordable website design",
    "ecommerce website development",
    "online store website",
    "website redesign",
    "responsive website design",
    "mobile friendly website",
    "SEO friendly website",
    "website maintenance",
    "landing page design",
    "Next.js website",
    "hire web developer",
    "make a website for my business",
  ],
};

export const whatsappMessage = `Hi ${site.name}, I'd like a website for my business.`;

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const services = [
  "New website",
  "Website redesign",
  "Online store",
  "SEO",
  "Ongoing website care",
  "Something else",
];
