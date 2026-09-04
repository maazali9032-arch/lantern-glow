import { Lantern } from "./Lantern";
import { useLightSection } from "./useLightSection";
import { whatsappHref, type PublicContact } from "@/lib/publicInvitation";

export function Contacts({ contacts }: { contacts: PublicContact[] }) {
  const ref = useLightSection<HTMLElement>();
  const list = contacts.slice(0, 2).filter((c) => Boolean(c.phone));

  if (!list.length) return null;

  return (
    <section
      ref={ref}
      className="lit-scope relative z-10 flex min-h-[70svh] items-center justify-center overflow-hidden px-6 py-24"
      style={{ ["--lit" as string]: 0 }}
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2" data-depth="0.6">
        <Lantern size={66} chain={80} glowScale={6.5} swayDuration={11} />
      </div>

      <div className="relative mt-24 w-full max-w-md text-center">
        <p className="reveal text-[0.55rem] uppercase tracking-[0.44em] text-[color:var(--gold)]/70">
          For any assistance
        </p>
        <h2 className="reveal mt-4 display text-3xl text-[color:var(--ivory)]">Contact</h2>
        <div className="reveal mx-auto mt-6 rule" />

        <div className="mt-12 flex flex-col gap-10 sm:flex-row sm:justify-center">
          {list.map((contact) => {
            const wa = whatsappHref(contact);
            return (
              <div key={contact.phone} className="reveal flex flex-col items-center">
                {contact.name && (
                  <p className="display text-xl text-[color:var(--ivory)]">{contact.name}</p>
                )}
                <p className="mt-2 text-xs tracking-[0.22em] text-[color:var(--ivory)]/50">
                  {contact.phone}
                </p>
                <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                  <a href={`tel:${contact.phone}`} className="btn-ember">
                    Call
                  </a>
                  {wa && (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="btn-outline"
                    >
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
