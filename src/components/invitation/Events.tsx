import { Lantern } from "./Lantern";
import { useLightSection } from "./useLightSection";
import type { PublicEvent } from "@/lib/publicInvitation";

function EventBlock({ event, index }: { event: PublicEvent; index: number }) {
  const ref = useLightSection<HTMLDivElement>({ start: "top 72%" });
  const alignRight = index % 2 === 1;

  return (
    <div
      ref={ref}
      className="lit-scope relative flex min-h-[92svh] flex-col justify-center overflow-hidden px-6 py-20"
      style={{ ["--lit" as string]: 0 }}
    >
      <div className={`absolute top-0 ${alignRight ? "left-6" : "right-6"}`} data-depth="0.6">
        <Lantern size={72} chain={110 + index * 40} glowScale={6.5} swayDuration={10 + index} />
      </div>

      <div className={`relative max-w-sm ${alignRight ? "ml-auto text-right" : "text-left"}`}>
        <p className="reveal text-[0.55rem] uppercase tracking-[0.42em] text-[color:var(--gold)]/70">
          Ceremony {String(index + 1).padStart(2, "0")}
        </p>
        {event.name && (
          <h2 className="reveal mt-4 display text-[2.4rem] leading-none text-[color:var(--ivory)] sm:text-5xl">
            {event.name.toUpperCase()}
          </h2>
        )}
        <div className={`reveal mt-6 rule ${alignRight ? "ml-auto" : ""}`} />
        {event.date && (
          <p className="reveal mt-6 text-sm uppercase tracking-[0.28em] text-[color:var(--ivory)]/75">
            {event.date}
          </p>
        )}
        {event.time && (
          <p className="reveal mt-2 text-sm uppercase tracking-[0.28em] text-[color:var(--ivory)]/55">
            {event.time}
          </p>
        )}
        {event.venue && (
          <p className="reveal mt-7 display text-xl text-[color:var(--ivory)]/90">{event.venue}</p>
        )}
        {event.city && (
          <p className="reveal mt-1 text-xs tracking-[0.14em] text-[color:var(--ivory)]/45">
            {event.city}
          </p>
        )}
        {event.note && (
          <p className="reveal mt-5 max-w-[30ch] text-sm italic leading-relaxed text-[color:var(--ivory)]/50">
            {event.note}
          </p>
        )}
        {event.mapsUrl && (
          <a
            className="reveal link-gold mt-8 inline-block"
            href={event.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
          >
            View location
          </a>
        )}
      </div>
    </div>
  );
}

export function Events({ events }: { events: PublicEvent[] }) {
  if (!events.length) return null;
  return (
    <section className="relative z-10">
      {events.map((event, i) => (
        <EventBlock key={event.id} event={event} index={i} />
      ))}
    </section>
  );
}
