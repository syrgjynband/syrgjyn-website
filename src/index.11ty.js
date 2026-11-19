const { renderPage } = require("./_cards.cjs");
module.exports = class {
  data() { return { permalink: "index.html", eleventyExcludeFromCollections: true }; }
  render(data) { return renderPage("index.html", data.collections.chronicles || []); }
};
