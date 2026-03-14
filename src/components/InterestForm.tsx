"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES, BOOKING_URL } from "@/lib/constants";

const interestOptions = [
  ...SERVICES.map((s) => ({ id: s.id, label: s.shortTitle })),
  { id: "everything", label: "Everything" },
];

export default function InterestForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  function toggleInterest(id: string) {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      business: formData.get("business") as string,
      interests,
    };

    try {
      const res = await fetch("/api/interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Submission failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <section id="get-started" className="py-24 sm:py-32 px-6">
        <div className="max-w-lg mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="font-[var(--font-heading)] text-3xl font-bold text-off-white mb-4">
            We got it
          </h2>
          <p className="text-soft text-lg mb-6">
            Thanks! We&apos;ll review your needs and follow up within one business day.
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-charcoal font-semibold px-6 py-3 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,180,216,0.3)]"
          >
            Or book a call now
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="get-started" className="py-24 sm:py-32 px-6">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-10 reveal">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">
            Get Started
          </p>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl font-bold text-off-white mb-3">
            Let&apos;s talk about your business
          </h2>
          <p className="text-soft">
            Tell us a bit about what you need, and we&apos;ll follow up with a plan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="reveal space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-soft mb-1.5">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-charcoal-light border border-slate/40 rounded-xl px-4 py-3 text-off-white placeholder-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-soft mb-1.5">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full bg-charcoal-light border border-slate/40 rounded-xl px-4 py-3 text-off-white placeholder-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
              placeholder="you@yourbusiness.com"
            />
          </div>

          <div>
            <label htmlFor="business" className="block text-sm font-medium text-soft mb-1.5">
              Business Name <span className="text-muted">(optional)</span>
            </label>
            <input
              type="text"
              id="business"
              name="business"
              className="w-full bg-charcoal-light border border-slate/40 rounded-xl px-4 py-3 text-off-white placeholder-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
              placeholder="Your business"
            />
          </div>

          <fieldset>
            <legend className="block text-sm font-medium text-soft mb-2.5">
              Which services interest you?
            </legend>
            <div className="flex flex-wrap gap-2.5">
              {interestOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleInterest(opt.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                    interests.includes(opt.id)
                      ? "bg-accent/15 border-accent/50 text-accent-light"
                      : "bg-charcoal-lighter border-slate/30 text-soft hover:border-accent/30"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-accent hover:bg-accent-light text-charcoal font-semibold py-3.5 rounded-xl text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,180,216,0.3)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Submitting...
              </span>
            ) : (
              "Get Started"
            )}
          </button>

          {status === "error" && (
            <p className="text-center text-red-400 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
