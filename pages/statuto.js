import Container from "../components/container";
import Layout from "../components/layout";
import Meta from "../components/meta";
import PostBody from "../components/post-body";
import Strip from "../components/strip";
import markdownToHtml from "../lib/markdownToHtml";
import pageStyles from "../styles/page.module.scss";
import postStyles from "../styles/post.module.scss";
import page from "../_pages/statuto.json";

export default function Statuto({ content }) {
  return (
    <Layout>
      <Meta title="Statuto" />
      <Strip primary className={pageStyles.strip}>
        <Container>
          <section className={pageStyles.details}>
            <h1 className={pageStyles.title}>Statuto</h1>
          </section>
        </Container>
      </Strip>
      <Container>
        <section className={postStyles.content}>
          <PostBody content={content} />
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const content = await markdownToHtml(page.content || "");

  return {
    props: {
      content,
    },
  };
}
