import { Lantern } from "./Lantern";
import type { ShopFallback } from "@/lib/publicInvitation";

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[color:var(--ink)] px-6 py-20 text-[color:var(--ivory)]">
      <div className="lit-scope flex flex-col items-center text-center" style={{ ["--lit" as string]: 1 }}>
        <Lantern size={78} chain={70} glowScale={7} swayDuration={10} />
        <div className="mt-10 max-w-sm">{children}</div>
      </div>
    </main>
  );
}

export function LoadingScreen() {
  return (
    <Shell>
      <p className="text-[0.55rem] uppercase tracking-[0.44em] text-[color:var(--ivory)]/45">
        Lighting the lanterns
      </p>
    </Shell>
  );
}

export function NotFoundScreen() {
  return (
    <Shell>
      <h1 className="display text-3xl text-[color:var(--ivory)]">Invitation not found</h1>
      <div className="mx-auto mt-6 rule" />
      <p className="mt-6 text-sm leading-relaxed text-[color:var(--ivory)]/55">
        This invitation link does not exist. Please check the link you were given.
      </p>
    </Shell>
  );
}

export function RequestErrorScreen({ onRetry }: { onRetry?: () => void }) {
  return (
    <Shell>
      <h1 className="display text-3xl text-[color:var(--ivory)]">Unable to load</h1>
      <div className="mx-auto mt-6 rule" />
      <p className="mt-6 text-sm leading-relaxed text-[color:var(--ivory)]/55">
        We couldn&apos;t load this invitation right now. Please check your connection and try again.
      </p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="btn-ember mt-9">
          Try again
        </button>
      )}
    </Shell>
  );
}

export function FallbackScreen({ shop }: { shop: ShopFallback }) {
  const lines = [shop.address, shop.city, shop.businessContact].filter(Boolean) as string[];


  return (
    <Shell>
      <h1 className="display text-3xl text-[color:var(--ivory)]">Invitation unavailable</h1>
      <div className="mx-auto mt-6 rule" />
      <p className="mt-6 text-sm leading-relaxed text-[color:var(--ivory)]/55">
        This invitation is no longer available.
      </p>
      {(shop.name || lines.length > 0 || shop.phone || shop.whatsapp || shop.businessContact) && (
        <div className="mt-10">
          {shop.name && <p className="display text-xl text-[color:var(--ivory)]">{shop.name}</p>}
          {[shop.address, shop.city, shop.businessContact].filter(Boolean).map((l) => (
            <p key={l} className="mt-1 text-xs tracking-[0.16em] text-[color:var(--ivory)]/45">
              {l}
            </p>
          ))}
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            {shop.phone && (
              <a href={`tel:${shop.phone}`} className="btn-ember">
                Call
              </a>
            )}
            {shop.whatsapp && (
              <a
                href={
                  /^https?:/i.test(shop.whatsapp)
                    ? shop.whatsapp
                    : `https://wa.me/${shop.whatsapp.replace(/\D/g, "")}`
                }
                target="_blank"
                rel="noreferrer noopener"
                className="btn-outline"
              >
                WhatsApp
              </a>
            )}
          </div>
        </div>
      )}
    </Shell>
  );
}
