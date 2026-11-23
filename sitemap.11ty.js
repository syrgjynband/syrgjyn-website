
module.exports = class Sitemap {
  data() {
    return {
      permalink: "/sitemap.xml",
      eleventyExcludeFromCollections: true
    };
  }

  render({ collections }) {
    const base = "https://syrgjyn.com";

    const urls = collections.all
      .filter(page => page.url && page.url !== "/sitemap.xml")
      .filter(page => page.outputPath && page.outputPath.endsWith(".html"))
      .map(page => base + page.url);

    const uniqueUrls = [...new Set(urls)].sort();

    const escapeXml = value => value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueUrls.map(url => `  <url>
    <loc>${escapeXml(url)}</loc>
  </url>`).join("\n")}
</urlset>`;
  }
};
