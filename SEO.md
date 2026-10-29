# SuccessWebTech SEO + ads — what was done, what you must do next (branch only)

## Source skill
- https://github.com/AgricIDaniel/claude-seo (MIT) — a Claude Code
  plugin, not a Muse skill, so it cannot be installed into Muse as-is.
  What was used here is its audit method, from its public SKILL.md
  files: seo-technical (crawlability, indexability, rendering, speed),
  seo-sitemap (valid XML, ≤50k URLs, no priority/changefreq, sitemap
  in robots.txt), seo-schema (JSON-LD, absolute URLs, valid types),
  plus its content/performance guidance. No code was copied from it.
  Its Python runtime and Claude Code agents were NOT installed — they
  are Claude Code-specific and would not run this site's build.

## Audit findings (2026-10-30, before this branch)
- robots.txt existed but allowed everything and named no sitemap.
- No sitemap file at all. Worse: /sitemap.xml returned HTTP 200 with
  the SPA's index.html (the /* fallback), so any crawler asking for a
  sitemap got HTML, not XML.
- No canonical tag, no Open Graph / Twitter tags, no structured data.
- Every page shared one title/description because this is a
  client-rendered React app — see the limit below.
- Performance is already good for SEO: ~123 KB gzip JS, lazy images,
  no webfont downloads, no layout-shift images (width/height set).
- Content risk (not fixed here, it is editorial): several posts are
  short or have one-word titles ("Food", "Noodles", "Images"), and some
  excerpts are pasted from elsewhere with source boilerplate attached.
  AdSense and Google both prefer original, substantial writing — see
  "What will actually earn money" below.

## What this branch changes
- public/robots.txt: allows all, disallows /admin, /search and
  /write-blog (a form and an admin list are not search content), and
  names the sitemap.
- public/sitemap.xml: 13 real URLs — /, /home, /about, and the 10
  article URLs from the same post snapshot the app itself ships.
  No lastmod (post dates are not in the data, and inventing them
  would make the sitemap less trustworthy, per the skill).
- public/index.html: canonical, Open Graph + Twitter summary tags,
  and JSON-LD Blog + WebSite (with a real SearchAction to
  /search?query=…). No og:image: the brand logo is SVG, which most
  social crawlers do not accept as an OG image, and inventing an image
  would be worse than omitting it.
- src/components/AdSlot.js + placements on Home (after the cover) and
  on article pages (after the body), each labelled "Advertisement".
  The slot renders NOTHING until REACT_APP_ADSENSE_CLIENT_ID and
  REACT_APP_ADSENSE_SLOT are set — no fake ads, no blank boxes.
- src/pages/Privacy.js + /privacy route + footer link: AdSense
  requires a privacy policy. It states only what the site actually
  does (login token + article cache in localStorage, no analytics,
  AdSense cookies only once ads are configured).
- public/ads.txt: comments only, with the exact line format to add
  once you have a publisher ID. Until then it authorizes no seller.

## What YOU must do to actually earn money (not done by code)
1. Create a Google AdSense account (adsense.google.com) with the
   Google account you want to be paid under. Add successwebtech.in as
   your site and submit it for review. Approval is Google's decision
   and usually takes days to weeks; a site with 10 short posts may be
   asked to add more original content first.
2. When approved, Google gives you a publisher ID like
   ca-pub-XXXXXXXXXXXXXXXX. In Netlify (Site settings → Environment
   variables) set REACT_APP_ADSENSE_CLIENT_ID to that ID, and create
   one ad unit in AdSense and set REACT_APP_ADSENSE_SLOT to its slot
   number. Then redeploy (or push any commit — Netlify rebuilds).
   Alternatively, enable Auto Ads in AdSense and set only the client
   ID; Google then places ads itself and the manual slots stay empty.
3. In public/ads.txt, replace the placeholder comment with:
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   (using your real ID), and redeploy. AdSense will not serve on a
   site whose ads.txt does not authorize it.
4. In Google Search Console, add successwebtech.in as a property,
   verify it (Netlify DNS or HTML file — ask me when you get there),
   and submit https://successwebtech.in/sitemap.xml.
5. Do NOT click your own ads, ask friends to click them, or place ads
   where they can be clicked by accident — that is invalid traffic
   and gets accounts banned. That rule comes from Google, not from me.

## Honest limits
- Earnings scale with traffic. With a new blog and a handful of
  posts, early AdSense earnings are typically near zero — traffic
  first, ads second. No code change can promise income.
- Per-article SEO (a unique title/description/OG image for each
  /post/:id, so a shared article looks right on Google and social)
  is NOT possible in this client-rendered app without prerendering
  or moving to a server-rendered framework (e.g. Next.js). Google
  renders JavaScript and can index the article text, but social
  crawlers generally do not run JS, so shared article links will
  show the site-wide card, not the article card, until that migration.
- AI crawlers were deliberately NOT blocked in robots.txt: blocking
  GPTBot/ClaudeBot etc. would remove the site from AI search answers,
  which is the opposite of what a blog wanting traffic wants.
- The sitemap lists the 10 snapshot posts. When new posts are
  published, the sitemap is stale until it is regenerated — that is a
  known manual step for a static sitemap, and it is recorded here so
  it is not forgotten.

## Ship gate
- Do not merge or deploy until the user approves this branch.
