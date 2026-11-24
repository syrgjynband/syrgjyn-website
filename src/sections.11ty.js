
const fs = require("node:fs");
const { escapeHtml } = require("./_cards.cjs");

const pages = [
  {
    slug: "about",
    title: "About Syrgjyn | Albanian Underground Metal Since 1999",
    description: "The history of Syrgjyn, an underground metal band founded in Tirana in 1999, including the Alkimia performances and Albanian metal scene.",
    heading: "About Syrgjyn",
    parts: [
      ["Founded in Tirana", "Syrgjyn was founded in Tirana, Albania, in 1999. The band’s story is tied to the local underground rock and metal scene."],
      ["The Alkimia years, 2005–2011", "From September 2005 to August 2011, Syrgjyn performed every Saturday night at Alkimia in Tirana. During that period the band played as two musicians with a drum machine, often performing sets lasting three to four hours."],
      ["The underground legacy", "Those evenings covered rock, punk, heavy metal, thrash, gothic metal, death metal and black metal. The band describes these performances as a formative part of its identity and its connection with Tirana’s music community."]
    ],
    links: [
      ["Read the Alkimia story", "/posts/we-kept-the-fire-burning.html"],
      ["Hear our music", "/discography/"]
    ]
  },
  {
    slug: "discography",
    title: "Syrgjyn Discography | Manifest of Essence & Metal Music",
    description: "Discover Manifest of Essence by Syrgjyn, listen to the Albanian metal band on Spotify and Bandcamp, and explore upcoming music.",
    heading: "Music & Discography",
    parts: [
      ["Manifest of Essence (2010)", "Syrgjyn’s album Manifest of Essence was released in 2010. Stream the band’s recordings or explore the album through the official music platforms."],
      ["Sedentary Death Syndrome", "Sedentary Death Syndrome is the band’s second album project, currently in development. No release date is announced here."]
    ],
    links: [
      ["Listen on Spotify", "https://open.spotify.com/artist/6Q56AfBOeaNPbrToA4vGDi"],
      ["Manifest of Essence on Bandcamp", "https://syrgjyn.bandcamp.com/album/manifest-of-essence-20th-anniversary-remaster"]
    ]
  },
  {
    slug: "shows",
    title: "Syrgjyn Live Shows | Metal Concerts & Bookings",
    description: "Find updates about Syrgjyn live performances in Albania and contact the band for festivals, concerts and booking inquiries.",
    heading: "Live Shows",
    parts: [
      ["Upcoming dates", "No upcoming concert dates have been announced on this page. Check back for updates."],
      ["Past shows", "Syrgjyn performed at Check-In Fest in Tirana on October 3, 2023. The band also held regular Saturday-night performances at Alkimia between 2005 and 2011."],
      ["Book Syrgjyn", "For festival appearances, venue bookings and concert inquiries, contact the band directly."]
    ],
    links: [
      ["Send a booking inquiry", "mailto:info@syrgjyn.com?subject=Syrgjyn%20Booking%20Inquiry"],
      ["Read the live-history story", "/posts/we-kept-the-fire-burning.html"]
    ]
  },
  {
    slug: "members",
    title: "Syrgjyn Band Members | Vocals, Guitars, Bass & Drums",
    description: "Meet the members of Syrgjyn, the Albanian underground metal band from Tirana, founded in 1999.",
    heading: "Syrgjyn Members",
    parts: [
      ["Lineup", "Gjergj Mero: guitars and vocals. Olsi Gjondedaj: guitars. Arvit Banishta: bass. Bes M.: drums."],
      ["Band history", "The lineup has changed over time. From September 2005 through August 2011, Syrgjyn regularly performed at Alkimia as a two-person act with a drum machine."]
    ],
    links: [
      ["Read the band history", "/about/"],
      ["Booking and contact", "/#contact"]
    ]
  },
  {
    slug: "press",
    title: "Syrgjyn Press & Media | Albanian Underground Metal",
    description: "Press information for Syrgjyn, the Albanian metal band founded in Tirana in 1999. Find background, music links and media contact details.",
    heading: "Press & Media",
    parts: [
      ["Band background", "Syrgjyn is an underground metal band formed in Tirana in 1999. The band released Manifest of Essence in 2010 and has a long performance history in the Albanian underground scene."],
      ["For journalists and promoters", "For interviews, concert booking, press inquiries or official images, contact the band at info@syrgjyn.com."],
      ["Official music and stories", "Listen to the band’s recordings and explore firsthand writing about its performances and history."]
    ],
    links: [
      ["DOWNLOAD OFFICIAL EPK (PDF)", "/Syrgjyn_Official_EPK.pdf"],
      ["Email Syrgjyn", "mailto:info@syrgjyn.com?subject=Press%20Inquiry"],
      ["Discography", "/discography/"],
      ["The Chronicles", "/blog.html"]
    ]
  }
];

module.exports = class SectionPages {
  data() {
    return {
      pagination: {
        data: "sections",
        size: 1,
        alias: "section"
      },
      sections: pages,
      permalink: data => `${data.section.slug}/index.html`,
      eleventyExcludeFromCollections: true
    };
  }

  render({ section }) {
    const home = fs.readFileSync("index.html", "utf8");
    const css = home.match(/<style>([\s\S]*?)<\/style>/i)[1];
    const e = escapeHtml;
    const url = `https://syrgjyn.com/${section.slug}/`;

    const links = section.links.map(([name, link]) => {
      const isEpk = link === "/Syrgjyn_Official_EPK.pdf";
      const external = link.startsWith("http")
        ? 'target="_blank" rel="noopener noreferrer"'
        : "";
      const download = isEpk
        ? 'download="Syrgjyn_Official_EPK.pdf"'
        : "";
      const className = isEpk ? 'class="epk-button"' : "";

      return `<a href="${e(link)}" ${className} ${external} ${download}>${e(name)}</a>`;
    }).join("");

    const sections = section.parts.map(([head, body]) =>
      `<section><div class="wrap"><h2>${e(head)}</h2><p class="lead" style="max-width:760px;line-height:1.85;font-size:18px">${e(body)}</p></div></section>`
    ).join("");

    const ld = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: section.title,
      url,
      about: {
        "@id": "https://syrgjyn.com/#band"
      }
    }).replace(/</g, '\\u003c');

    return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${e(section.title)}</title>
<meta name="description" content="${e(section.description)}">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${e(section.title)}">
<meta property="og:description" content="${e(section.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://syrgjyn.com/images/syrgjyn-social-share.jpg">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${ld}</script>
<style>
${css}

.page-hero {
  padding: 80px 0 45px;
}

.page-hero h1 {
  font-size: clamp(32px, 6vw, 64px);
  text-transform: uppercase;
}

.page-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 20px;
  padding: 24px 0 55px;
}

.page-links a {
  border-bottom: 1px solid white;
  padding: 8px 0;
}

.page-links .epk-button {
  display: inline-block;
  background: #ffffff;
  color: #000000;
  border: 2px solid #ffffff;
  border-radius: 3px;
  padding: 16px 26px;
  font-weight: 800;
  font-size: 14px;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-decoration: none;
  transition: all .2s ease;
}

.page-links .epk-button:hover {
  background: #000000;
  color: #ffffff;
}
</style>
</head>
<body>
<header>
<div class="wrap">
<nav>
<a class="logo" href="/">WELCOME TO SYRGJYN AREA</a>
<div class="navlinks">
<a href="/">Home</a>
<a href="/about/">About</a>
<a href="/discography/">Music</a>
<a href="/shows/">Shows</a>
<a href="/members/">Members</a>
<a href="/press/">Press</a>
<a href="/blog.html">Blog</a>
<a href="/#contact">Booking</a>
</div>
</nav>
</div>
</header>
<main>
<div class="wrap page-hero">
<h1>${e(section.heading)}</h1>
<p class="lead">${e(section.description)}</p>
</div>
${sections}
<div class="wrap page-links">${links}</div>
</main>
<footer>
<div class="wrap">© 2026 SYRGJYN — All rights reserved.</div>
</footer>
</body>
</html>`;
  }
};
