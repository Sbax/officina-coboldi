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
      <section>
        <span>
          <DateFormatter dateString={date} />, {author}
        </span>
      </section>
      <section>
        <Link href={`/posts/${slug}`}>
          <a>
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
