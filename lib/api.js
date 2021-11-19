import fs from "fs";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.json$/, "");

  const fileContents = fs.readFileSync(
    join(postsDirectory, `${realSlug}.json`),
    "utf8"
  );

  const item = JSON.parse(fileContents);

  const cleanedItem = fields.reduce((aggregated, field) => {
    if (!item[field]) return aggregated;

    return {
      ...aggregated,
      [field]: item[field],
    };
  }, {});

  return { slug: realSlug, ...cleanedItem };
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();

  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
