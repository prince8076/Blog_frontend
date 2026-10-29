# InkWave redesign — editorial, fast first paint (branch only, NOT live)

## Brief (inferred, user did not answer Hallmark's ask-once questions)
- Material: the real 10 posts from the Render API, their Pexels images, the white InkWave logo.
- Audience: readers of Tech / Travel / Lifestyle essays.
- Use: read an article. One primary action in the hero: Start reading.
- Tone: editorial, modern-minimal. Light paper, serif display headlines, dark masthead.
- Gstack office-hours gate skipped with reason: this is a redesign of an existing app, not a new product idea.

## Why it was laggy (measured 2026-10-29)
- Render free backend: 44.1s cold for /api/posts, 1.0–1.2s warm. The payload is only 27 KB, so the wait is wake-up + DB connect, not data size.
- Hero image in the old build: 3.7 MB local JPEG, downloaded as a background image.
- Post images: most Pexels URLs had no size parameters, so full-size originals loaded on every card.
- Every list page blocked on the API before painting anything; moving between pages refetched.
- JS bundle 349 KB (110 KB gzip) was NOT the main problem.

## What this branch changes
- Instant paint: list pages render from a persistent localStorage cache, or from
  src/data/fallbackPosts.js (a 2026-10-29 snapshot of the real posts), then
  revalidate in the background and swap in live data. While the snapshot is
  showing, the UI says "Showing saved articles while the backend wakes up".
- Images: Pexels URLs are rewritten to compressed, sized versions
  (800px cards, 1200px featured/article), lazy-loaded below the fold,
  with width/height to cut layout shift. The 3.7 MB hero photo is gone;
  the hero is type-led and the featured article carries the one image.
- Code split: Admin, Write a blog, and Search load lazily, not on first paint.
- No Google Fonts download: system serif for display, system sans for body.
- UI: light paper (#faf9f6), dark masthead (keeps the white logo readable),
  serif headlines, featured article + latest grid, reading time derived
  from each excerpt's word count, centred 720px article column with
  pre-line paragraphs, related articles, sticky header, mobile grid.
- Routes, API, auth, and data are unchanged. No backend change, no payment.

## Hallmark Floor, applied manually
- Tokens only in theme.js and LandingPage.css :root; no literal colours past the token block in new CSS.
- No `transition: all`; only transform/box-shadow/background-color.
- focus-visible on interactive elements; prefers-reduced-motion fallback;
  overflow-x: clip; no purple-to-blue gradient; no card-in-card; no emoji icons.
- Hero headline (5 words) + one sentence + actions fit 1280x800 without scrolling.
- No invented metrics, quotes, logos, or dates. No post dates are shown because the data has none.
- NOT checked: Hallmark's sloplint script and theme files are not in the trimmed
  copy of the skill in app-builder-skills (only SKILL.md), so the sweep was manual, not a script pass.

## Skipped / not checked
- Backend cold start itself: only a paid Render plan or moving the backend
  removes the 44s wait. This branch hides it, it does not fix the server.
- Admin panel and BlogPage: Admin keeps its old dark card styles except where
  noted; BlogPage is not routed from App.js (dead code, left alone).
- No live deploy: this branch must be reviewed first. Merging to main is what
  makes Netlify publish it (main is auto-published).
- Login/signup submission with a real account was not re-tested here; the
  endpoints are unchanged from the previous live fix (Render /api/login, /api/signup).

## Ship gate
- Do not merge or deploy until the user approves this exact file list.
