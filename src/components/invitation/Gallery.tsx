import { useEffect, useRef } from "react";
import { getGsap, prefersReducedMotion } from "@/lib/motion";
import { Lantern } from "./Lantern";
import { useLightSection } from "./useLightSection";
import type { PublicGalleryItem } from "@/lib/publicInvitation";

export function Gallery({ items }: { items: PublicGalleryItem[] }) {
  const ref = useLightSection<HTMLElement>({ parallax: false });
  const zoomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = zoomRef.current;
    if (!el || prefersReducedMotion()) return;
    const { gsap } = getGsap();
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gallery-img").forEach((img) => {
        gsap.fromTo(
          img,
          { scale: 1.14, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });
    }, el);
    return () => ctx.revert();
  }, [items.length]);

  if (!items.length) return null;

  return (
    <section
      ref={ref}
      className="lit-scope relative z-10 overflow-hidden px-6 py-24"
      style={{ ["--lit" as string]: 0 }}
    >
      <div className="absolute right-8 top-0" data-depth="0.5">
        <Lantern size={58} chain={130} glowScale={6} swayDuration={14} variant="simple" />
      </div>

      <div ref={zoomRef} className="mx-auto flex max-w-3xl flex-col gap-16">
        <p className="reveal text-center text-[0.55rem] uppercase tracking-[0.44em] text-[color:var(--gold)]/70">
          Moments
        </p>
        {items.map((item, i) => (
          <figure
            key={`${item.url}-${i}`}
            className={`reveal relative overflow-hidden frame ${i % 2 ? "sm:ml-16" : "sm:mr-16"}`}
          >
            <img
              src={item.url}
              alt={item.alt}
              {...(item.width ? { width: item.width } : {})}
              {...(item.height ? { height: item.height } : {})}
              loading="lazy"
              className="gallery-img h-full w-full object-cover"
            />
            <span className="light-pool" aria-hidden="true" />
            {item.caption && (
              <figcaption className="absolute bottom-3 left-4 text-[0.55rem] uppercase tracking-[0.34em] text-[color:var(--ivory)]/70">
                {item.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
