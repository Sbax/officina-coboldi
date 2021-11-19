import Head from "next/head";
import Container from "../components/container";
import Layout from "../components/layout";
import Strip from "../components/strip";
import postStyles from "../styles/post.module.scss";
import pageStyles from "../styles/page.module.scss";

export default function PrivacyPolicy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | Officina Coboldi</title>
      </Head>
      <Strip primary className={pageStyles.strip}>
        <Container>
          <section className={pageStyles.details}>
            <h1 className={pageStyles.title}>Privacy Policy</h1>
          </section>
        </Container>
      </Strip>
      <Container>
        <section className={postStyles.content}></section>
      </Container>
    </Layout>
  );
}
