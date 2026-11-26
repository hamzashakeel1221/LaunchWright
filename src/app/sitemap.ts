import type { MetadataRoute } from "next";
import { absolute } from "@/lib/seo";
import { servicesData } from "@/lib/services";
import { getPublishedProjects, safe } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const projects = await safe(getPublishedProjects(), []);
  return [
    { url: absolute("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absolute("/services"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...servicesData.map((s) => ({ url: absolute(`/services/${s.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.85 })),
    { url: absolute("/projects"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...projects.map((p) => ({ url: absolute(`/projects/${p.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.6 })),
    { url: absolute("/reviews"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absolute("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: absolute("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: absolute("/terms"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
