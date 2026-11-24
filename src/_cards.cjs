const fs = require("node:fs");
const path = require("node:path");

function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function displayDate(value) {
  if (!value) return "";
  const d = new Date(value);
  return Number.isNaN(d.valueOf()) ? "" : d.toLocaleDateString("en-GB", {year:"numeric",month:"short",day:"numeric",timeZone:"UTC"});
}
function safeImage(value) {
  if (!value || typeof value !== "string") return "";
  // CMS stores images under images/. Reject remote URLs and HTML injections.
  const clean = value.replace(/^\//, "");
  if (!/^images\/[a-z0-9_./ -]+$/i.test(clean) || clean.includes("..")) return "";
  return "/" + clean;
}
function card(post) {
  const data = post.data || {};
  const title = escapeHtml(data.title);
  const description = escapeHtml(data.description || "Read the latest entry from the underground.");
  const category = escapeHtml(data.category || "The Chronicles");
  const published = displayDate(data.date);
  const url = escapeHtml(post.url || "#");
  const cover = safeImage(data.cover);
  const art = cover
    ? `<div class="post-art" style="padding:0"><img src="${escapeHtml(cover)}" alt="${escapeHtml(data.coverAlt || `Photo accompanying ${data.title || "Syrgjyn article"}`)}" loading="lazy" style="width:100%;height:190px;object-fit:cover"></div>`
    : `<div aria-hidden="true" class="post-art">${title}</div>`;
  return `<article class="post-card">${art}<div class="post-content"><div class="post-meta">${category}${published ? " · " + escapeHtml(published) : ""}</div><h3>${title}</h3><p>${description}</p><a class="post-link" href="${url}">Read article →</a></div></article>`;
}
function renderPage(fileName, posts) {
  const original = fs.readFileSync(path.join(process.cwd(), fileName), "utf8");
  const marker = "<!-- CHRONICLES -->";
  if (!original.includes(marker)) throw new Error(`${fileName}: expected Chronicles marker missing`);
  const unique = [...new Map(posts.map(post => [post.url, post])).values()];
  return original.replace(marker, unique.map(card).join("\n"));
}
module.exports = { escapeHtml, displayDate, safeImage, card, renderPage };
