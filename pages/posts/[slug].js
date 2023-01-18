import Image from "next/image";
import Link from "next/link";
import { useTina } from "tinacms/dist/react";
import { client } from "../../.tina/__generated__/client";
import Container from "../../components/container";
import DateFormatter from "../../components/date-formatter";
import Layout from "../../components/layout";
import Meta from "../../components/meta";
import PostBody from "../../components/post-body";
import Strip from "../../components/strip";
import { getAllPosts } from "../../lib/api";
import postStyles from "../../styles/post.module.scss";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export default function Post(props) {
  const { data } = useTina(props);
  const { post } = data;

  return (
    <Layout>
      <>
        <Meta
          title={post.title}
          image={post.coverImage}
          description={post.excerpt}
        />

        <Strip className={postStyles.strip}>
          <Container className={postStyles.header}>
            <section className={postStyles.imageContainer}>
              {!!post.artist?.children?.length && (
                <TinaMarkdown content={post.artist} />
              )}
              <section className={postStyles.image}>
                <picture>
                  <Image
                    layout="fill"
                    objectFit="cover"
                    src={post.coverImage}
                    alt="Immagine in evidenza"
                  />
                </picture>
              </section>
            </section>
            <section className={postStyles.details}>
              <h1>{post.title}</h1>
              <h2>
                {post.author} - <DateFormatter dateString={post.date} />
              </h2>
              <h3 className={postStyles.tags}>
                {(post.tags || []).map((tag) => (
                  <span key={tag}>
                    <Link href={`/posts?tag=${tag}`}>
                      <a alt={`Tutti i post taggati ${tag}`}>{tag}</a>
                    </Link>
                  </span>
                ))}
              </h3>
            </section>
          </Container>
        </Strip>
        <Container>
          <section className={postStyles.content}>
            <section lang="it">
              <TinaMarkdown content={post.content} />
            </section>
          </section>
        </Container>
      </>
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const props = await client.queries.post({
    relativePath: `${params.slug}.json`,
  });

  return {
    props,
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
