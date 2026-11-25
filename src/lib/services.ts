export type ServiceIcon = "design" | "code" | "cart" | "refresh" | "search" | "shield";

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: ServiceIcon;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  points: { title: string; text: string }[];
  included: string[];
  idealFor: string[];
  faqs: { q: string; a: string }[];
};

export const servicesData: Service[] = [
  {
    slug: "website-design",
    name: "Website Design",
    short: "Custom, modern designs made for your brand and built to turn visitors into customers.",
    icon: "design",
    metaTitle: "Website Design Services for Small Businesses",
    metaDescription:
      "Custom website design for small businesses worldwide. Modern, mobile-first designs that match your brand and turn visitors into customers. Free quote from WebDoorstep.",
    h1: "Website design that makes customers trust you in seconds",
    intro:
      "People decide whether to trust a business within a few seconds of opening its website. We design clean, modern websites around your brand, your customers and the action you want them to take, whether that's a call, a WhatsApp message, a booking or a sale.",
    points: [
      { title: "Designed around your customers", text: "We start with who your customers are and what they need to know, then plan every page so they find it fast." },
      { title: "Mobile-first layouts", text: "Most visitors arrive on a phone. Every layout is designed for small screens first, then scaled up for tablets and computers." },
      { title: "Your brand, not a template", text: "Colours, fonts, photos and wording that fit your business, so your site looks like you and not like everyone else." },
      { title: "Clear calls to action", text: "Call, WhatsApp and quote buttons placed where visitors expect them, so more visitors become enquiries." },
    ],
    included: ["Page plan and structure", "Custom visual design", "Mobile, tablet and desktop layouts", "Your approval before we build", "Help writing the text", "Brand colours and fonts"],
    idealFor: ["Businesses without a website", "Businesses whose site looks outdated", "New brands and startups", "Shops, salons, clinics, restaurants and services"],
    faqs: [
      { q: "Do you use templates?", a: "No. Every design is made for your business. We may reuse proven layout patterns, but the look, wording and structure are planned around your brand and customers." },
      { q: "Can I see the design before you build it?", a: "Yes. You approve the design before development starts, and you can ask for changes." },
      { q: "I don't have a logo or photos. Can you still help?", a: "Yes. We can work with simple text branding and quality stock photos, and suggest what to add later." },
    ],
  },
  {
    slug: "website-development",
    name: "Website Development",
    short: "Fast, secure websites built with modern technology and tested on every device.",
    icon: "code",
    metaTitle: "Website Development Services | Fast, Secure, Modern",
    metaDescription:
      "Professional website development with modern technology. Fast-loading, secure, mobile-friendly and SEO-ready websites, tested on every device. Get a free quote.",
    h1: "Website development that is fast, secure and built to last",
    intro:
      "A beautiful design only works if the website is fast and reliable. We build websites with modern technology used by leading companies, so your pages load quickly, stay secure and work properly on every phone, tablet and computer.",
    points: [
      { title: "Fast loading", text: "Optimised code, images and hosting so pages open quickly, even on slow mobile connections. Speed also helps your Google ranking." },
      { title: "Secure by default", text: "HTTPS everywhere, protected forms and secure hosting, so your visitors and your business stay safe." },
      { title: "Tested on real devices", text: "We check every page, link and form on phones, tablets and computers in different browsers before launch." },
      { title: "Easy to update", text: "We can add an admin panel so you can manage projects, reviews or messages yourself, or simply send us changes." },
    ],
    included: ["Responsive development", "Contact and quote forms", "WhatsApp and call buttons", "Speed optimisation", "Security setup and HTTPS", "Domain and hosting setup", "Launch and testing"],
    idealFor: ["Businesses that need a reliable website", "Sites that need forms, bookings or an admin panel", "Owners replacing a slow or broken website"],
    faqs: [
      { q: "What technology do you use?", a: "We usually build with Next.js and React, the same technology used by many large companies, hosted on a fast global network. We choose what fits your project." },
      { q: "Will my website work on phones?", a: "Yes. Every website is built mobile-first and tested on real phones before launch." },
      { q: "Can you connect my own domain?", a: "Yes. We connect your domain, set up HTTPS and make sure everything works before we hand it over." },
    ],
  },
  {
    slug: "ecommerce-website",
    name: "E-commerce Websites",
    short: "Online stores that make it easy for customers to browse, order and pay.",
    icon: "cart",
    metaTitle: "E-commerce Website Development | Online Store Design",
    metaDescription:
      "Get an online store built for your business. Mobile-friendly e-commerce websites with product pages, cart, checkout and payment setup. Free quote from WebDoorstep.",
    h1: "Online stores that make it easy to buy from you",
    intro:
      "Sell to customers anywhere, any time. We design and build online stores with clear product pages, a simple cart and a smooth checkout, so shoppers can find what they want and order it in a few taps.",
    points: [
      { title: "Product pages that sell", text: "Clear photos, prices, options and descriptions that answer customer questions before they ask." },
      { title: "Simple checkout", text: "Fewer steps and a mobile-friendly checkout, so fewer customers give up before paying." },
      { title: "Payments and orders", text: "We help set up payment methods that work in your country, plus order notifications." },
      { title: "Ready to grow", text: "Categories, search and offers that scale as you add more products." },
    ],
    included: ["Store design", "Product and category pages", "Cart and checkout", "Payment setup help", "Order notifications", "Mobile testing", "Launch support"],
    idealFor: ["Shops moving online", "Brands selling on Instagram or WhatsApp", "Businesses that want orders without a middleman"],
    faqs: [
      { q: "Which payment methods can I use?", a: "It depends on your country. We'll recommend options that work for you and your customers, and help you set them up." },
      { q: "Can I add products myself?", a: "Yes. We can build a simple admin area so you can add and edit products, or we can manage it for you." },
      { q: "Do you build stores for small catalogues?", a: "Yes. Whether you sell 5 products or 500, we design the store around what you sell." },
    ],
  },
  {
    slug: "website-redesign",
    name: "Website Redesign",
    short: "Turn an old, slow or hard-to-use website into a modern one that works.",
    icon: "refresh",
    metaTitle: "Website Redesign Services | Modernise Your Website",
    metaDescription:
      "Is your website old, slow or hard to use on phones? We redesign it into a modern, fast, mobile-friendly website that brings in more enquiries. Free quote.",
    h1: "Website redesign: turn your old site into your best salesperson",
    intro:
      "An outdated website can cost you customers without you knowing. If your site is slow, hard to use on a phone or doesn't reflect your business anymore, we redesign it into a modern, fast website while keeping what already works.",
    points: [
      { title: "Keep what works", text: "We review your current site, content and Google presence first, so you keep your best pages and search visibility." },
      { title: "A modern look", text: "A fresh design that makes your business look established and trustworthy today." },
      { title: "Much faster pages", text: "Rebuilt with modern technology, so pages load quickly on every device." },
      { title: "More enquiries", text: "Clearer structure and calls to action, so more visitors contact you." },
    ],
    included: ["Review of your current website", "New design and structure", "Content moved and improved", "Redirects to protect your Google ranking", "Speed and mobile improvements", "Launch and testing"],
    idealFor: ["Websites older than 3 years", "Sites that look broken on phones", "Businesses that have grown or rebranded"],
    faqs: [
      { q: "Will I lose my Google ranking?", a: "We take care to keep your important pages and set up redirects from old addresses, which protects the ranking you already have." },
      { q: "Can you keep my current domain?", a: "Yes. Your new website goes live on the same domain." },
      { q: "Can you reuse my current content?", a: "Yes. We move your existing text and photos across and improve them where needed." },
    ],
  },
  {
    slug: "seo-services",
    name: "SEO-Ready Websites",
    short: "Websites built so Google understands your business and customers can find you.",
    icon: "search",
    metaTitle: "SEO-Friendly Website Design | Get Found on Google",
    metaDescription:
      "SEO-friendly websites built to be found on Google. Fast pages, clean structure, keywords, structured data, sitemaps and Google Search Console setup. Free quote.",
    h1: "SEO-ready websites that help customers find you on Google",
    intro:
      "A website only brings customers if people can find it. We build every site with search engines in mind, from fast loading and clean code to keywords, page titles and structured data, so Google understands what you do and where you work.",
    points: [
      { title: "Technical SEO built in", text: "Fast pages, mobile-friendly layouts, clean headings, sitemaps and structured data that search engines read easily." },
      { title: "Keywords that match searches", text: "We research what your customers type into Google and use those words naturally in your pages." },
      { title: "Local and international", text: "Set up for customers in your city or around the world, including Google Business Profile guidance." },
      { title: "Google Search Console", text: "We connect your site to Google Search Console and submit your sitemap so new pages are found quickly." },
    ],
    included: ["Keyword research", "Page titles and descriptions", "Structured data (schema)", "XML sitemap and robots.txt", "Speed optimisation", "Google Search Console setup", "Google Business Profile tips"],
    idealFor: ["New websites that need to be found", "Businesses that don't appear on Google", "Local businesses that want more nearby customers"],
    faqs: [
      { q: "Can you guarantee first place on Google?", a: "No honest agency can guarantee rankings, because Google decides. What we do is build your site the way Google recommends, which gives you the best possible chance to rank." },
      { q: "How long does SEO take?", a: "New websites usually start appearing in searches within a few weeks. Ranking well for competitive searches takes months of good content, reviews and links." },
      { q: "Is SEO included in every website?", a: "Yes. Technical SEO is part of every website we build. Ongoing SEO work can be added as part of website care." },
    ],
  },
  {
    slug: "website-maintenance",
    name: "Website Care & Maintenance",
    short: "Updates, backups, security and fixes, so your website keeps working for you.",
    icon: "shield",
    metaTitle: "Website Maintenance Services | Updates, Security & Support",
    metaDescription:
      "Website maintenance for small businesses: daily checks, updates, security, backups and changes whenever you need them. 2 months included with every WebDoorstep website.",
    h1: "Website care and maintenance, so you can focus on your business",
    intro:
      "Every website needs care after launch: new prices, new photos, security updates and someone to call when something needs changing. Every WebDoorstep website includes 2 months of maintenance, and you can keep us on after that.",
    points: [
      { title: "Always online", text: "We check that your website is up and working, and fix problems before your customers notice." },
      { title: "Changes on request", text: "Send a WhatsApp message with new prices, offers, menus or photos and we update your site." },
      { title: "Security and backups", text: "Regular updates and backups keep your site safe and recoverable." },
      { title: "One point of contact", text: "No call centres. You talk directly to the people who built your website." },
    ],
    included: ["Uptime checks", "Content and photo updates", "Security updates", "Backups", "Small fixes and improvements", "Help whenever you need it"],
    idealFor: ["Busy business owners", "Sites with changing prices, menus or offers", "Anyone who wants peace of mind"],
    faqs: [
      { q: "What is included in the free 2 months?", a: "Fixes, small text and photo updates, and regular checks that your site is running." },
      { q: "What happens after 2 months?", a: "Your website stays online. You can choose ongoing care, or simply ask us for changes when you need them." },
      { q: "Can you maintain a website you didn't build?", a: "Often, yes. Send us the link and we'll tell you what's possible." },
    ],
  },
];

export const getService = (slug: string) => servicesData.find((s) => s.slug === slug);
