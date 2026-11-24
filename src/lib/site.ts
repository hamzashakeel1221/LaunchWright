export const site = {
  name: "Launchwright",
  tagline: "Websites for small businesses, worldwide",
  description:
    "Launchwright designs, develops, tests and launches professional websites for small businesses anywhere in the world, with 2 months of maintenance included.",
  phoneDisplay: "+92 332 5694738",
  phoneE164: "+923325694738",
  whatsapp: "923325694738",
  email: "hamzashakeel16829@gmail.com",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const services = [
  "New website",
  "Website redesign",
  "Online store",
  "Ongoing website care",
  "Something else",
];
