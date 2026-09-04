import { Lantern } from "./Lantern";
import { useLightSection } from "./useLightSection";
import type { LiveContent } from "@/lib/publicInvitation";

export function Venue({ venue }: { venue: LiveContent["venue"] }) {
  const ref = useLightSection<HTMLElement>();

  if (!venue.name && !venue.address && !venue.city && !venue.imageUrl) return null;

  return (
    <section
      ref={ref}
      className="lit-scope relative z-10 flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24"
      style={{ ["--lit" as string]: 0 }}
    >
      <svg
        className="pointer-events-none absolute bottom-0 left-1/2 w-[140%] max-w-none -translate-x-1/2 arch-silhouette"
        viewBox="0 0 800 320"
        aria-hidden="true"
        data-depth="0.3"
      >
        <g fill="none" stroke="var(--gold)" strokeWidth="1.2">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M${40 + i * 160} 320 L${40 + i * 160} 160 Q${120 + i * 160} 60 ${200 + i * 160} 160 L${200 + i * 160} 320`}
            />
          ))}
          <path d="M0 160 H800" opacity="0.35" />
        </g>
      </svg>

      <div className="absolute top-0 left-1/2 -translate-x-1/2" data-depth="0.7">
        <Lantern size={84} chain={90} glowScale={7} swayDuration={12} />
      </div>

      <div className="relative mt-28 max-w-md text-center">
        <p className="reveal text-[0.55rem] uppercase tracking-[0.44em] text-[color:var(--gold)]/70">
          The Venue
        </p>
        {venue.imageUrl && (
          <img
            src={venue.imageUrl}
            alt={venue.name ? `${venue.name} venue` : "Venue"}
            loading="lazy"
            className="reveal mt-7 w-full frame object-cover"
          />
        )}
        {venue.name && (
          <h2 className="reveal mt-5 display text-3xl leading-tight text-[color:var(--ivory)] sm:text-5xl">
            {venue.name}
          </h2>
        )}
        <div className="reveal mx-auto mt-7 rule" />
        {venue.address && (
          <p className="reveal mt-7 text-sm tracking-[0.16em] text-[color:var(--ivory)]/60">
            {venue.address}
          </p>
        )}
        {venue.city && (
          <p className="reveal mt-1 text-sm uppercase tracking-[0.3em] text-[color:var(--ivory)]/45">
            {venue.city}
          </p>
        )}
        {venue.mapsUrl && (
          <a
            className="reveal btn-ember mt-10 inline-block"
            href={venue.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            Get directions
          </a>
        )}
      </div>
    </section>
  );
}
