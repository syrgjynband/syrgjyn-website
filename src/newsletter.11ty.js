const fs = require("node:fs");
const { escapeHtml: e } = require("./_cards.cjs");
const { navigation } = require("./_site.cjs");

module.exports = class NewsletterPages {
  data() {
    return {
      pagination: { data: "newsletterPages", size: 1, alias: "newsletterPage", addAllPagesToCollections: true },
      newsletterPages: [
        { slug: "newsletter/privacy", title: "Newsletter Privacy | Syrgjyn", description: "How Syrgjyn uses newsletter signup details, confirms subscriptions and handles unsubscribe and privacy requests." }
      ],
      permalink: data => `${data.newsletterPage.slug}/index.html`
    };
  }

  render({ newsletterPage: page, newsletter }) {
    const url = `https://syrgjyn.com/${page.slug}/`;
    const css = fs.readFileSync("index.html", "utf8").match(/<style>([\s\S]*?)<\/style>/i)[1];
    const content = `<main class="article-shell newsletter-privacy">
      <a class="back" href="/contact/">Contact the band</a>
      <h1>Newsletter privacy</h1>
      <p class="post-meta">Updated 26 November 2026</p>
      <p>The Syrgjyn mailing list is managed by the band in Tirana, Albania. Contact <a href="mailto:info@syrgjyn.com">info@syrgjyn.com</a> about your subscription or your information.</p>
      <h2>What you sign up for</h2><p>Occasional emails about new music, concerts, band news and merchandise. Submitting the form requests a confirmation email. You join the mailing list only after clicking the confirmation link.</p>
      <h2>What is collected</h2><p>The signup form asks for your email address. Brevo processes signups and email delivery, including subscription status, confirmation records and technical information such as IP addresses and timestamps. Email reporting can include delivery, opens and link clicks.</p>
      <h2>The services we use</h2><p>We use Brevo to store the mailing list and send emails. Cloudflare Turnstile checks form submissions to help prevent automated abuse. Their processing can involve services outside your country. See <a href="https://www.brevo.com/legal/privacypolicy/">Brevo's privacy policy</a> and <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare's privacy policy</a>.</p>
      <h2>Leaving the list</h2><p>Use the unsubscribe link in a newsletter, <a href="${e(newsletter.unsubscribeUrl)}">unsubscribe here</a>, or email the band to stop receiving updates. We keep subscriber details to operate the mailing list and may retain an unsubscribe record to prevent unwanted future mail.</p>
      <h2>Your information</h2><p>For access, corrections or deletion requests, contact <a href="mailto:info@syrgjyn.com?subject=Newsletter%20privacy%20request">info@syrgjyn.com</a>. Subscriber details are held in Brevo, rather than in the website's public source code.</p>
    </main>`;
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(page.title)}</title><meta name="description" content="${e(page.description)}"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="Syrgjyn"><meta property="og:title" content="${e(page.title)}"><meta property="og:description" content="${e(page.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="https://syrgjyn.com/images/syrgjyn-social-share.jpg"><meta name="twitter:card" content="summary_large_image"><style>${css}</style><link rel="stylesheet" href="/assets/newsletter.css"></head><body><header><div class="wrap"><nav><a class="logo" href="/">WELCOME TO SYRGJYN AREA</a>${navigation()}</nav></div></header>${content}<footer><div class="wrap">© 2026 SYRGJYN · <a href="/newsletter/privacy/">Newsletter privacy</a> · <a href="mailto:info@syrgjyn.com">Contact the band</a></div></footer></body></html>`;
  }
};
