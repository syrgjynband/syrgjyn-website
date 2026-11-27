
const { renderPage } = require("./_cards.cjs");
const { navigation, lineup } = require("./_site.cjs");
const { galleryGrid } = require("./_gallery.cjs");

module.exports = class {
  data() {
    return {
      permalink: "index.html",
      eleventyExcludeFromCollections: false
    };
  }

  render(data) {
    const html = renderPage(
      "index.html",
      data.collections.chronicles || []
    ).replace("<!-- NAVIGATION -->", navigation())
      .replace("<!-- BAND_LINEUP -->", lineup(data.band))
      .replace("<!-- GALLERY_PREVIEW -->", galleryGrid(data.gallery.photos.filter(photo => photo.featured).slice(0, 6), { preview: true }));

    const musicGroup = {
      "@context": "https://schema.org",
      "@type": "MusicGroup",
      "@id": "https://syrgjyn.com/#band",
      "name": "Syrgjyn",
      "url": "https://syrgjyn.com/",
      "description": "Syrgjyn is an Albanian metal band founded in Tirana in 1999, known for its death metal music and its contribution to Albania's underground metal scene.",
      "genre": [
        "Death Metal",
        "Heavy Metal"
      ],
      "foundingDate": "1999",
      "foundingLocation": {
        "@type": "Place",
        "name": "Tirana, Albania"
      },
      "sameAs": [
        "https://open.spotify.com/artist/6Q56AfBOeaNPbrToA4vGDi",
        "https://www.instagram.com/syrgjyn/",
        "https://youtube.com/@syrgjyn",
        "https://www.facebook.com/syrgjyn",
        "https://syrgjyn.bandcamp.com",
        "https://www.metal-archives.com/bands/Syrgjyn/3540457051"
      ],
      "album": [
        {
          "@type": "MusicAlbum",
          "name": "Manifest of Essence",
          "datePublished": "2010",
          "byArtist": {
            "@id": "https://syrgjyn.com/#band"
          }
        }
      ],
      "member": data.band.members.map(member => ({
        "@type": "Person", "name": member.name, "description": member.role
      }))
    };

    const json = JSON.stringify(musicGroup)
      .replace(/</g, "\\u003c");

    const schema = `<script type="application/ld+json">${json}</script>`;

    if (!/<\/head\s*>/i.test(html)) {
      throw new Error("Homepage closing head tag missing");
    }

    return html.replace(/<\/head\s*>/i, '<link rel="stylesheet" href="/assets/gallery.css">\n' + schema + "\n</head>");
  }
};
