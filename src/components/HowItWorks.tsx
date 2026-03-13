"use client";

import { useEffect, useRef } from "react";
import { MAAI_URL, MAAI_NAME } from "@/lib/constants";

const steps = [
  {
    number: "01",
    title: "We build your foundation",
    description: `${MAAI_NAME} creates your website, sets up your blog, configures your forms, and builds your ad accounts — everything tailored to your business, your market, and your goals.`,
  },
  {
    number: "02",
    title: "MOCO takes over execution",
    description:
      "Blog posts, social media, newsletters, review requests, ad campaigns, and website updates — all handled day-to-day without you lifting a finger.",
  },
  {
    number: "03",
    title: "You focus on your business",
    description:
      "While you serve your customers, MOCO keeps your digital presence sharp, active, and growing — with monthly reporting so you always know what's working.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="py-24 sm:py-32 px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">
            How It Works
          </p>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-off-white">
            Three steps, zero hassle
          </h2>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className="reveal flex gap-6 sm:gap-8 items-start"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="flex-shrink-0 w-14 h-14 rounded-full border-2 border-accent/30 flex items-center justify-center">
                <span className="font-[var(--font-heading)] text-accent font-bold text-lg">
                  {step.number}
                </span>
              </div>
              <div>
                <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl font-semibold text-off-white mb-2">
                  {step.title}
                </h3>
                <p className="text-soft leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="reveal mt-12 text-center">
          <p className="text-muted text-sm">
            Powered by{" "}
            <a
              href={MAAI_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light underline underline-offset-4 transition-colors"
            >
              {MAAI_NAME}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
