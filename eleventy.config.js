// eleventy.config.js (ESM-Syntax für 11ty 2.x)

import moment from "moment";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import fs from "node:fs";
import path from "node:path";

import picture from "./src/js/picture.js";
import heroImage from "./src/js/heroImage.js";

const manifestPath = path.join(process.cwd(), "dist", "asset-manifest.json");

const assetFallbacks = {
  "src/js/app.js": "/assets/app.js",
  "src/style.css": "/assets/styles.css"
};

function readAssetManifest() {
  if (!fs.existsSync(manifestPath)) {
    return {};
  }

  try {
    return JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch {
    return {};
  }
}

function resolveAssetPath(entry) {
  const manifest = readAssetManifest();

  if (manifest[entry]?.file) {
    return `/${manifest[entry].file}`;
  }

  return assetFallbacks[entry] ?? entry;
}

export default function (eleventyConfig) {
  // Passthrough Copies
  eleventyConfig.addPassthroughCopy("./src/assets");

  // Navigation Plugin
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Date filter (localized, nutzt moment.js)
  eleventyConfig.addFilter("date", function (date, format, locale = "en") {
    moment.locale(locale);
    return moment(date).format(format);
  });

  // © year output
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  eleventyConfig.addFilter("json", (value) => JSON.stringify(value, null, 2));
  eleventyConfig.addGlobalData("assets", {
    app: resolveAssetPath("src/js/app.js"),
    styles: resolveAssetPath("src/style.css")
  });

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
