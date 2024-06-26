import { RedirectToLogin, withAuthInfo } from "@propelauth/react";
import { createContext, useCallback, useMemo, useState } from "react";
import Container from "../components/container";
import Meta from "../components/meta";
import Strip from "../components/strip";
import pageStyles from "../styles/page.module.scss";
import Header from "./header";

export const AdminContext = createContext({
  events: null,
  setEvents: null,
  requests: null,
  setRequests: null,
});

function AdminWrapper({ children, isLoggedIn }) {
  const title = "Admin";

  const [events, actualSetEvents] = useState();
  const [requests, setRequests] = useState();

  const setEvents = useCallback(
    (events) =>
      actualSetEvents(
        events.sort(
          (a, b) =>
            new Date(`${b.date} ${b.time}`) - new Date(`${a.date} ${a.time}`)
        )
      ),
    [actualSetEvents]
  );

  const initialValue = { events, setEvents, requests, setRequests };

  if (!isLoggedIn) {
    return <RedirectToLogin />;
  }

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

        <Container>{children}</Container>
      </main>
    </AdminContext.Provider>
  );
}

export default withAuthInfo(AdminWrapper);
