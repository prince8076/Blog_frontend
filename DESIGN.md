# InkWave redesign v2 — magazine cover, all pages (branch only, NOT live)

## What was wrong (from the live screenshots, 2026-10-30)
- Logo: the cat logo includes "InkWave" plus a tiny "Welcome to Inkwave"
  tagline, so at header size it is an illegible blob. The browser tab
  showed the default Create React App React atom instead.
- Home hero: a lone headline over empty white space, then a second
  introduction, then a featured block — three introductions, no article
  in the first screen.
- Header: home showed Sign Up but no Log In; search was a loose flex
  item; search focus wrongly set position: sticky.
- Write page: the heading was white text on a white card (invisible),
  labels were pale grey, errors used alert(), no image preview, no
  publishing state.
- Admin: still dark (#121212, Poppins, blue/red buttons) while the rest
  of the site is light — a different site inside the site.
- About / 404: thin centred pages with no way forward.
- Search cards: fixed 200px images, flex wrap, no empty state for a query.

## Research used (GitHub trending, 2026-10-30)
- Nutlope/hallmark (GitHub Trending #1, Oct 28): anti-AI-slop rules —
  tokens only, no purple-blue gradient, no card-in-card, no emoji icons,
  focus-visible, reduced-motion fallback. The trimmed copy already in
  app-builder-skills was used for the Floor; upstream was checked for
  the theme list, not copied.
- nextlevelbuilder/ui-ux-pro-max-skill (140k stars): editorial/magazine
  style, serif display + sans body, consistent spacing scale.
- shadcn/ui patterns (124k stars): copy-own-component thinking — pill
  buttons, 8px-radius cards, focus rings — applied in the project's own
  styled-components, not by installing Tailwind/shadcn (that would be a
  rewrite, not a redesign).
- No code, assets, or branding were copied from any of these repos.
  The design is original; the skills supplied rules and patterns only.

## New logo
- SVG pen nib in accent amber (#b45309) + "InkWave" in Georgia bold,
  "Wave" in light amber (#fbbf24) on the dark masthead. No tagline, no
  image file, so it is crisp at any size. Favicon is the same nib on a
  dark rounded square (public/favicon.svg), with forced Netlify
  redirects so /favicon.ico, /logo192.png and /logo512.png no longer
  serve the old React icons. Manifest now says InkWave Blog, not
  "React App" / "Create React App Sample".
- The old cat PNG is still in the repo (src/aseets/images/) but is no
  longer referenced by any page. Delete it only if the user approves;
  it is not in the live bundle path anymore.

## Pages changed
- Header (all pages): new logo, nav Home / All articles / About /
  Write, pill search, Log In (text) + Sign Up (amber pill) on every
  page, Log Out when signed in, mobile wrap with full-width search.
- Footer (all pages): brand + tagline + real explore links + copyright.
- Home (/): magazine cover — featured article as hero (text left,
  image right), then Latest articles grid. No empty hero.
- All articles (/home): same cards, 8/5 image ratio instead of a
  fixed 200px crop.
- Article (/post/:id): unchanged structure, related list kept; see
  v1 DESIGN notes for its layout.
- About: 720px reading column, what the site does, Start reading /
  Write a blog actions.
- Write (/write-blog): visible heading, dark labels, focus rings,
  image preview, character count, inline error, publishing state.
- Search (/search): grid cards, optimized lazy images, clamped
  excerpts, honest empty state naming the query.
- Admin (/admin): light theme matching the site, amber edit, dark-red
  delete, same edit/delete behaviour — no data or route changes.
- Login/Signup modals: unchanged (already light in v1); auth endpoints
  unchanged everywhere.

## Not changed
- Backend, API, routes, auth, data, and the instant-paint cache/snapshot
  behaviour from v1. No new dependencies, no Tailwind, no invented
  categories, dates, authors, stats, or testimonials — the posts have
  none of those fields, so none are shown.

## Ship gate
- Do not merge or deploy until the user approves this branch. The
  previous favicon-only branch (fix/favicon-inkwave, IW monogram) is
  superseded by this logo work and must not be merged separately.

## v1 notes carried over (live since 2026-10-30, main 2e2daac6)
- Lag: Render /api/posts 44.1s cold, 1.0–1.2s warm, 27KB payload.
  Instant paint from localStorage cache or a 2026-10-29 snapshot of the
  real 10 posts, with background revalidation and a "saved articles"
  label; optimized lazy Pexels images (800/1200px); no hero photo;
  code-split Admin/Write/Search; no Google Fonts.
- Render cold start itself is not fixed by the frontend — only a paid
  Render plan or moving the backend removes it.
