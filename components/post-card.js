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
      <div>
        <span>
          <DateFormatter dateString={date} />, {author}
        </span>
      </div>
      <div>
        <Link href={`/posts/${slug}`}>
          <a>
            <h3>{title}</h3>
          </a>
        </Link>
      </div>
      {large && (
        <div className={postCardStyle.excerpt}>
          <p>{excerpt}</p>
        </div>
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
