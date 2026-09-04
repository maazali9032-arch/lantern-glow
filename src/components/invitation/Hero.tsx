import { useEffect, useRef } from "react";
import { Lantern } from "./Lantern";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

interface HeroProps {
  invocation?: string;
  groomName?: string;
  brideName?: string;
  dateLine?: string;
}

export function Hero({ invocation, groomName, brideName, dateLine }: HeroProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { gsap } = getGsap();
    const reduced = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        ".hero-lantern",
        { y: reduced ? 0 : -220, rotate: reduced ? 0 : -7, opacity: 0 },
        { y: 0, rotate: 0, opacity: 1, duration: reduced ? 0.5 : 2.6, ease: "power3.out" },
      )
        .to(".hero-lantern", { rotate: 3.5, duration: 1.1, ease: "sine.inOut" }, "-=0.9")
        .to(".hero-lantern", { rotate: 0, duration: 1.6, ease: "sine.inOut" })
        .fromTo(el, { "--lit": 0 }, { "--lit": 1, duration: reduced ? 0.5 : 3.4 }, "-=2.4")
        .fromTo(
          ".hero-reveal",
          { opacity: 0, y: reduced ? 0 : 26, filter: "blur(14px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: reduced ? 0.4 : 1.6,
            stagger: reduced ? 0 : 0.35,
          },
          "-=2.6",
        )
        .fromTo(".hero-hint", { opacity: 0 }, { opacity: 1, duration: 1.2 }, "-=0.4");
    }, el);

    return () => ctx.revert();
  }, []);

  const names = [groomName, brideName].filter(Boolean) as string[];

  return (
    <section
      ref={ref}
      className="lit-scope relative z-10 flex min-h-[100svh] flex-col items-center justify-start overflow-hidden px-6 pb-24 pt-6"
      style={{ ["--lit" as string]: 0 }}
    >
      <div className="hero-lantern">
        <Lantern size={104} chain={90} glowScale={7.5} swayDuration={9} />
      </div>

      <div className="relative -mt-10 flex flex-col items-center text-center">
        {invocation && (
          <p className="hero-reveal invocation max-w-[24ch] text-balance text-[color:var(--gold)]">
            {invocation}
          </p>
        )}

        <div className="hero-reveal mt-10 rule" />

        {names.length > 0 && (
          <h1 className="mt-8 flex flex-col items-center">
            {names.map((name, i) => (
              <span key={name} className="flex flex-col items-center">
                {i > 0 && (
                  <span className="hero-reveal my-2 display text-2xl italic text-[color:var(--gold)] sm:text-3xl">
                    &amp;
                  </span>
                )}
                <span className="hero-reveal display text-[2.9rem] leading-[1.05] text-[color:var(--ivory)] sm:text-6xl">
                  {name.toUpperCase()}
                </span>
              </span>
            ))}
          </h1>
        )}

        {dateLine && (
          <p className="hero-reveal mt-8 text-[0.68rem] uppercase tracking-[0.46em] text-[color:var(--ivory)]/65">
            {dateLine}
          </p>
        )}
        <div className="hero-reveal mt-8 rule" />
      </div>

      <div className="hero-hint absolute bottom-8 flex flex-col items-center gap-3 opacity-0">
        <span className="text-[0.55rem] uppercase tracking-[0.4em] text-[color:var(--ivory)]/35">
          Scroll into the light
        </span>
        <span className="scroll-line" />
      </div>
    </section>
  );
}
