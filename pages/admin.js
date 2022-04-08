import { useRouter } from "next/router";
import { useState } from "react";
import AdminWrapper from "../components/admin-wrapper";
import Button from "../components/button";
import EditCard from "../components/event-cards/edit-card";
import EventForm from "../components/event-form";
import EventPreview from "../components/event-preview";
import Modal from "../components/modal";
import Pending from "../components/pending";
import { getEvents } from "../lib/sheet";
import styles from "../styles/page.module.scss";

export default function Admin({ events }) {
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  const [eventFormShown, showEventForm] = useState(false);

  const startDate = new Date().setUTCHours(0, 0, 0, 0);
  return (
    <AdminWrapper>
      <h1 className={styles.title}>Prossimi Eventi</h1>

      <Button onClick={() => showEventForm(true)}>Crea Evento</Button>
      <EventPreview
        events={events
          .filter(({ date }) => new Date(date) >= startDate)
          .reverse()}
        card={<EditCard />}
        showEmpty={false}
      />

      <h1 className={styles.title}>Richieste in Attesa</h1>
      <Pending events={events} />

      {eventFormShown && (
        <Modal onClose={() => showEventForm(false)}>
          <EventForm onSave={() => refreshData()} />
        </Modal>
      )}
    </AdminWrapper>
  );
}

export async function getServerSideProps() {
  const events = await getEvents();

  return {
    props: {
      events: events.error ? [] : events,
    },
  };
}
