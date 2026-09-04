import { useEffect, useRef, useState } from "react";

/**
 * Discreet fixed music control. Never autoplays with sound —
 * playback only starts from a user gesture, and fails silently.
 */
export function MusicControl({ enabled, src }: { enabled: boolean; src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
    };
  }, []);

  if (!enabled || !src) return null;

  const toggle = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      void el
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop preload="none" onError={() => setPlaying(false)} />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        aria-pressed={playing}
        className="fixed bottom-5 right-5 z-50 grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold-line)] bg-[color:var(--ink-soft)]/70 backdrop-blur-sm transition-colors hover:border-[color:var(--gold)]"
      >
        <span className="flex items-end gap-[3px]" aria-hidden="true">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-[2px] rounded-full bg-[color:var(--gold)]"
              style={{
                height: playing ? 14 : 8,
                animation: playing ? `eq 1.1s ease-in-out ${i * 0.18}s infinite` : undefined,
              }}
            />
          ))}
        </span>
      </button>
    </>
  );
}
