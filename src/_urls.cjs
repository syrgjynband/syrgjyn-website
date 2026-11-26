// Cloudflare serves index.html as a directory and other HTML files extensionless.
function publicPath(value) {
  return value.replace(/^index\.html(?=[?#]|$)/i, "./")
    .replace(/\/index\.html(?=[?#]|$)/i, "/")
    .replace(/\.html(?=[?#]|$)/i, "");
}

function publicUrl(value) {
  if (/^https?:\/\/(?:www\.)?syrgjyn\.com(?:[/:?#]|$)/i.test(value)) {
    const url = new URL(value);
    return "https://syrgjyn.com" + publicPath(url.pathname) + url.search + url.hash;
  }
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(value)) return value;
  return publicPath(value);
}

function normalizeHtml(html) {
  html = html.replace(/\b(href|content)=(['"])(.*?)\2/gi, (match, attr, quote, value) => {
    if (attr.toLowerCase() === "content" && !/^https?:\/\/(?:www\.)?syrgjyn\.com(?:[/:?#]|$)/i.test(value)) return match;
    return `${attr}=${quote}${publicUrl(value)}${quote}`;
  });
  const normalize = value => {
    if (Array.isArray(value)) return value.map(normalize);
    if (value && typeof value === "object") return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, normalize(item)]));
    return typeof value === "string" && /^https?:\/\/(?:www\.)?syrgjyn\.com(?:[/:?#]|$)/i.test(value) ? publicUrl(value) : value;
  };
  return html.replace(/(<script\b[^>]*type=["']application\/ld\+json["'][^>]*>)([\s\S]*?)(<\/script>)/gi,
    (_, start, json, end) => start + JSON.stringify(normalize(JSON.parse(json))).replace(/</g, "\\u003c") + end);
}
module.exports = { publicPath, publicUrl, normalizeHtml };
