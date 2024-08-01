import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";
import { siteMetadata } from "../data/siteMetaData.mjs";

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig(
    "../../prettier.config.js",
  );

  const pages = await globby([
    "src/pages/**/*.tsx",
    "!src/pages/_*.tsx",
    "!src/pages/api",
    "!src/pages/404.tsx",
  ]);

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace(".tsx", "")
                  .replace("src/pages/", "/")
                  .replace("/index", "");

                // exclude dynamic routes
                if (path.includes("[") || path.includes("]")) {
                  return "";
                }

                return `<url>
                            <loc>${siteMetadata.siteUrl}${path}</loc>
                        </url>
                    `;
              })
              .join("")}
        </urlset>
  `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  writeFileSync("public/sitemap.xml", formatted);
  writeFileSync("public/robots.txt", robotsTxt);

  console.log(
    "Successfully generated\n-> Sitemap at public/sitemap.xml\n-> Robots.txt at public/robots.txt",
  );
}

const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml`;

generateSitemap();
