// Fallback for static hosts/previews; Cloudflare serves the HTTP 301 in _redirects.
module.exports = class {
  data() {
    return { permalink: "members/index.html", eleventyExcludeFromCollections: true };
  }
  render() {
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Syrgjyn lineup has moved</title><link rel="canonical" href="https://syrgjyn.com/"><meta name="robots" content="noindex"><meta http-equiv="refresh" content="0;url=/#lineup"></head><body><p>The Syrgjyn lineup is now on the <a href="/#lineup">homepage</a>.</p></body></html>`;
  }
};
