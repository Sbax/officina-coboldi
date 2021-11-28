import React from "react";

import postPreviewStyles from "../styles/post-preview.module.scss";
import PostCard, { LargeCard } from "./post-card";

export default function PostPreview({ posts, showTags = false }) {
  const [first, ...other] = posts;

  return (
    <section className={postPreviewStyles.container}>
      <section className={postPreviewStyles.hero}>
        {first && <LargeCard showTags={showTags} {...first} />}
      </section>
      {other.map((post) => (
        <PostCard
          showTags={showTags}
          className={postPreviewStyles.post}
          key={post.slug}
          {...post}
        />
      ))}
    </section>
  );
}
