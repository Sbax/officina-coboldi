import ErrorPage from "next/error";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Container from "../../components/container";
import DateFormatter from "../../components/date-formatter";
import Layout from "../../components/layout";
import Loader from "../../components/loader";
import Meta from "../../components/meta";
import PostBody from "../../components/post-body";
import Strip from "../../components/strip";
import { getAllPosts, getPostBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import postStyles from "../../styles/post.module.scss";

export default function Post({ post }) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout>
      {router.isFallback ? (
        <Loader />
      ) : (
        <>
          <Meta
            title={post.title}
            image={post.coverImage}
            description={post.excerpt}
          />

          <Strip className={postStyles.strip}>
            <Container className={postStyles.header}>
              <section className={postStyles.imageContainer}>
                {post.artist && (
                  <span
                    className={postStyles.credits}
                    dangerouslySetInnerHTML={{ __html: post.artist }}
                  />
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
              <PostBody content={post.content} />
            </section>
          </Container>
        </>
      )}
    </Layout>
  );
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "artist",
    "artist_url",
    "content",
    "coverImage",
    "tags",
    "excerpt",
  ]);
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
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
