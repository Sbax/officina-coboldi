import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "../../components/container";
import DateFormatter from "../../components/date-formatter";
import Footer from "../../components/footer";
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
          <Head>
            <Meta title={post.title} image={post.coverImage} />
          </Head>
          <Strip className={postStyles.strip}>
            <Container className={postStyles.header}>
              <picture className={postStyles.image}>
                <img src={post.coverImage} alt="Immagine in Evidenza" />
              </picture>
              <section className={postStyles.details}>
                <h1>{post.title}</h1>
                <h2>
                  {post.author} - <DateFormatter dateString={post.date} />
                </h2>
              </section>
            </Container>
          </Strip>
          <Container>
            <section className={postStyles.content}>
              <PostBody content={post.content} />
            </section>
          </Container>
          <Footer />
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
    "content",
    "ogImage",
    "coverImage",
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
