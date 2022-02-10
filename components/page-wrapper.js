import Container from "./container";
import Layout from "./layout";
import Meta from "./meta";
import Strip from "./strip";
import pageStyles from "../styles/page.module.scss";

export default function PageWrapper({ title, hideStrip, children }) {
  return (
    <Layout>
      <Meta title={title} />
      {!hideStrip && (
        <Strip primary className={pageStyles.strip}>
          <Container>
            <section className={pageStyles.details}>
              <h1 className={pageStyles.title}>{title}</h1>
            </section>
          </Container>
        </Strip>
      )}
      <Container>{children}</Container>
    </Layout>
  );
}
