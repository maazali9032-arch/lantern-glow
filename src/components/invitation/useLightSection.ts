import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

interface Options {
  /** delay before the light begins to swell */
  delay?: number;
  /** how long the glow takes to reach full */
  duration?: number;
  /** parallax strength in px for [data-depth] children */
  parallax?: boolean;
  start?: string;
}

/**
 * Attaches the shared choreography to a section:
 *  1. lantern light swells (--lit 0 -> 1)
 *  2. .reveal children fade/blur into focus, staggered
 *  3. optional parallax on [data-depth="0.2"] style children
 */
export function useLightSection<T extends HTMLElement = HTMLElement>(options: Options = {}) {
  const ref = useRef<T | null>(null);
  const { delay = 0, duration = 2.2, parallax = true, start = "top 78%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap, ScrollTrigger } = getGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: el, start, once: true },
        delay,
      });

      tl.fromTo(
        el,
        { "--lit": 0 },
        { "--lit": 1, duration: reduced ? 0.4 : duration, ease: "power2.out" },
      );

      const reveals = el.querySelectorAll<HTMLElement>(".reveal");
      if (reveals.length) {
        tl.fromTo(
          reveals,
          { opacity: 0, y: reduced ? 0 : 22, filter: "blur(12px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: reduced ? 0.4 : 1.4,
            ease: "power2.out",
            stagger: reduced ? 0 : 0.22,
          },
          reduced ? 0 : "-=1.5",
        );
      }

      if (parallax && !reduced) {
        el.querySelectorAll<HTMLElement>("[data-depth]").forEach((layer) => {
          const depth = parseFloat(layer.dataset['depth'] || "0");
          gsap.fromTo(
            layer,
            { yPercent: depth * 8 },
            {
              yPercent: depth * -8,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });
      }

      ScrollTrigger.refresh();
    }, el);

    return () => ctx.revert();
  }, [delay, duration, parallax, start]);

  return ref;
}
