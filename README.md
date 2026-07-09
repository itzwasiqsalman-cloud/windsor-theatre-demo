# Royal Theatre Windsor — Demo Website

A premium single-page demo site built as a pitch for Theatre Royal Windsor
(https://theatreroyalwindsor.co.uk/). Not affiliated with the theatre.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS v4 (design tokens in `src/index.css`)
- framer-motion for scroll-driven and reveal animations
- lucide-react icons
- shadcn-style structure: reusable primitives in `src/components/ui`, `@/` → `src/`

## Highlights

- **Smooth-scroll hero** (`src/components/ui/smooth-scroll-hero.tsx`) — clip-path
  window that expands as you scroll, with an ambient muted YouTube showreel
  background (`youtubeId` prop) and Unsplash image fallback (used on mobile and
  under reduced-motion).
- **Shows marquee** (`src/components/ShowsMarquee.tsx`) — auto-scrolling row of
  rounded show cards (current + coming soon). Hover/tap flips a card in 3D to
  reveal the synopsis and a Book Tickets CTA; the marquee pauses while exploring.
- **Booking flow** (`src/components/booking/`) — choose a performance, pick
  seats on an SVG map modelled on the real house (Front Stalls, Royal Stalls,
  Circle, four restricted-view boxes), then a demo checkout and confirmation.
  Everything runs through swappable `TicketingApi` / `PaymentProvider`
  interfaces in `src/data/booking.ts`; production integration means writing a
  Spektrix/Ticketsolve/Stripe adapter with the same signatures.
- **Info architecture** — navigation dropdowns (Information, Get Involved,
  About) and Your Visit cards open modals filled with real content from the
  theatre's current website (`src/data/infoPages.tsx`), including booking fees,
  accessibility, tours, private hire, history and membership tiers.
- **Utility bar** — the header stays minimal over the hero, then a full
  navigation bar slides in as you scroll down.
- Hybrid theme: dark cinematic hero and What's On, warm cream body sections
  (About, Your Visit, Newsletter), gold/crimson accents, Playfair Display + Inter.
- Show data lives in `src/data/shows.ts`, sourced from the theatre's real
  2026 programme including the Jack and the Beanstalk pantomime.
- Respects `prefers-reduced-motion` throughout.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

`dist/` is a fully static build. Netlify builds and deploys automatically from
this repo using `netlify.toml` (build `npm run build`, publish `dist/`).
