module.exports = {
  layout: "article.11ty.js",
  permalink: data => `posts/${data.page.fileSlug}.html`,
  eleventyComputed: {
    pageTitle: data => data.title || "Syrgjyn Chronicles"
  }
};
