import { Lantern } from "./Lantern";
import { useLightSection } from "./useLightSection";

interface FinaleProps {
  groomName?: string;
  brideName?: string;
}

export function Finale({ groomName, brideName }: FinaleProps) {
  const ref = useLightSection<HTMLElement>({ duration: 4, start: "top 85%" });
  const names = [groomName, brideName].filter(Boolean) as string[];

  return (
    <section
      ref={ref}
      className="lit-scope finale relative z-10 flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-6 py-28"
      style={{ ["--lit" as string]: 0 }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-2 sm:px-10"
        data-depth="0.4"
      >
        {[46, 64, 38, 72, 44].map((s, i) => (
          <Lantern
            key={i}
            size={s}
            chain={40 + ((i * 53) % 130)}
            glowScale={6}
            swayDuration={9 + i * 1.5}
            variant={i % 2 ? "simple" : "ornate"}
          />
        ))}
      </div>

      <div className="relative mt-28 flex flex-col items-center text-center">
        <p className="reveal text-[0.55rem] uppercase tracking-[0.5em] text-[color:var(--gold)]/75">
          With love
        </p>
        {names.length > 0 && (
          <h2 className="reveal mt-7 display text-4xl leading-tight text-[color:var(--ivory)] sm:text-6xl">
            {names.map((n, i) => (
              <span key={n}>
                {i > 0 && <span className="mx-3 italic text-[color:var(--gold)]">&amp;</span>}
                {n.toUpperCase()}
              </span>
            ))}
          </h2>
        )}
        <div className="reveal mt-8 rule" />
        <p className="reveal mt-8 max-w-[26ch] text-[0.62rem] uppercase tracking-[0.34em] text-[color:var(--ivory)]/55">
          Thank you for celebrating with us
        </p>
      </div>
    </section>
  );
}
