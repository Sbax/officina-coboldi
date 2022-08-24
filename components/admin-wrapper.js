import { withAuthInfo } from "@propelauth/react";
import { createContext, useState } from "react";
import Container from "../components/container";
import Meta from "../components/meta";
import Strip from "../components/strip";
import pageStyles from "../styles/page.module.scss";
import Header from "./header";

export const AdminContext = createContext({
  events: [],
  setEvents: () => {},
  requests: [],
  setRequests: () => {},
});

function AdminWrapper({ children, isLoggedIn }) {
  const title = "Admin";

  const [events, setEvents] = useState([]);
  const [requests, setRequests] = useState([]);

  const initialValue = { events, setEvents, requests, setRequests };

  return (
    <AdminContext.Provider value={initialValue}>
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
    </AdminContext.Provider>
  );
}

export default withAuthInfo(AdminWrapper);
