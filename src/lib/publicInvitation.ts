/**
 * ZAR public invitation integration.
 *
 * The browser may ONLY talk to the central public RPC
 * `get_public_invitation_content` with `{ p_slug }`.
 * No table access, no schema/design names, no service-role key.
 */

export type InvitationState = "live" | "fallback" | "not_found";

export interface PublicContact {
  name?: string;
  phone: string;
  whatsappUrl?: string;
}

export interface PublicEvent {
  id: string;
  name?: string;
  date?: string;
  time?: string;
  venue?: string;
  city?: string;
  mapsUrl?: string;
  note?: string;
}

export interface PublicGalleryItem {
  url: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface PublicPerson {
  name?: string;
  photoUrl?: string;
  qualification?: string;
  occupation?: string;
  parents?: string;
}

export interface LiveContent {
  groom: PublicPerson;
  bride: PublicPerson;
  relatives?: string;
  invocation?: string;
  weddingDate?: string;
  startTime?: string;
  endTime?: string;
  events: PublicEvent[];
  venue: {
    name?: string;
    address?: string;
    city?: string;
    mapsUrl?: string;
    imageUrl?: string;
  };
  gallery: PublicGalleryItem[];
  musicEnabled: boolean;
  musicUrl?: string;
  contacts: PublicContact[];
  qrText?: string;
  countdownTarget?: string;
}

export interface ShopFallback {
  name?: string;
  phone?: string;
  whatsapp?: string;
  address?: string;
  city?: string;
  businessContact?: string;
}

export type PublicInvitationResult =
  | { state: "live"; publicUrl?: string; content: LiveContent }
  | { state: "fallback"; shop: ShopFallback }
  | { state: "not_found" };

/* ------------------------------------------------------------------ */
/* Slug handling                                                       */
/* ------------------------------------------------------------------ */

/** Returns a safe single-segment slug, or null when the path is unusable. */
export function sanitizeSlug(rawPath: string): string | null {
  let raw = rawPath;
  const segments = raw.split("/").filter(Boolean);
  raw = segments.length ? (segments[segments.length - 1] as string) : "";
  if (!raw) return null;
  let decoded: string;
  try {
    decoded = decodeURIComponent(raw);
  } catch {
    return null;
  }
  decoded = decoded.trim();
  if (!decoded) return null;
  if (decoded.includes("/") || decoded.includes("\\")) return null;
  return decoded;
}

/* ------------------------------------------------------------------ */
/* Untrusted-value helpers                                             */
/* ------------------------------------------------------------------ */

const isObj = (v: unknown): v is Record<string, unknown> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const str = (v: unknown): string | undefined => {
  if (typeof v !== "string") return undefined;
  const t = v.trim();
  return t ? t : undefined;
};

const num = (v: unknown): number | undefined =>
  typeof v === "number" && Number.isFinite(v) ? v : undefined;

const safeUrl = (v: unknown): string | undefined => {
  const s = str(v);
  if (!s) return undefined;
  return /^(https?:|\/\/|\/)/i.test(s) ? s : undefined;
};

const pick = (o: Record<string, unknown>, keys: string[]) => {
  for (const k of keys) {
    const v = str(o[k]);
    if (v) return v;
  }
  return undefined;
};

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

export function whatsappHref(contact: PublicContact): string | undefined {
  if (contact.whatsappUrl) return contact.whatsappUrl;
  const d = digits(contact.phone);
  return d ? `https://wa.me/${d}` : undefined;
}

/* ------------------------------------------------------------------ */
/* Normalization                                                       */
/* ------------------------------------------------------------------ */

function normalizeEvents(raw: unknown): PublicEvent[] {
  if (!Array.isArray(raw)) return [];
  const out: PublicEvent[] = [];
  raw.forEach((item, i) => {
    if (!isObj(item)) return;
    const name = pick(item, ["name", "title", "event_name"]);
    const date = pick(item, ["date", "event_date"]);
    const time = pick(item, ["time", "start_time"]);
    const venue = pick(item, ["venue", "venue_name"]);
    const note = pick(item, ["note", "description"]);
    if (!name && !date && !venue) return;
    const ev: PublicEvent = { id: str(item['id']) ?? `event-${i}` };
    if (name) ev.name = name;
    if (date) ev.date = date;
    if (time) ev.time = time;
    if (venue) ev.venue = venue;
    const city = str(item['city']);
    if (city) ev.city = city;
    const mapsUrl = safeUrl(item['maps_url'] ?? item['mapsUrl']);
    if (mapsUrl) ev.mapsUrl = mapsUrl;
    if (note) ev.note = note;
    out.push(ev);
  });
  return out;
}

function normalizeGallery(raw: unknown, fallbackAlt: string): PublicGalleryItem[] {
  if (!Array.isArray(raw)) return [];
  const out: PublicGalleryItem[] = [];
  for (const item of raw) {
    if (typeof item === "string") {
      const url = safeUrl(item);
      if (url) out.push({ url, alt: fallbackAlt });
      continue;
    }
    if (!isObj(item)) continue;
    const url = safeUrl(item['url'] ?? item['src'] ?? item['image_url']);
    if (!url) continue;
    const g: PublicGalleryItem = { url, alt: str(item['alt']) ?? fallbackAlt };
    const caption = str(item['caption']);
    if (caption) g.caption = caption;
    const w = num(item['width']);
    const h = num(item['height']);
    if (w) g.width = w;
    if (h) g.height = h;
    out.push(g);
  }
  return out;
}

function normalizeContacts(raw: unknown): PublicContact[] {
  if (!Array.isArray(raw)) return [];
  const out: PublicContact[] = [];
  for (const item of raw.slice(0, 2)) {
    if (!isObj(item)) continue;
    const phone = str(item['phone']);
    if (!phone) continue;
    const c: PublicContact = { phone };
    const name = str(item['name']);
    if (name) c.name = name;
    const wa = safeUrl(item['whatsapp_url']);
    if (wa) c.whatsappUrl = wa;
    out.push(c);
  }
  return out;
}

function buildCountdownTarget(date?: string, time?: string): string | undefined {
  if (!date) return undefined;
  const candidates = [time ? `${date} ${time}` : null, date].filter(Boolean) as string[];
  for (const c of candidates) {
    const t = new Date(c).getTime();
    if (Number.isFinite(t) && t > Date.now()) return new Date(t).toISOString();
  }
  return undefined;
}

function normalizePerson(
  c: Record<string, unknown>,
  prefix: "groom" | "bride",
): PublicPerson {
  const p: PublicPerson = {};
  const name = str(c[`${prefix}_name`]);
  if (name) p.name = name;
  const photo = safeUrl(c[`${prefix}_photo_url`]);
  if (photo) p.photoUrl = photo;
  const q = str(c[`${prefix}_qualification`]);
  if (q) p.qualification = q;
  const o = str(c[`${prefix}_occupation`]);
  if (o) p.occupation = o;
  const par = str(c[`${prefix}_parents`]);
  if (par) p.parents = par;
  return p;
}

function normalizeContent(raw: unknown): LiveContent {
  const c = isObj(raw) ? raw : {};
  const groom = normalizePerson(c, "groom");
  const bride = normalizePerson(c, "bride");
  const coupleAlt = [groom.name, bride.name].filter(Boolean).join(" & ") || "Wedding photograph";

  const content: LiveContent = {
    groom,
    bride,
    events: normalizeEvents(c['events']),
    venue: {},
    gallery: normalizeGallery(c['gallery'], coupleAlt),
    musicEnabled: c['music_enabled'] === true,
    contacts: normalizeContacts(c['contacts']),
  };

  const relatives = str(c['relatives']);
  if (relatives) content.relatives = relatives;
  const invocation = str(c['invocation']);
  if (invocation) content.invocation = invocation;
  const weddingDate = str(c['wedding_date']);
  if (weddingDate) content.weddingDate = weddingDate;
  const startTime = str(c['start_time']);
  if (startTime) content.startTime = startTime;
  const endTime = str(c['end_time']);
  if (endTime) content.endTime = endTime;

  const venueName = str(c['venue_name']);
  if (venueName) content.venue.name = venueName;
  const venueAddress = str(c['venue_address']);
  if (venueAddress) content.venue.address = venueAddress;
  const city = str(c['city']);
  if (city) content.venue.city = city;
  const mapsUrl = safeUrl(c['maps_url']);
  if (mapsUrl) content.venue.mapsUrl = mapsUrl;
  const venueImage = safeUrl(c['venue_image_url']);
  if (venueImage) content.venue.imageUrl = venueImage;

  const musicUrl = safeUrl(c['music_url']);
  if (musicUrl) content.musicUrl = musicUrl;
  const qrText = str(c['qr_text']);
  if (qrText) content.qrText = qrText;

  const target = buildCountdownTarget(content.weddingDate, content.startTime);
  if (target) content.countdownTarget = target;

  return content;
}

function normalizeShop(raw: unknown): ShopFallback {
  const s = isObj(raw) ? raw : {};
  const shop: ShopFallback = {};
  const name = str(s['name']);
  if (name) shop.name = name;
  const phone = str(s['phone']);
  if (phone) shop.phone = phone;
  const whatsapp = str(s['whatsapp']);
  if (whatsapp) shop.whatsapp = whatsapp;
  const address = str(s['address']);
  if (address) shop.address = address;
  const city = str(s['city']);
  if (city) shop.city = city;
  const businessContact = str(s['business_contact']);
  if (businessContact) shop.businessContact = businessContact;
  return shop;
}

export function normalizeResponse(payload: unknown): PublicInvitationResult {
  let root: unknown = payload;
  if (Array.isArray(root)) root = root[0];
  if (isObj(root) && !("state" in root) && isObj(root['data'])) root = root['data'];
  if (!isObj(root)) return { state: "not_found" };

  const state = str(root['state']);
  if (state === "live") {
    const invitation = isObj(root['invitation']) ? root['invitation'] : {};
    const publicUrl = safeUrl(invitation['public_url']);
    const result: PublicInvitationResult = {
      state: "live",
      content: normalizeContent(root['content']),
    };
    if (publicUrl) (result as { publicUrl?: string }).publicUrl = publicUrl;
    return result;
  }
  if (state === "fallback") return { state: "fallback", shop: normalizeShop(root['shop']) };
  return { state: "not_found" };
}

/* ------------------------------------------------------------------ */
/* RPC call                                                            */
/* ------------------------------------------------------------------ */

export class InvitationRequestError extends Error {}

export async function fetchPublicInvitation(slug: string): Promise<PublicInvitationResult> {
  const url = import.meta.env['VITE_SUPABASE_URL'] as string | undefined;
  const anonKey = import.meta.env['VITE_SUPABASE_ANON_KEY'] as string | undefined;
  if (!url || !anonKey) {
    throw new InvitationRequestError("Invitation service is not configured.");
  }

  const endpoint = `${url.replace(/\/+$/, "")}/rest/v1/rpc/get_public_invitation_content`;
  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p_slug: slug }),
    });
  } catch {
    throw new InvitationRequestError("Network error while loading the invitation.");
  }

  if (!res.ok) {
    throw new InvitationRequestError(`Invitation request failed (${res.status}).`);
  }

  let json: unknown;
  try {
    json = await res.json();
  } catch {
    throw new InvitationRequestError("Invitation response could not be read.");
  }

  return normalizeResponse(json);
}
