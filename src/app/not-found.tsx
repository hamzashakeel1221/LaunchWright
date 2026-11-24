import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="font-display text-6xl font-bold text-flame">404</p>
        <h1 className="mt-3 text-2xl">Page not found</h1>
        <p className="mt-2 text-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn-primary mt-6">Go home</Link>
      </div>
    </main>
  );
}
