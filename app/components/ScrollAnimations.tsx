"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Every selector is scoped under `.site` so none of this reaches the admin
   panel, which shares the root layout.

   Animations are written as `from` tweens rather than pre-hiding elements in
   CSS: if this component ever fails to load, the content is still on screen
   at its natural position instead of being stuck invisible. */
const REVEAL = { y: 28, opacity: 0, duration: 0.7, ease: "power2.out" } as const;

const BATCHES: { selector: string; stagger?: number; y?: number }[] = [
  { selector: ".site .stat", stagger: 0.08 },
  { selector: ".site .program-card", stagger: 0.12 },
  { selector: ".site .step", stagger: 0.09 },
  { selector: ".site .book-card", stagger: 0.12 },
  { selector: ".site .achievement-grid article", stagger: 0.1 },
  { selector: ".site .testimonial-grid article", stagger: 0.1 },
  { selector: ".site .credentials li", stagger: 0.07, y: 16 },
  { selector: ".site .ticks li", stagger: 0.07, y: 16 },
];

/* Headings, eyebrows and other one-off blocks that reveal as they scroll in. */
const SINGLES = [
  ".site .section > .eyebrow",
  ".site .about .eyebrow",
  ".site .featured .eyebrow",
  ".site .enrollment .eyebrow",
  ".site h2",
  ".site .subhead",
  ".site .method-head p",
  ".site blockquote",
  ".site .parent-note",
  ".site .portrait-frame",
  ".site .featured-images",
  ".site .about-cta",
  ".site .enrollment .actions",
];

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /* `from` tweens set their start state immediately, so everything below the
       fold is hidden until its trigger fires. If setup throws part-way, that
       would strand content invisible — so bail out by clearing the inline
       styles GSAP applied. */
    const revealEverything = () => {
      gsap.set(
        gsap.utils.toArray<HTMLElement>(
          [...SINGLES, ...BATCHES.map((b) => b.selector), ".site .hero h1 span"].join(",")
        ),
        { clearProps: "all" }
      );
    };

    let ctx: gsap.Context | undefined;
    try {
      ctx = gsap.context(() => {
      // Hero: runs on load rather than on scroll, since it is already in view.
      const heroLines = gsap.utils.toArray<HTMLElement>(".site .hero h1 span");
      if (heroLines.length) {
        gsap
          .timeline({ defaults: { ease: "power3.out" } })
          .from(".site .hero .eyebrow", { y: 18, opacity: 0, duration: 0.6 })
          .from(heroLines, { y: 40, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.3")
          .from(".site .hero-copy", { y: 20, opacity: 0, duration: 0.7 }, "-=0.5")
          .from(".site .hero .quote", { y: 18, opacity: 0, duration: 0.6 }, "-=0.45")
          .from(".site .hero .actions .btn", { y: 18, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.35")
          .from(".site .hero-badges span", { y: 16, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.3")
          .from(".site .doctor-card-float", { x: 24, opacity: 0, duration: 0.8 }, "-=0.7");
      }

      for (const sel of SINGLES) {
        gsap.utils.toArray<HTMLElement>(sel).forEach((el) => {
          gsap.from(el, {
            ...REVEAL,
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
      }

      for (const { selector, stagger = 0.1, y = REVEAL.y } of BATCHES) {
        const items = gsap.utils.toArray<HTMLElement>(selector);
        if (!items.length) continue;
        ScrollTrigger.batch(items, {
          start: "top 88%",
          once: true,
          onEnter: (targets) =>
            gsap.from(targets, {
              y,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger,
            }),
        });
      }
      });
    } catch {
      ctx?.revert();
      revealEverything();
      return;
    }

    // Fonts and images settling can change element positions after the
    // triggers are measured.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx?.revert();
    };
  }, [pathname]);

  return null;
}
