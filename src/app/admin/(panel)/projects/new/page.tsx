import Link from "next/link";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const metadata = { title: "Add project" };

export default function NewProject() {
  return (
    <div className="space-y-6">
      <Link href="/admin/projects" className="text-sm text-muted hover:text-ink">← Projects</Link>
      <h1 className="text-3xl">Add project</h1>
      <ProjectForm />
    </div>
  );
}
