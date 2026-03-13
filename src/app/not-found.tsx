import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
          404
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl font-bold text-off-white mb-4">
          Page not found
        </h1>
        <p className="text-soft mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist. MOCO is still getting set up — head back to the homepage.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-charcoal font-semibold px-6 py-3 rounded-full transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
