# Syrgjyn: Pages CMS + Eleventy + Cloudflare Pages

This package contains **new or updated configuration files only**. It is intended to be merged into the EXISTING `syrgjynband/syrgjyn-website` GitHub repository, not uploaded to Cloudflare as a finished website.

## Preserve existing files

Do **not** delete or overwrite `index.html`, `blog.html`, `posts/we-kept-the-fire-burning.html`, or `images/hero-bg.jpg`. Those files are the design and content source. The build adds dynamic CMS articles without destroying the existing story.

## Installation

1. Download and unzip this package.
2. In GitHub, open `syrgjynband/syrgjyn-website` on the `main` branch.
3. Upload these files while preserving directories. **Replace `.pages.yml`** with the provided version. The ZIP is not uploaded directly to GitHub as a single file.
4. Do not delete existing files. An extra `hero-bg.jpg` in the root is harmless.
5. In Pages CMS, refresh the repository. Your existing six editor fields remain.

## Test locally (optional)

In a clone of the complete repository, run:

    npm install
    npm run build

The output folder will be `_site`. Verify `_site/index.html`, `_site/blog.html`, `_site/posts/we-kept-the-fire-burning.html` and `_site/images/hero-bg.jpg` exist.

## Connect to Cloudflare safely

Your live Cloudflare Pages project `syrgjyn` is a Direct Upload project, which cannot be converted to Git integration. **Do not delete it**.

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Choose the GitHub repository `syrgjynband/syrgjyn-website`.
3. Choose production branch `main`.
4. Build command: `npm run build`
5. Build output directory: `_site`
6. Root directory: `/` (repository root).
7. Deploy the **new** project under a temporary pages.dev subdomain and test the homepage, blog, existing article and background image.
8. In Pages CMS, create a new test entry. The GitHub commit should trigger another Cloudflare deployment, generating `posts/<slug>.html` and adding a card on both homepage and blog page.
9. Only after confirming that everything works, transfer `syrgjyn.com` and `www.syrgjyn.com` from the old Cloudflare Pages project to the new one via Cloudflare custom domains. This is a later step; avoid removing existing domains until preview passes.

## How this works

- Pages CMS writes Markdown files to `content/posts/`.
- Eleventy processes Markdown into HTML article pages.
- The two JS page templates load the unchanged root `index.html` and `blog.html`, and insert cards for new CMS posts into the existing `.post-grid`.
- `posts/` is copied unchanged, preserving the legacy article URL.
- `images/` is copied unchanged.
- The output folder `_site/` contains the deployable website.

## Notes

- CMS post filenames are slug-based Markdown files. Avoid naming a new CMS article `we-kept-the-fire-burning`, because that URL is already used by the original HTML article.
- Never place credentials, API keys, or private material in this public GitHub repository.
- If you update the site's HTML design later, edit the root HTML files in GitHub. Eleventy picks up those design changes.
