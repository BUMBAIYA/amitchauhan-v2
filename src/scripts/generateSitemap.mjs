import { writeFileSync } from "fs";
import { globby } from "globby";
import prettier from "prettier";

const siteMetadata = {
  siteUrl: "https://amitchauhan.me",
};

async function generateSitemap() {
  const prettierConfig = await prettier.resolveConfig(
    "../../prettier.config.js",
  );

  const pages = await globby([
    "src/pages/*.tsx",
    "!src/pages/_*.tsx",
    "!src/pages/api",
    "!src/pages/404.tsx",
  ]);

  const date = new Date();
  const modificationDate = date.toISOString();

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .map((page) => {
                const path = page
                  .replace(".tsx", "")
                  .replace("src/pages/", "/");
                const route = path === "/index" ? "" : path;
                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${route}</loc>
                            <lastmod>${modificationDate}</lastmod>
                            <changefreq>monthly</changefreq>
                            <priority>1.0</priority>
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
}

const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml`;

generateSitemap();
