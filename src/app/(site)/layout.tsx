import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { MobileActionBar } from "@/components/MobileActionBar";
import { Interactions } from "@/components/Interactions";
import { JsonLd } from "@/components/JsonLd";
import { organizationSchema, websiteSchema } from "@/lib/seo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-theme noise min-h-screen">
      <JsonLd data={[organizationSchema(), websiteSchema()]} />
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
      <MobileActionBar />
      <Interactions />
    </div>
  );
}
