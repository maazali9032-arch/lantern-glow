import { useEffect, useState } from "react";

function diff(target: string) {
  const ms = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export function Countdown({ target }: { target: string }) {
  const [t, setT] = useState(() => diff(target));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    ["Days", t.days],
    ["Hours", t.hours],
    ["Minutes", t.minutes],
    ["Seconds", t.seconds],
  ] as const;

  return (
    <div className="flex items-start justify-center gap-5 sm:gap-9" aria-live="off">
      {units.map(([label, value], i) => (
        <div key={label} className="flex items-start gap-5 sm:gap-9">
          <div className="flex flex-col items-center">
            <span className="display text-3xl tabular-nums text-[color:var(--ivory)] sm:text-4xl">
              {mounted ? String(value).padStart(2, "0") : "--"}
            </span>
            <span className="mt-2 text-[0.5rem] uppercase tracking-[0.32em] text-[color:var(--ivory)]/40">
              {label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="mt-3 text-[color:var(--gold)]/45" aria-hidden="true">
              ·
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
