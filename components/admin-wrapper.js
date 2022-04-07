import { withAuthInfo } from "@propelauth/react";
import Container from "../components/container";
import Meta from "../components/meta";
import Strip from "../components/strip";
import pageStyles from "../styles/page.module.scss";
import Header from "./header";

function AdminWrapper({ children, isLoggedIn }) {
  const title = "Admin";

  return (
    <main>
      <Header />
      <Meta title={title} />

      <Strip className={pageStyles.strip}>
        <Container>
          <section className={pageStyles.details}>
            <h1 className={pageStyles.title}>{title}</h1>
          </section>
        </Container>
      </Strip>

      <Container>{isLoggedIn ? children : <></>}</Container>
    </main>
  );
}

export default withAuthInfo(AdminWrapper);
