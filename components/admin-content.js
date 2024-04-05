import { withAuthInfo } from "@propelauth/react";
import React, { useContext, useEffect, useState } from "react";
import styles from "../styles/page.module.scss";
import { AdminContext } from "./admin-wrapper";
import Button from "./button";
import EditCard from "./event-cards/edit-card";
import EventForm from "./event-form";
import EventPreview from "./event-preview";
import Loader from "./loader";
import Modal from "./modal";
import Pending from "./pending";

function AdminContent({ accessToken }) {
  const { events, requests, setEvents, setRequests } = useContext(AdminContext);
  const startDate = new Date().setUTCHours(0, 0, 0, 0);

  const [loading, setLoading] = useState(true);
  const [eventFormShown, showEventForm] = useState(false);
  const [eventsToShow, setEventsToShow] = useState(
    !events || events.error
      ? []
      : events.filter(({ date }) => new Date(date) >= startDate).reverse()
  );

  const showAll = () => setEventsToShow(events);

  useEffect(() => {
    const getEvents = async () => {
      const events = await (
        await fetch("/api/event", {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      ).json();

      setEvents(events);
    };

    getEvents().catch(console.error);
  }, [setEvents]);

  useEffect(() => {
    const getRequests = async () => {
      const requests = await (
        await fetch("/api/requests", {
          method: "GET",
          headers: { Authorization: `Bearer ${accessToken}` },
        })
      ).json();

      setRequests(requests);
    };

    getRequests().catch(console.error);
  }, [setRequests]);

  useEffect(() => {
    if (!events || events.error) return;

    setEventsToShow(events.filter(({ date }) => new Date(date) >= startDate));
  }, [events]);

  useEffect(() => {
    setLoading(!(events && requests));
  }, [events, requests]);

  const closeModal = () => showEventForm(false);

  if (loading) {
    return <Loader />;
  }

  if (!events || !requests || events?.error || requests?.error) {
    return <>Errore Database</>;
  }

  return (
    <>
      <h1 className={styles.title}>Prossimi Eventi</h1>

      <section className={styles.buttonWrapper}>
        <Button onClick={() => showEventForm(true)}>Crea Evento</Button>
        <Button onClick={() => showAll()}>Mostra tutti</Button>
      </section>

      <EventPreview
        events={eventsToShow}
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(20rem, 1fr))" }}
        card={<EditCard />}
        showEmpty={false}
      />

      <h1 className={styles.title}>Richieste in Attesa</h1>
      <Pending />

      {eventFormShown && (
        <Modal onClose={closeModal}>
          <EventForm onSave={closeModal} />
        </Modal>
      )}
    </>
  );
}

export default withAuthInfo(AdminContent);
