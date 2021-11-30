import DateFormatter from "./date-formatter";
import Link from "next/link";
import postCardStyle from "../styles/post-card.module.scss";

export default function PostCard({
  title,
  coverImage,
  date,
  author,
  slug,
  excerpt,
  small,
  large,
  tags,
  showTags = false,
}) {
  return (
    <article
      className={`${postCardStyle.container} ${
        small ? postCardStyle.small : ""
      } ${large ? postCardStyle.large : ""}`}
      style={
        coverImage
          ? {
              backgroundImage: `url('${coverImage}')`,
              backgroundSize: "cover",
            }
          : {}
      }
    >
      {showTags && tags?.length && (
        <section className={postCardStyle.tags}>
          {tags.map((tag) => (
            <span key={tag} className={postCardStyle.tag}>
              <Link href={`/posts?tag=${tag}`}>
                <a alt={`Tutti i post taggati '${tag}'`}>{tag}</a>
              </Link>
            </span>
          ))}
        </section>
      )}
      <section>
        <span>
          <DateFormatter dateString={date} />, {author}
        </span>
      </section>
      <section>
        <Link href={`/posts/${slug}`}>
          <a alt={title}>
            <h3>{title}</h3>
          </a>
        </Link>
      </section>
      {large && (
        <section className={postCardStyle.excerpt}>
          <p>{excerpt}</p>
        </section>
      )}
    </article>
  );
}

export function SmallCard(props) {
  return <PostCard {...props} small={true} />;
}

export function LargeCard(props) {
  return <PostCard {...props} large={true} />;
}
