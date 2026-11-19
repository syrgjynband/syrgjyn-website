const fs = require("node:fs");
const { escapeHtml, displayDate, safeImage } = require("../src/_cards.cjs");
module.exports = class {
  render(data) {
    const home = fs.readFileSync("index.html", "utf8");
    const match = home.match(/<style>([\s\S]*?)<\/style>/i);
    if (!match) throw new Error("Original index.html has no <style> block");
    const title = escapeHtml(data.title || "The Chronicles");
    const description = escapeHtml(data.description || "From the Syrgjyn underground");
    const category = escapeHtml(data.category || "The Chronicles");
    const date = displayDate(data.date);
    const cover = safeImage(data.cover);
    const articleUrl = `https://syrgjyn.com${data.page.url}`;
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | SYRGJYN</title><meta name="description" content="${description}"><link rel="canonical" href="${escapeHtml(articleUrl)}"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="article"><meta property="og:url" content="${escapeHtml(articleUrl)}">${cover ? `<meta property="og:image" content="https://syrgjyn.com${escapeHtml(cover)}">` : ""}<style>${match[1]} .article-shell h2,.article-shell h3{margin-top:2em}.article-shell img{max-width:100%;height:auto}.article-shell a{text-decoration:underline}.article-shell blockquote{border-left:2px solid #888;padding-left:20px;color:#ccc}</style></head><body><header><div class="wrap"><nav><a class="logo" href="/">WELCOME TO SYRGJYN AREA</a><div class="navlinks"><a href="/#music">Music</a><a href="/#shows">Shows</a><a href="/blog.html">Blog</a><a href="/#about">About</a><a href="/#contact">Contact</a></div></nav></div></header><main class="article-shell"><a class="back" href="/blog.html">← Back to The Chronicles</a><div class="post-meta">${category}${date ? " · " + escapeHtml(date) : ""}</div><h1>${title}</h1>${cover ? `<img src="${escapeHtml(cover)}" alt="" style="width:100%;max-height:470px;object-fit:cover;margin:10px 0 30px">` : ""}<div class="article-body">${data.content}</div></main><footer><div class="wrap">© 2026 SYRGJYN — All rights reserved.</div></footer></body></html>`;
  }
};
