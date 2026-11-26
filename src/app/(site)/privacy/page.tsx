import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How WebDoorstep collects, uses and protects the information you share when you contact us or use this website.",
  path: "/privacy",
});

const updated = "26 November 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" lead={`Last updated ${updated}. We keep this short and plain.`} crumbs={[{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }]} />
      <section className="pb-24 md:pb-32">
        <div className="wrap max-w-3xl space-y-8 text-fog [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_a]:text-amber [&_a]:underline [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-6">
          <div>
            <h2>Who we are</h2>
            <p>{site.name} is a website design and development studio. This policy explains what we do with information you share with us. Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
          </div>
          <div>
            <h2>What we collect</h2>
            <ul>
              <li>Details you send us on purpose: your name, email, phone or WhatsApp number, business name and what you need, when you use the contact form, email us, message us on WhatsApp or social media, or leave a review.</li>
              <li>Basic, anonymous visit statistics (pages viewed, country, device type) from privacy-friendly analytics that do not use advertising cookies.</li>
              <li>Technical data your browser sends to any website, such as IP address and browser type, used for security and keeping the site running.</li>
            </ul>
          </div>
          <div>
            <h2>How we use it</h2>
            <ul>
              <li>To reply to your enquiry, send you a quote and deliver the work you ask for.</li>
              <li>To show a review you chose to submit, after we approve it.</li>
              <li>To keep the website secure, fast and working.</li>
            </ul>
            <p className="mt-3">We do not sell your information and we do not share it for advertising.</p>
          </div>
          <div>
            <h2>Who can see it</h2>
            <p>Only {site.name}, and the service providers that run the website for us (hosting, database and email). They process data on our behalf and only for that purpose.</p>
          </div>
          <div>
            <h2>How long we keep it</h2>
            <p>Enquiries are kept while we are talking with you and for a reasonable period afterwards. Client project records are kept as long as we maintain your site. Ask us any time and we will delete your information, unless the law requires us to keep it.</p>
          </div>
          <div>
            <h2>Your choices and rights</h2>
            <p>You can ask us to show, correct or delete the information we hold about you, or to stop contacting you, by emailing <a href={`mailto:${site.email}`}>{site.email}</a>. If we have emailed or messaged you about our services, reply &ldquo;stop&rdquo; and we will not contact you again.</p>
          </div>
          <div>
            <h2>Cookies</h2>
            <p>This site uses only the cookies needed to work (for example, keeping the admin area signed in for our team). We do not use advertising or tracking cookies.</p>
          </div>
          <div>
            <h2>Changes</h2>
            <p>If we change this policy we will update the date above.</p>
          </div>
        </div>
      </section>
    </>
  );
}
