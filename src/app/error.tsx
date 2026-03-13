"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-3">
          Error
        </p>
        <h1 className="font-[var(--font-heading)] text-4xl font-bold text-off-white mb-4">
          Something went wrong
        </h1>
        <p className="text-soft mb-8 max-w-md mx-auto">
          We hit an unexpected error. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-charcoal font-semibold px-6 py-3 rounded-full transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
