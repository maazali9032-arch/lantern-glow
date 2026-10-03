import { describe, expect, test } from "bun:test";
import { normalizeResponse, sanitizeSlug, whatsappHref } from "../src/lib/publicInvitation";
describe("public invitation contract", () => {
  test("rejects malformed and decoded separators without double decoding", () => {
    for (const path of ["", "/", "/%ZZ", "/a%2Fb", "/a%5Cb"]) expect(sanitizeSlug(path)).toBeNull();
    expect(sanitizeSlug("/%252F")).toBe("%2F");
  });
  test("fallback discards wedding information", () => {
    expect(
      normalizeResponse({
        state: "fallback",
        shop: { name: "Shop" },
        content: { groom_name: "Private" },
      }),
    ).toEqual({ state: "fallback", shop: { name: "Shop" } });
  });
  test("normalizes envelope, optional fields and first two contacts", () => {
    const result = normalizeResponse({
      data: {
        state: "live",
        shop: { name: "Approved", phone: "123" },
        content: {
          events: [null, { description: "Welcome" }],
          gallery: [{}, "javascript:alert(1)"],
          contacts: [{ phone: "" }, { phone: "+91 123", name: "Contact" }, { phone: "456" }],
        },
      },
    });
    expect(result.state).toBe("live");
    if (result.state !== "live") throw new Error("wrong state");
    expect(result.brandName).toBe("Approved");
    expect(result.content.contacts).toHaveLength(1);
    expect(whatsappHref(result.content.contacts[0]!)).toBe("https://wa.me/91123");
    expect(result.content.gallery).toEqual([]);
    expect(result.content.events).toHaveLength(1);
    expect(result).not.toHaveProperty("shop");
  });
  test("invalid responses are request errors, explicit missing stays not found", () => {
    expect(() => normalizeResponse({ state: "oops" })).toThrow();
    expect(() => normalizeResponse(null)).toThrow();
    expect(normalizeResponse({ state: "not_found" })).toEqual({ state: "not_found" });
  });
});
import { renderToStaticMarkup } from "react-dom/server";
import { Message } from "../src/components/invitation/Message";
import { Hero } from "../src/components/invitation/Hero";
import { FallbackScreen } from "../src/components/invitation/States";
import { BrandRibbon } from "../src/components/invitation/BrandRibbon";
test("optional profiles and time-only invitations are not dropped", () => {
  const result = normalizeResponse({
    state: "live",
    content: { groom_qualification: "Engineer", end_time: "18:00" },
  });
  if (result.state !== "live") throw new Error("wrong state");
  const html = renderToStaticMarkup(<Message content={result.content} />);
  expect(html).toContain("Engineer");
  expect(html).toContain("18:00");
});
test("single-name hero has no ampersand and empty optional sections stay hidden", () => {
  const html = renderToStaticMarkup(<Hero groomName="Arian" />);
  expect(html).toContain("ARIAN");
  expect(html).not.toContain("&amp;");
  const result = normalizeResponse({ state: "live", content: {} });
  if (result.state !== "live") throw new Error("wrong state");
  expect(renderToStaticMarkup(<Message content={result.content} />)).toBe("");
  expect(renderToStaticMarkup(<BrandRibbon name={undefined} />)).toBe("");
});
test("fallback ignores unsafe WhatsApp links", () => {
  const html = renderToStaticMarkup(<FallbackScreen shop={{ whatsapp: "javascript:alert(1)" }} />);
  expect(html).not.toContain('href="javascript:');
  expect(html).not.toContain("https://wa.me/1");
});
