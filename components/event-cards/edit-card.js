import React, { useState } from "react";
import eventCardStyles from "../../styles/event-card.module.scss";
import Bookings from "../bookings";
import Button from "../button";
import EventForm from "../event-form";
import Modal from "../modal";
import EventCard from "./event-card";

export default function EditCard({ event }) {
  const [editFormShown, showEventForm] = useState(false);
  const [bookingsShown, showBookings] = useState(false);

  return (
    <>
      <EventCard
        event={event}
        button={
          <section>
            <a
              href="#"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${location.origin}/events?eventId=${event.id}`
                );
              }}
            >
              Copia link invito
            </a>
            <div className={eventCardStyles.booking}>
              <Button primary={true} onClick={() => showEventForm(true)}>
                Modifica
              </Button>

              {!event.reservationLink ? (
                <Button
                  disabled={event.reservationLink}
                  onClick={() => showBookings(true)}
                >
                  Prenotazioni ({event.booked}/{event.max})
                </Button>
              ) : (
                ""
              )}
            </div>
          </section>
        }
      />

      {editFormShown && (
        <Modal onClose={() => showEventForm(false)}>
          <EventForm event={event} />
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
