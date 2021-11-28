import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import Button from "../../components/button";
import Container from "../../components/container";
import Footer from "../../components/footer";
import Layout from "../../components/layout";
import PostCard from "../../components/post-card";
import PostPreview from "../../components/post-preview";
import { getAllPosts } from "../../lib/api";
import postsStyles from "../../styles/posts.module.scss";

const POSTS_FIRST_PAGE = 13;

const POSTS_PER_PAGE = 15;

export default function Posts({ posts }) {
  const router = useRouter();
  const page = parseInt(router.query.page || 0);
  const { tag } = router.query;
  const container = useRef(null);

  const filtered = posts.filter(({ tags }) => !tag || tags.includes(tag));

  const pages = (() => {
    if (filtered.length <= POSTS_FIRST_PAGE) {
      return 1;
    }

    return (
      1 + Math.floor((filtered.length - POSTS_FIRST_PAGE) / POSTS_PER_PAGE)
    );
  })();

  useEffect(() => {
    // when the page changes we should scroll to the top
    // this is a workaround to find the first scrollable element
    // and trigger the scroll there

    const getScrollParent = (node) => {
      if (!node) return;

      if (node.scrollHeight > node.clientHeight) {
        return node;
      }

      return getScrollParent(node.parentNode);
    };

    getScrollParent(container.current)?.scrollTo(0, 0);
  }, [page, tag]);

  const showPreview = !page;
  const { start, stop } = (() => {
    if (page === 0) {
      return {
        start: 4,
        stop: POSTS_FIRST_PAGE,
      };
    }

    return {
      start: POSTS_FIRST_PAGE + (page - 1) * POSTS_PER_PAGE,
      stop: POSTS_FIRST_PAGE + page * POSTS_PER_PAGE,
    };
  })();

  return (
    <>
      <Layout>
        <section className={postsStyles.wrapper} ref={container}>
          <Container className={postsStyles.results}>
            <section className={postsStyles.title}>
              <h1>
                {tag ? `I post taggati '${tag}'` : "Blog"}
                {page !== 0 && `, pagina ${page + 1}`}
              </h1>

              <section>
                {page !== 0 && (
                  <div>
                    <Button
                      onClick={() =>
                        router.push(`/posts?page=${(parseInt(page) || 0) - 1}`)
                      }
                    >
                      <img src="/assets/arrow.svg" alt="Post precedenti" />
                    </Button>
                  </div>
                )}

                {pages !== 1 && (
                  <div>
                    <Button
                      disabled={page === pages}
                      className={postsStyles.flip}
                      onClick={() =>
                        router.push(`/posts?page=${(parseInt(page) || 0) + 1}`)
                      }
                    >
                      <img src="/assets/arrow.svg" alt="Post successivi" />
                    </Button>
                  </div>
                )}
              </section>
            </section>

            {filtered.length === 0 ? (
              <section className={postsStyles.empty}>
                <span>Nessun post trovato</span>
                <div>{"o͡╮༼  ಠДಠ ༽╭o͡━☆ﾟ.*･｡ﾟ"}</div>
                <span>
                  Ritorna alla pagina principale del,{" "}
                  <Link href="/posts">blog</Link>!
                </span>
              </section>
            ) : (
              <>
                {showPreview && (
                  <PostPreview showTags posts={filtered.slice(0, 4)} />
                )}

                <section className={postsStyles.other}>
                  {filtered.slice(start, stop).map((post) => (
                    <PostCard key={post.slug} showTags {...post} />
                  ))}
                </section>
              </>
            )}
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts([
    "title",
    "date",
    "slug",
    "author",
    "coverImage",
    "content",
    "excerpt",
    "tags",
  ]);

  return {
    props: {
      posts,
    },
  };
}
