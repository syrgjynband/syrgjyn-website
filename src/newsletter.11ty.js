const fs = require("node:fs");
const { escapeHtml: e } = require("./_cards.cjs");
const { navigation } = require("./_site.cjs");

module.exports = class NewsletterPages {
  data() {
    return {
      pagination: { data: "newsletterPages", size: 1, alias: "newsletterPage", addAllPagesToCollections: true },
      newsletterPages: [
        { slug: "newsletter", title: "Join the Syrgjyn Mailing List", description: "Get occasional emails from Syrgjyn about new music, concert dates and band news. Confirm your email to join and unsubscribe whenever you like." },
        { slug: "newsletter/privacy", title: "Newsletter Privacy | Syrgjyn", description: "How Syrgjyn uses newsletter signup details, confirms subscriptions and handles unsubscribe and privacy requests." }
      ],
      permalink: data => `${data.newsletterPage.slug}/index.html`
    };
  }

  render({ newsletterPage: page, newsletter }) {
    const privacy = page.slug.endsWith("/privacy");
    const url = `https://syrgjyn.com/${page.slug}/`;
    const css = fs.readFileSync("index.html", "utf8").match(/<style>([\s\S]*?)<\/style>/i)[1];
    if (new URL(newsletter.formAction).origin !== "https://b63dc3cd.sibforms.com" || !newsletter.formAction.includes("/serve/")) {
      throw new Error("Newsletter must use the band's Brevo form endpoint.");
    }
    const content = privacy ? `<main class="article-shell newsletter-privacy">
      <a class="back" href="/newsletter/">Back to the mailing list</a>
      <h1>Newsletter privacy</h1>
      <p class="post-meta">Updated 25 November 2026</p>
      <p>The Syrgjyn mailing list is managed by the band in Tirana, Albania. Contact <a href="mailto:info@syrgjyn.com">info@syrgjyn.com</a> about your subscription or your information.</p>
      <h2>What you sign up for</h2><p>Occasional emails about new music, concerts, band news and merchandise. Submitting the form requests a confirmation email. You join the mailing list only after clicking the confirmation link.</p>
      <h2>What is collected</h2><p>The signup form asks for your email address. Brevo processes signups and email delivery, including subscription status, confirmation records and technical information such as IP addresses and timestamps. Email reporting can include delivery, opens and link clicks.</p>
      <h2>The services we use</h2><p>We use Brevo to store the mailing list and send emails. Cloudflare Turnstile checks form submissions to help prevent automated abuse. Their processing can involve services outside your country. See <a href="https://www.brevo.com/legal/privacypolicy/">Brevo's privacy policy</a> and <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare's privacy policy</a>.</p>
      <h2>Leaving the list</h2><p>Use the unsubscribe link in a newsletter to stop receiving updates, or email the band. We keep subscriber details to operate the mailing list and may retain an unsubscribe record to prevent unwanted future mail.</p>
      <h2>Your information</h2><p>For access, corrections or deletion requests, contact <a href="mailto:info@syrgjyn.com?subject=Newsletter%20privacy%20request">info@syrgjyn.com</a>. Subscriber details are held in Brevo, rather than in the website's public source code.</p>
    </main>` : `<main class="newsletter-shell">
      <div class="newsletter-intro"><p class="post-meta">Syrgjyn / From the underground</p><h1>Stay in the loop.</h1><p class="lead">New music. Live dates. News from the band.</p><p>Occasional emails, straight from Syrgjyn to your inbox.</p></div>
      <div class="sib-form"><div id="sib-form-container" class="sib-form-container">
        <div id="error-message" class="sib-form-message-panel" role="alert"><div class="sib-form-message-panel__text"><span class="sib-form-message-panel__inner-text">We could not process your signup. Please try again in a moment.</span></div></div>
        <div id="success-message" class="sib-form-message-panel" role="status" aria-live="polite"><div class="sib-form-message-panel__text"><span class="sib-form-message-panel__inner-text">Check your inbox for an email from Syrgjyn. Click the confirmation link to join the mailing list. If you cannot find it, check your spam folder.</span></div></div>
        <div id="sib-container" class="sib-container--large sib-container--vertical">
          <form id="sib-form" method="POST" action="${e(newsletter.formAction)}" data-type="subscription">
            <div class="sib-input sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
              <label class="entry__label" for="EMAIL" data-required="*">Your email address</label>
              <div class="entry__field"><input class="input" type="email" id="EMAIL" name="EMAIL" autocomplete="email" inputmode="email" placeholder="you@example.com" data-required="true" aria-describedby="email-error newsletter-consent" required></div>
            </div><span id="email-error" class="entry__error entry__error--primary"></span></div></div>
            <p id="newsletter-consent" class="newsletter-consent">By subscribing, you request occasional emails about Syrgjyn's music, concerts, news and merchandise. Confirm your email to join. Unsubscribe whenever you like. <a href="/newsletter/privacy/">Newsletter privacy</a>.</p>
            <div class="sib-captcha sib-form-block"><div class="form__entry entry_block"><div class="form__label-row">
              <div class="cf-turnstile g-recaptcha" data-sitekey="${e(newsletter.turnstileSiteKey)}" id="sib-captcha" data-callback="handleCaptchaResponse" data-language="en"></div>
            </div><span class="entry__error entry__error--primary"></span></div></div>
            <div class="sib-form-block"><button class="sib-form-block__button sib-form-block__button-with-loader" form="sib-form" type="submit"><svg aria-hidden="true" class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512"><path d="M256 8a248 248 0 0 1 248 248h-48A200 200 0 0 0 256 56z"/></svg>Join the mailing list</button></div>
            <input type="text" name="email_address_check" value="" class="input--hidden" tabindex="-1" autocomplete="off" aria-hidden="true">
            <input type="hidden" name="locale" value="en">
          </form>
        </div>
      </div></div>
      <noscript><p class="newsletter-note">Please enable JavaScript to use the signup form and its spam protection. For help, email <a href="mailto:info@syrgjyn.com">info@syrgjyn.com</a>.</p></noscript>
      <p class="newsletter-note">After submitting, check your inbox and confirm your subscription. No confirmation email? Check your spam folder.</p>
    </main>`;
    return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(page.title)}</title><meta name="description" content="${e(page.description)}"><link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="Syrgjyn"><meta property="og:title" content="${e(page.title)}"><meta property="og:description" content="${e(page.description)}"><meta property="og:url" content="${url}"><meta property="og:image" content="https://syrgjyn.com/images/syrgjyn-social-share.jpg"><meta name="twitter:card" content="summary_large_image"><style>${css}</style>${privacy ? "" : '<link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css">'}<link rel="stylesheet" href="/assets/newsletter.css"></head><body><header><div class="wrap"><nav><a class="logo" href="/">WELCOME TO SYRGJYN AREA</a>${navigation()}</nav></div></header>${content}<footer><div class="wrap">© 2026 SYRGJYN · <a href="/newsletter/privacy/">Newsletter privacy</a> · <a href="mailto:info@syrgjyn.com">Contact the band</a></div></footer>${privacy ? "" : '<script src="/assets/newsletter.js"></script><script defer src="https://sibforms.com/forms/end-form/build/main.js"></script><script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>'}</body></html>`;
  }
};
