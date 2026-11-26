import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Service",
  description: "The simple terms that apply when you use the WebDoorstep website or hire us to design and build a website.",
  path: "/terms",
});

const updated = "26 November 2026";

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Service" lead={`Last updated ${updated}. The basics of working with us, in plain language.`} crumbs={[{ name: "Home", href: "/" }, { name: "Terms of Service", href: "/terms" }]} />
      <section className="pb-24 md:pb-32">
        <div className="wrap max-w-3xl space-y-8 text-fog [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_a]:text-amber [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
          <div>
            <h2>Using this website</h2>
            <p>You may browse this website and contact us through it. Please do not misuse it, attempt to break into it or send us spam or unlawful content. Projects marked &ldquo;Sample&rdquo; are designs we made to show our work, not client websites.</p>
          </div>
          <div>
            <h2>Quotes and projects</h2>
            <ul>
              <li>Every project starts with a free quote. A quote lists what is included, the price and the timeline, and applies once you accept it.</li>
              <li>You approve the design before we build it. Changes beyond what was agreed may be quoted separately.</li>
              <li>We need your content (text, logos, photos) on time. Delays on your side can move the launch date.</li>
            </ul>
          </div>
          <div>
            <h2>Payment</h2>
            <p>Payment terms, such as a deposit and the final payment on launch, are written in your quote. The final files and website go live once payment is complete.</p>
          </div>
          <div>
            <h2>Ownership</h2>
            <p>Once the project is fully paid, the website content and design made for you belong to you. We may show the finished site in our portfolio unless you ask us not to. Third-party tools, fonts and plugins stay under their own licences.</p>
          </div>
          <div>
            <h2>Maintenance</h2>
            <p>New websites include 2 months of maintenance after launch, as described on our site and in your quote. After that, ongoing care is optional and quoted separately.</p>
          </div>
          <div>
            <h2>Our responsibility</h2>
            <p>We build carefully and test before launch, but we cannot guarantee particular search rankings, sales or visitor numbers. To the extent the law allows, our liability is limited to the amount you paid us for the project.</p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>Questions about these terms? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          </div>
        </div>
      </section>
    </>
  );
}
