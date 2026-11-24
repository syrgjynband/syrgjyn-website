const { renderPage } = require("./_cards.cjs");
const { navigation } = require("./_site.cjs");
module.exports = class {
  data() { return { permalink: "blog.html", eleventyExcludeFromCollections: false }; }
  render(data) {
    return renderPage("blog.html", data.collections.chronicles || [])
      .replace("<!-- NAVIGATION -->", navigation());
  }
};
