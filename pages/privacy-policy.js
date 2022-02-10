import PageWrapper from "../components/page-wrapper";
import PostBody from "../components/post-body";
import markdownToHtml from "../lib/markdownToHtml";
import postStyles from "../styles/post.module.scss";
import page from "../_pages/privacy-policy.json";

export default function PrivacyPolicy({ content }) {
  return (
    <PageWrapper title="Privacy Policy">
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
