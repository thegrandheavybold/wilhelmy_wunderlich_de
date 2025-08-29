// eleventy.config.js (ESM-Syntax für 11ty 2.x)

import moment from "moment";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

import picture from "./src/js/picture.js";
import heroImage from "./src/js/heroImage.js";

export default function (eleventyConfig) {
  // Passthrough Copies
  eleventyConfig.addPassthroughCopy("./src/js/main-min.js");
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addPassthroughCopy("./src/style.css");

  // Navigation Plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Date filter (localized, nutzt moment.js)
  eleventyConfig.addFilter("date", function (date, format, locale = "en") {
    moment.locale(locale);
    return moment(date).format(format);
  });

  // © year output
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  // Shortcodes for Pictures
  eleventyConfig.addShortcode("picture", picture);
  eleventyConfig.addShortcode("heroImage", heroImage);

  // Config Object
  return {
    dir: {
      input: "src",
      output: "dist",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
