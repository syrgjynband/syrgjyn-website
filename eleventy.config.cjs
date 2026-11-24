module.exports = function (eleventyConfig) {
  // Root HTML files provide the design; JavaScript templates render CMS data.
  eleventyConfig.setTemplateFormats(["md", "11ty.js"]);
  eleventyConfig.ignores.add("README-SETUP.md");
  eleventyConfig.ignores.add("SEO-CHANGELOG.md");
  eleventyConfig.addPassthroughCopy({ images: "images" });
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("Syrgjyn_Official_EPK.pdf");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("_redirects");
  eleventyConfig.addWatchTarget("index.html");
  eleventyConfig.addWatchTarget("blog.html");

  eleventyConfig.addCollection("chronicles", function (collectionApi) {
    return collectionApi.getFilteredByGlob("./content/posts/*.md")
      .filter(post => post.data && post.data.title)
      .sort((a, b) => {
        const ad = a.data.date ? new Date(a.data.date).getTime() : 0;
        const bd = b.data.date ? new Date(b.data.date).getTime() : 0;
        return (Number.isFinite(bd) ? bd : 0) - (Number.isFinite(ad) ? ad : 0);
      });
  });

  return {
    dir: { input: ".", output: "_site", includes: "_includes" },
    markdownTemplateEngine: false
  };
};
