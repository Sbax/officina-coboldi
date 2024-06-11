import fs from "fs";
import { join } from "path";

const homeDirectory = join(process.cwd(), "_home");
const postsDirectory = join(process.cwd(), "_posts");

const readFile = (path) => {
  const fileContents = fs.readFileSync(path, "utf8");
  return JSON.parse(fileContents);
};

export function getHomeSettings() {
  return readFile(join(homeDirectory, `index.json`));
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.json$/, "");

  const item = readFile(join(postsDirectory, `${realSlug}.json`));

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
