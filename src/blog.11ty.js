const { renderPage } = require("./_cards.cjs");
module.exports = class {
  data() { return { permalink: "blog.html", eleventyExcludeFromCollections: true }; }
  render(data) { return renderPage("blog.html", data.collections.chronicles || []); }
};
