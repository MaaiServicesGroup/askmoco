"use client";

import { BOOKING_URL } from "@/lib/constants";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated grid background */}
      <div className="hero-grid absolute inset-0" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] orb" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/8 blur-[100px] orb"
        style={{ animationDelay: "-4s" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        {/* MOCO wordmark */}
        <div className="animate-fade-in-up mb-8">
          <h1 className="font-[var(--font-heading)] text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-off-white via-accent-light to-accent bg-clip-text text-transparent">
              MOCO
            </span>
          </h1>
          <p className="mt-3 text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-muted">
            Built by Maai Designs for small businesses
          </p>
        </div>

        {/* Headline */}
        <h2 className="animate-fade-in-up delay-100 font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6 text-off-white opacity-0">
          Everything your business needs online. Done.
        </h2>

        {/* Description */}
        <p className="animate-fade-in-up delay-200 text-lg sm:text-xl text-soft leading-relaxed max-w-2xl mx-auto mb-10 opacity-0">
          Website, blog, social media, newsletters, ads, reviews, and lead
          capture — all built and managed by a dedicated team so you can focus
          on running your business.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up delay-300 opacity-0 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#services"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-charcoal font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,180,216,0.3)] hover:-translate-y-0.5"
          >
            See What&apos;s Included
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light font-semibold px-6 py-3 rounded-full text-lg transition-all duration-300 border border-accent/30 hover:border-accent/60"
          >
            Book a Call
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
              />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-up delay-400 opacity-0 mt-16">
          <div className="w-6 h-10 border-2 border-muted/40 rounded-full mx-auto flex justify-center">
            <div className="w-1.5 h-3 bg-accent/60 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
