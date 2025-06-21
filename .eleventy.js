const fs = require("fs");
const path = require("path");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");

  const markdownIt = require("markdown-it");
  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(dateObj);
  });

  eleventyConfig.addGlobalData("year", () => {
    return new Date().getFullYear();
  });

  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/blog/*.md").reverse();
  });

  eleventyConfig.addCollection("docs", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/docs/**/*.md").reverse();
  });

  eleventyConfig.addCollection("spec", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/spec/**/*.md").reverse();
  });

  eleventyConfig.addCollection("ref", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("content/reference/**/*.md")
      .reverse();
  });

  eleventyConfig.addCollection("doc_sections", function (_) {
    const groupsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "content/_data/groups.json")),
    );

    const sections = groupsData.docs;

    return sections;
  });

  eleventyConfig.addCollection("spec_sections", function (_) {
    const groupsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "content/_data/groups.json")),
    );

    const sections = groupsData.spec;

    return sections;
  });

  eleventyConfig.addCollection("ref_sections", function (_) {
    const groupsData = JSON.parse(
      fs.readFileSync(path.join(__dirname, "content/_data/groups.json")),
    );

    const sections = groupsData.ref;

    return sections;
  });

  eleventyConfig.addLayoutAlias("default", "index.html");
  eleventyConfig.addLayoutAlias("post", "single.html");
  eleventyConfig.addLayoutAlias("docpage", "docpage.html");
  eleventyConfig.addLayoutAlias("refpage", "refpage.html");
  eleventyConfig.addLayoutAlias("specpage", "specpage.html");

  const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
  eleventyConfig.addPlugin(syntaxHighlight);

  const pluginNavigation = require("@11ty/eleventy-navigation");
  eleventyConfig.addPlugin(pluginNavigation);

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "_data",
      output: "_site",
    },
    templateFormats: ["md", "njk", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
