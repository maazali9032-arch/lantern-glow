# Public invitation verification

The design retains its lantern artwork, typography, colors and section animations.

- The only invitation data request is the public RPC get_public_invitation_content with p_slug.
- The pathname is sanitized once. Invalid paths never select another invitation. A Nitro boundary guard also handles malformed percent encoding before routing; the generated Vercel handler returns the designed not-found screen with HTTP 404.
- Live, fallback, not-found, loading and retryable request-error screens are separate.
- Live rendering retains only shop.name for the thin viewport-fixed brand ribbon. No live shop contacts are retained. The ribbon hides when the approved name is absent.
- The hero names and ampersand occupy separate lines. The wedding date appears once, in the hero. Optional timing, profiles, contacts, events and media remain conditional.
- Music uses the returned music URL only and requires interaction. The supplied local MP3 is not substituted for missing public music data.
- No QR or guessed canonical invitation URL is generated.
- Sharing uses the supplied public/og-image.png, with an absolute asset URL in server-rendered HTML. Browser and Apple icons use the supplied public assets. Manifest branding is ZAR.
- .env.example retains exactly VITE_SUPABASE_URL= and VITE_SUPABASE_ANON_KEY=. Local environment files remain ignored.
- TanStack Start 1.168.60, Router 1.170.41 and Router Plugin 1.168.42 resolve one Router Core 1.171.34 and patched Start Server Core 1.169.39. Both lockfiles are updated.
- Nitro targets Vercel and generates its server routing automatically; no SPA rewrite is added over the server route.

Validation: production Vercel build, TypeScript, lint on changed TypeScript files, seven contract/rendering tests, zero npm audit vulnerabilities, local live demo and a 360px mobile layout check. Supplied icons and OG image respond successfully. Live production and third-party preview caches require redeployment; this work does not deploy or push changes.

Run checks with npm run build, npx tsc --noEmit, bun test and npm audit.
