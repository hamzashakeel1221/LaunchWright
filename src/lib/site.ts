export const site = {
  name: "Cometfront",
  tagline: "Websites for small businesses, worldwide",
  description:
    "Cometfront designs, develops, tests and launches professional websites for small businesses anywhere in the world, with 2 months of maintenance included.",
  phoneDisplay: "+92 326 5477808",
  phoneE164: "+923265477808",
  whatsapp: "923265477808",
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
