module.exports = function (eleventyConfig) {
  // Existing HTML is kept unchanged in GitHub. The JavaScript templates read
  // it as the design source and produce the deployed index.html and blog.html.
  eleventyConfig.setTemplateFormats(["md", "11ty.js"]);
  eleventyConfig.addPassthroughCopy({ images: "images" });
  eleventyConfig.addPassthroughCopy("Syrgjyn_Official_EPK.pdf");
  eleventyConfig.addPassthroughCopy({ posts: "posts" });

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
