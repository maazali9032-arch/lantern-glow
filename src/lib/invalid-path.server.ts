import { definePlugin } from "nitro";
import { sanitizeSlug } from "./publicInvitation";

// Nitro decodes paths before the Start entry; guard invalid encoding at its boundary.
export default definePlugin((app) => {
  const fetch = app.fetch.bind(app);
  app.fetch = async (request) => {
    const pathname = new URL(request.url).pathname;
    if (pathname !== "/" && !sanitizeSlug(pathname)) {
      const response = await fetch(new Request(new URL("/", request.url), request));
      return new Response(response.body, { status: 404, headers: response.headers });
    }
    return fetch(request);
  };
});
