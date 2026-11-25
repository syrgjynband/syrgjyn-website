# Syrgjyn website

Eleventy builds the official site from the existing HTML design, Markdown articles and shared band/show data. The output directory is `_site`.

## Build and check

Use Node.js 20 or newer:

    npm ci
    npm run check

`npm run check` cleans and rebuilds `_site`, then checks internal links and anchors, image/PDF assets, metadata, JSON-LD, sitemap coverage, redirects, CMS configuration, article-card uniqueness, band lineup, show-date boundaries and the hero image size. `npm run dev` starts the local preview.

## Edit content in Pages CMS

The `.pages.yml` configuration exposes:

- **The Chronicles:** Markdown articles in `content/posts/`. The existing Alkimia story keeps its original URL. Each published article appears once on the homepage and blog.
- **Band Information:** short press biography and current lineup in `_data/band.json`. Lineup changes feed the homepage, About, Press and homepage structured data. The user confirmed Arvit Banishta as current bassist on 24 November 2026.
- **Shows & Live History:** confirmed shows and a history summary in `_data/shows.json`. Dates use `YYYY-MM-DD`. At build time, dates on or after today in Europe/Tirane appear as upcoming, and earlier dates appear in the archive. Rebuild after a concert date passes to refresh this classification. Do not add unverified shows.
- **Photo Gallery:** captions, accessible image descriptions, optional photographer credits and homepage selections in `_data/gallery.json`. Source filenames are retained to make later credits easy to match. Image paths and dimensions are read-only; each photograph has optimized 480px and 960px variants and a larger viewing version in `images/gallery/`. Add new optimized images and their metadata together. The original Drive photos are not modified or copied into the website repository.

If Cloudflare Git integration is enabled, CMS commits should trigger a rebuild. The CMS editor itself still requires repository authorization; this cleanup does not grant it access.

## Site structure

- `/`: music, short band introduction, current lineup, upcoming shows and latest articles.
- `/about/`: band history and authoritative lineup at `#lineup`.
- `/discography/`: releases and official listening links.
- `/shows/`: upcoming dates and archive from shared show data.
- `/blog.html`: CMS-generated Chronicles cards.
- `/gallery/`: live photo archive with a responsive grid and an accessible full-size viewer. Gallery links work as standalone images without JavaScript. The homepage previews up to six featured photographs. Captions, credits and order can be edited in Pages CMS.
- `/press/`: short biography, current lineup, original photo downloads, existing EPK and press contact.
- `/#merch` and `/#contact`: merchandise and contact.

`/members`, `/members/` and `/members/index.html` redirect permanently to `/about/#lineup` through Cloudflare's `_redirects` file. A small HTML fallback also preserves the link on static previews. The sitemap is generated from published page collections; the redirect page and internal documentation are excluded.

The top-level `404.html` prevents Cloudflare Pages from treating missing URLs as homepage routes. Missing pages return HTTP 404 and are excluded from indexing and the sitemap.

## Images and legacy URLs

The homepage uses `images/syrgjyn-hero.webp` (1920 x 1280, approximately 125 KB). The original `images/syrgjyn-band-tirana-hero.jpg` is retained for press downloads and the existing EPK. Byte-identical copies at `hero-bg.jpg` and `images/hero-bg.jpg` were removed; both old URLs redirect to the original press photo on Cloudflare. Keep the original photo and `Syrgjyn_Official_EPK.pdf`.

The unused `_includes/index.html` homepage copy was removed. Root `index.html` and `blog.html` remain design templates, not deployable standalone files. Their marked regions are populated by Eleventy. Shared navigation is in `src/_site.cjs`.

## Deploy without changing hosting

Deploy only the contents of `_site`, including `_redirects`. Do not upload the source repository as a static site.

- Existing Cloudflare Pages project with Git integration: production branch `main`, build command `npm run build`, output directory `_site`.
- Existing Direct Upload project: upload the built `_site` directory, or a ZIP whose root contains its contents, to that existing project. Do not delete the project or move custom domains as part of this cleanup.

The repository is connected to Cloudflare Pages project `syrgjyn-cms`; its branch-preview deployment was verified on 24 November 2026. Older setup notes described a separate Direct Upload project named `syrgjyn`. A successful preview alone is not proof that the live domain deployed. After publication, verify the real domain, navigation, original article, Members redirect, EPK and photo downloads.

## Newsletter

The homepage and shared navigation link to `/newsletter/`. The form uses Brevo's supported HTML embed protocol, including its public form endpoint, field/error containers, honeypot, locale, JavaScript, and Cloudflare Turnstile widget. The public endpoint and site key are in `_data/newsletter.json`; these are not credentials. The Turnstile validation secret is stored only in Brevo. Turnstile allows `syrgjyn.com` and its subdomains. Use the website URL when sharing the signup form; Brevo's hosted Quick Share URL is outside this widget's hostname allowlist.

The newsletter page loads Brevo and Turnstile scripts; other pages do not load them. `/newsletter/privacy/` describes the data collected, service providers, subscription confirmation, reporting, and how to request changes or deletion.

Brevo configuration as of 25 November 2026:

- Domain: `syrgjyn.com`, authenticated and branded (`mail`).
- Sender: `Syrgjyn <info@syrgjyn.com>`, verified.
- Fan list: **Syrgjyn Newsletter — Confirmed Fans**, initially empty. The pre-existing **Your first list** is separate and is not selected by the signup form.
- Form: **Syrgjyn Newsletter Signup**, ID `6b06a91a21a255498553f6e7`.
- Double confirmation is required before a contact joins the fan list. The form hides after successful submission and asks the visitor to check their inbox.
- Confirmation email: template #5, **Default Template Double opt-in confirmation**, uses `{{ doubleoptin }}`. Keep this token intact.
- Welcome email after confirmation: template #3, **Default template - Final confirmation**.
- Newsletter master: template #6, **Syrgjyn Newsletter — Master (draft)**, intentionally inactive. Replace every bracketed placeholder and add the band's approved public postal address before using it for a campaign. Keep the `{{ unsubscribe }}` link; `{{ mirror }}` provides the browser version.

For each newsletter, create a campaign from the master, set its sender to `info@syrgjyn.com`, and select only the confirmed fan list. Check the subject, preview text, actual links, current news and approved footer address; send a test to a band-owned inbox before sending the campaign. No newsletter campaign is scheduled by this website.

Share `https://syrgjyn.com/newsletter/` on social profiles and concert materials. Manually add only people who have explicitly requested updates; otherwise invite them to subscribe. Export the fan list from Brevo periodically for a private backup, preserving subscription and unsubscribe status. Do not re-import suppressed contacts as subscribed.

The signup, email confirmation, welcome message, unsubscribe process and mobile layout should be checked after publication. Brevo account sending limits still apply. Do not buy an upgrade automatically; size the plan for both stored contacts and monthly sends when needed.

## Photograph permissions

Original photograph links are provided with a request to confirm credits and publication permissions. No new photographs or rights claims were introduced. The EPK PDF is unchanged.

Do not store credentials, API keys or subscriber information in this public repository.
