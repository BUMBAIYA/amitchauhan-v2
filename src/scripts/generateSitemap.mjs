import { writeFileSync, statSync } from "fs";
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

                const modDate = getFileModificationDate(page);

                // exclude dynamic routes
                if (path.includes("[") || path.includes("]")) {
                  return "";
                }

                return `
                        <url>
                            <loc>${siteMetadata.siteUrl}${path}</loc>
                            <lastmod>${modDate}</lastmod>
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

/**
 * Get File Modification Date Strategy.
 *
 * This function provides a quick and dirty solution to retrieve the modification date of a file.
 * While it works perfectly for basic use cases, it has some limitations and may not be suitable for
 * tracking file changes in multiple Git branches or in service applications.
 *
 * @param {string} filePath - The path to the file for which to retrieve the modification date.
 * @returns {string} - The modification date of the file in ISO format (e.g., "2024-01-03T12:30:00.000Z").
 *                    If an error occurs during the process, the current date is returned.
 *
 * @throws {Error} If an error occurs while getting the file stats.
 *
 * @description
 * Points to consider:
 * - File changes include any change in file content; this method may not be useful for tracking
 *   file changes in multiple Git branches.
 * - A major issue with this method is that if you edit a file and later decide to undo the changes,
 *   the file modification date will reflect the undo file change event. This occurs even if the
 *   page content remains unchanged but the modification date has been updated.
 *
 * @example
 * const filePath = '/path/to/file.txt';
 * const modificationDate = getFileModificationDate(filePath);
 * console.log(`Modification Date: ${modificationDate}`);
 */
function getFileModificationDate(filePath) {
  try {
    const stats = statSync(filePath);
    return stats.mtime.toISOString();
  } catch (error) {
    console.error(
      `Error getting modification date for file ${filePath}: ${error.message}`,
    );
    return new Date().toISOString(); // Return current date if an error occurs
  }
}

const robotsTxt = `User-agent: *
Allow: /
Sitemap: ${siteMetadata.siteUrl}/sitemap.xml`;

generateSitemap();
