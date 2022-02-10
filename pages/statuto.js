import PageWrapper from "../components/page-wrapper";
import PostBody from "../components/post-body";
import markdownToHtml from "../lib/markdownToHtml";
import postStyles from "../styles/post.module.scss";
import page from "../_pages/statuto.json";

export default function Statuto({ content }) {
  return (
    <PageWrapper title={"Statuto"}>
      <section className={postStyles.content}>
        <PostBody content={content} />
      </section>
    </PageWrapper>
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
