const fs = require("node:fs");
const { navigation } = require("./_site.cjs");

module.exports = class {
  data() {
    return { permalink: "404.html", eleventyExcludeFromCollections: true };
  }

  render() {
    const css = fs.readFileSync("index.html", "utf8").match(/<style>([\s\S]*?)<\/style>/i)[1];
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Page not found | Syrgjyn</title><meta name="description" content="This Syrgjyn page could not be found. Return to the official website for music, shows and band news."><meta name="robots" content="noindex"><style>${css}</style></head><body><header><div class="wrap"><nav><a class="logo" href="/">WELCOME TO SYRGJYN AREA</a>${navigation()}</nav></div></header><main class="article-shell"><h1>Page not found</h1><p>This page has moved or no longer exists.</p><a class="cta" href="/">Return to Syrgjyn</a></main><footer><div class="wrap">© 2026 SYRGJYN — All rights reserved.</div></footer></body></html>`;
  }
};
