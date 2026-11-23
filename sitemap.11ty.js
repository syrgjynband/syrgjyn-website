
module.exports = class Sitemap {
  data() {
    return {
      permalink: "/sitemap.xml",
      eleventyExcludeFromCollections: true
    };
  }

  render({ collections }) {
    const base = "https://syrgjyn.com";

    const urls = [
      base + "/",
      base + "/blog.html",
      ...["about", "discography", "shows", "members", "press"].map(p => base + "/" + p + "/"),
      ...collections.chronicles
        .filter(post => post.url)
        .map(post => base + post.url)
    ];

    const escapeXml = value => value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");

    const uniqueUrls = [...new Set(urls)].sort();

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map(url => `  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`).join("\n")}
</urlset>`;
  }
};
