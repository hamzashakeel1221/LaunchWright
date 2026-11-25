import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Website Design & Development for Small Businesses`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "Web design",
  alternates: { canonical: site.url },
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icon-192.png", sizes: "192x192", type: "image/png" }], apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Website Design & Development for Small Businesses`,
    description: site.description,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${site.name}: ${site.shortTagline}` }],
  },
  twitter: { card: "summary_large_image", title: `${site.name} | Website Design & Development`, description: site.description, images: ["/og.png"] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#05080f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans leading-relaxed">{children}</body>
    </html>
  );
}
