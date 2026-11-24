const fs = require("node:fs");
const { escapeHtml: e } = require("./_cards.cjs");
const { navigation } = require("./_site.cjs");
const { galleryGrid, galleryViewer } = require("./_gallery.cjs");

module.exports = class {
  data() {
    return { permalink: "gallery/index.html" };
  }

  render({ gallery }) {
    const css = fs.readFileSync("index.html", "utf8").match(/<style>([\s\S]*?)<\/style>/i)[1];
    const title = "Syrgjyn Gallery | Live Photos & Stage Archive";
    const description = "Explore live photographs of Syrgjyn: stage lights, guitars, drums and the energy of the Albanian underground metal scene.";
    const cover = `https://syrgjyn.com${gallery.photos[0].medium}`;
    const json = JSON.stringify({
      "@context": "https://schema.org", "@type": "ImageGallery",
      name: "Syrgjyn live photo gallery", url: "https://syrgjyn.com/gallery/",
      description, about: { "@id": "https://syrgjyn.com/#band" },
      associatedMedia: gallery.photos.map(photo => ({
        "@type": "ImageObject", name: photo.caption, description: photo.alt,
        contentUrl: `https://syrgjyn.com${photo.large}`,
        thumbnailUrl: `https://syrgjyn.com${photo.small}`,
        width: photo.width, height: photo.height,
        ...(photo.credit ? { creditText: photo.credit } : {})
      }))
    }).replace(/</g, "\\u003c");
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="${description}"><link rel="canonical" href="https://syrgjyn.com/gallery/"><meta property="og:type" content="website"><meta property="og:site_name" content="Syrgjyn"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="https://syrgjyn.com/gallery/"><meta property="og:image" content="${e(cover)}"><meta name="twitter:card" content="summary_large_image"><style>${css}</style><link rel="stylesheet" href="/assets/gallery.css"><script src="/assets/gallery.js" defer></script><script type="application/ld+json">${json}</script></head><body><header><div class="wrap"><nav><a class="logo" href="/">WELCOME TO SYRGJYN AREA</a>${navigation()}</nav></div></header><main><div class="wrap gallery-intro"><p class="post-meta">SYRGJYN / LIVE ARCHIVE</p><h1>Gallery</h1><p class="lead">${e(gallery.intro)}</p><p class="gallery-hint">${gallery.photos.length} photographs. Open a photo to see it full size.</p></div><div class="wrap gallery-archive">${galleryGrid(gallery.photos)}</div></main>${galleryViewer()}<footer><div class="wrap">© 2026 SYRGJYN — All rights reserved.</div></footer></body></html>`;
  }
};
