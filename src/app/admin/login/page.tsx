import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdmin } from "@/lib/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = { title: "Admin login", robots: { index: false } };

export default async function LoginPage() {
  if (await getAdmin()) redirect("/admin");
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-5 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center"><Logo /></div>
        <div className="rounded-2xl bg-white p-7 shadow-2xl">
          <h1 className="text-2xl">Admin login</h1>
          <p className="mt-1 mb-6 text-sm text-muted">Sign in to manage projects, reviews and messages.</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
