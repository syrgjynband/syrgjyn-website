const fs = require("node:fs");
const { escapeHtml, displayDate, safeImage } = require("../src/_cards.cjs");
module.exports = class {
  render(data) {
    const home = fs.readFileSync("index.html", "utf8");
    const match = home.match(/<style>([\s\S]*?)<\/style>/i);
    if (!match) throw new Error("Original index.html has no <style> block");
    const rawTitle = data.title || "The Chronicles";
    const title = escapeHtml(rawTitle);
    const description = escapeHtml(data.description || "From the Syrgjyn underground");
    const category = escapeHtml(data.category || "The Chronicles");
    const date = displayDate(data.date);
    const cover = safeImage(data.cover);
    const coverAlt = escapeHtml(data.coverAlt || `Photo accompanying ${rawTitle}`);
    const author = escapeHtml(data.author || "Syrgjyn");
    const articleUrl = `https://syrgjyn.com${data.page.url}`;
    const image = cover ? `https://syrgjyn.com${cover}` : "https://syrgjyn.com/images/syrgjyn-social-share.jpg";
    const published = data.date ? new Date(data.date).toISOString().slice(0,10) : null;
    const articleSchema = {
      "@context":"https://schema.org", "@type":"BlogPosting", "@id":articleUrl+'#article',
      headline:rawTitle, description:data.description || "From the Syrgjyn underground", mainEntityOfPage:articleUrl,
      author:{"@type":"Organization",name:data.author || "Syrgjyn",url:"https://syrgjyn.com/"},
      publisher:{"@type":"MusicGroup","@id":"https://syrgjyn.com/#band",name:"Syrgjyn"},
      image:[image], inLanguage:"en", about:["Albanian underground metal","Tirana metal scene","Syrgjyn","Alkimia"]
    };
    if (published) articleSchema.datePublished = published;
    const json = JSON.stringify(articleSchema).replace(/</g,"\\u003c");
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | Syrgjyn</title><meta name="description" content="${description}"><link rel="canonical" href="${escapeHtml(articleUrl)}"><meta property="og:site_name" content="Syrgjyn"><meta property="og:title" content="${title} | Syrgjyn"><meta property="og:description" content="${description}"><meta property="og:type" content="article"><meta property="og:url" content="${escapeHtml(articleUrl)}"><meta property="og:image" content="${escapeHtml(image)}"><meta property="og:image:alt" content="${coverAlt}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${title} | Syrgjyn"><meta name="twitter:description" content="${description}"><meta name="twitter:image" content="${escapeHtml(image)}"><script type="application/ld+json">${json}</script><style>${match[1]} .article-shell h2,.article-shell h3{margin-top:2em}.article-shell img{max-width:100%;height:auto}.article-shell a{text-decoration:underline}.article-shell blockquote{border-left:2px solid #888;padding-left:20px;color:#ccc}.article-author{font-size:14px!important;color:#bbb!important}.article-summary{margin:20px 0 35px;padding:15px 20px;border-left:2px solid #888;color:#ddd}</style></head><body><header><div class="wrap"><nav><a class="logo" href="/">WELCOME TO SYRGJYN AREA</a><div class="navlinks"><a href="/">Home</a><a href="/about/">About</a><a href="/discography/">Music</a><a href="/shows/">Shows</a><a href="/members/">Members</a><a href="/press/">Press</a><a href="/blog.html">Blog</a><a href="/#contact">Booking</a></div></nav></div></header><main><article class="article-shell"><a class="back" href="/blog.html">← Back to The Chronicles</a><div class="post-meta">${category}${date ? " · " + escapeHtml(date) : ""}</div><h1>${title}</h1><p class="article-author">By ${author}${date ? " · " + escapeHtml(date) : ""}</p>${cover ? `<img src="${escapeHtml(cover)}" alt="${coverAlt}" style="width:100%;max-height:470px;object-fit:cover;margin:10px 0 30px">` : ""}<div class="article-body">${data.content}</div></article></main><footer><div class="wrap">© 2026 SYRGJYN — All rights reserved.</div></footer></body></html>`;
  }
};
