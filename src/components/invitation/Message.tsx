import { Lantern } from "./Lantern";
import { useLightSection } from "./useLightSection";
import { Countdown } from "./Countdown";
import type { LiveContent, PublicPerson } from "@/lib/publicInvitation";

function Profile({ person, label }: { person: PublicPerson; label: string }) {
  const lines = [person.qualification, person.occupation, person.parents].filter(
    Boolean,
  ) as string[];
  if (!person.name && !person.photoUrl && lines.length === 0) return null;

  return (
    <div className="reveal flex flex-col items-center text-center">
      {person.photoUrl && (
        <img
          src={person.photoUrl}
          alt={person.name ? `${label} ${person.name}` : label}
          loading="lazy"
          className="mb-5 h-28 w-28 rounded-full border border-[color:var(--gold-line)] object-cover"
        />
      )}
      {person.name && (
        <p className="display text-2xl text-[color:var(--ivory)]">{person.name}</p>
      )}
      {lines.map((line) => (
        <p key={line} className="mt-1 text-xs tracking-[0.14em] text-[color:var(--ivory)]/50">
          {line}
        </p>
      ))}
    </div>
  );
}

export function Message({ content }: { content: LiveContent }) {
  const ref = useLightSection<HTMLElement>();
  const { groom, bride, relatives, countdownTarget, weddingDate, startTime, endTime } = content;

  const timeLine = [startTime, endTime].filter(Boolean).join(" – ");
  const hasProfiles = Boolean(
    groom.name || bride.name || groom.photoUrl || bride.photoUrl || groom.parents || bride.parents,
  );

  if (!hasProfiles && !relatives && !countdownTarget && !weddingDate) return null;

  return (
    <section
      ref={ref}
      className="lit-scope relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-24"
      style={{ ["--lit" as string]: 0 }}
    >
      <div className="absolute inset-x-0 top-0 flex justify-between px-6" data-depth="0.5">
        <Lantern size={54} chain={70} glowScale={6} swayDuration={11} variant="simple" />
        <Lantern size={64} chain={140} glowScale={6} swayDuration={13} />
      </div>

      <div className="relative mt-24 flex w-full max-w-md flex-col items-center text-center">
        {hasProfiles && (
          <div className="flex w-full flex-col items-center gap-12 sm:flex-row sm:items-start sm:justify-center">
            <Profile person={groom} label="Groom" />
            <Profile person={bride} label="Bride" />
          </div>
        )}

        {relatives && (
          <p className="reveal mt-10 max-w-[30ch] text-sm leading-relaxed text-[color:var(--ivory)]/55">
            {relatives}
          </p>
        )}

        {(weddingDate || timeLine) && (
          <>
            <div className="reveal mt-10 rule" />
            {weddingDate && (
              <p className="reveal mt-7 text-[0.62rem] uppercase tracking-[0.4em] text-[color:var(--ivory)]/70">
                {weddingDate}
              </p>
            )}
            {timeLine && (
              <p className="reveal mt-2 text-[0.62rem] uppercase tracking-[0.32em] text-[color:var(--ivory)]/45">
                {timeLine}
              </p>
            )}
          </>
        )}

        {countdownTarget && (
          <div className="reveal mt-12 w-full">
            <Countdown target={countdownTarget} />
          </div>
        )}
      </div>
    </section>
  );
}
