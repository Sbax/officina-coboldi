import { useRouter } from "next/router";
import React, { useState } from "react";
import eventCardStyles from "../../styles/event-card.module.scss";
import Bookings from "../bookings";
import Button from "../button";
import EventForm from "../event-form";
import Modal from "../modal";
import EventCard from "./event-card";

export default function EditCard({ event }) {
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);

  const [editFormShown, showEventForm] = useState(false);
  const [bookingsShown, showBookings] = useState(false);

  return (
    <>
      <EventCard
        event={event}
        button={
          <section className={eventCardStyles.booking}>
            <Button primary={true} onClick={() => showEventForm(true)}>
              Modifica
            </Button>

            {!event.reservationLink && (
              <Button onClick={() => showBookings(true)}>Prenotazioni</Button>
            )}
          </section>
        }
      />

      {editFormShown && (
        <Modal onClose={() => showEventForm(false)}>
          <EventForm event={event} onSave={() => refreshData()} />
        </Modal>
      )}

      {bookingsShown && (
        <Modal onClose={() => showBookings(false)}>
          <Bookings event={event} />
        </Modal>
      )}
    </>
  );
}
