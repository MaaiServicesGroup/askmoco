"use client";

import { useEffect, useRef } from "react";

const differentiators = [
  {
    title: "All-in-one",
    description:
      "One team handles your entire digital presence. No juggling agencies, freelancers, or tools.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    title: "Fixed monthly cost",
    description:
      "Predictable pricing with no surprise invoices. Know exactly what you're paying every month.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "Built by Maai Designs",
    description:
      "Every service is backed by a design and development studio — not a faceless platform.",
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-3.26m0 0l-.93 2.24c-.28.67.28 1.4 1.01 1.28l2.36-.39m-2.44-3.13l.89-2.15a.62.62 0 01.78-.36l5.78 2.01m-7.45.5L2.7 8.87c-.29-.67.27-1.41 1.01-1.29l2.36.39m9.35 7.2l5.1-3.26m0 0l.93 2.24c.28.67-.28 1.4-1.01 1.28l-2.36-.39m2.44-3.13l-.89-2.15a.62.62 0 00-.78-.36l-5.78 2.01m7.45.5l1.72-4.17c.29-.67-.27-1.41-1.01-1.29l-2.36.39M12 2.25v.894m0 17.712v.894m4.636-16.964l-.632.632m-7.377 7.377l-.632.632m9.64-1.009l-.894.001m-17.712 0l-.894-.001m16.964 4.636l-.632-.632m-7.377-7.377l-.632-.632" />
      </svg>
    ),
  },
];

export default function WhyMoco() {
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
    <section ref={sectionRef} className="py-24 sm:py-32 px-6 bg-charcoal-light/50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 reveal">
          <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-3">
            Why MOCO
          </p>
          <h2 className="font-[var(--font-heading)] text-3xl sm:text-4xl md:text-5xl font-bold text-off-white">
            The simpler way to grow online
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {differentiators.map((item, i) => (
            <div
              key={item.title}
              className="reveal text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mx-auto mb-4">
                {item.icon}
              </div>
              <h3 className="font-[var(--font-heading)] text-lg font-semibold text-off-white mb-2">
                {item.title}
              </h3>
              <p className="text-soft leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
