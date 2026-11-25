import Link from "next/link";

export default function NotFound() {
  return (
    <main className="site-theme relative grid min-h-screen place-items-center overflow-hidden px-5 text-center">
      <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-flame/25 blur-[120px]" />
      <div className="relative">
        <p className="text-gradient font-display text-8xl font-bold">404</p>
        <h1 className="mt-4 text-3xl font-bold">This door leads nowhere</h1>
        <p className="mt-3 text-fog">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/" className="btn-primary mt-8">Go home</Link>
      </div>
    </main>
  );
}
