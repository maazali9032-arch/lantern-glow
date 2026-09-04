import { useEffect, useMemo, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";

/** Drifting dust motes + haze, fixed behind everything. */
export function Atmosphere() {
  const ref = useRef<HTMLDivElement | null>(null);

  const motes = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        top: (i * 61) % 100,
        size: 1 + ((i * 7) % 3),
        opacity: 0.12 + ((i % 5) * 0.06),
      })),
    [],
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".mote").forEach((m, i) => {
        gsap.to(m, {
          y: -40 - (i % 5) * 30,
          x: (i % 2 ? 1 : -1) * (12 + (i % 4) * 10),
          duration: 14 + (i % 7) * 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.3,
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 haze" />
      <div className="absolute inset-0 grain opacity-[0.35]" />
      {motes.map((m) => (
        <span
          key={m.id}
          className="mote absolute rounded-full bg-[color:var(--ember-bright)]"
          style={{
            left: `${m.left}%`,
            top: `${m.top}%`,
            width: m.size,
            height: m.size,
            opacity: m.opacity,
            filter: "blur(0.4px)",
          }}
        />
      ))}
    </div>
  );
}
