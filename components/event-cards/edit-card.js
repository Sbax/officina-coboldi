import { withAuthInfo } from "@propelauth/react";
import React, { useCallback, useContext, useState } from "react";
import eventCardStyles from "../../styles/event-card.module.scss";
import { AdminContext } from "../admin-wrapper";
import Bookings from "../bookings";
import Button from "../button";
import EventForm from "../event-form";
import Modal from "../modal";
import EventCard from "./event-card";

function EditCard({ event, accessToken }) {
  const [editFormShown, showEventForm] = useState(false);
  const [bookingsShown, showBookings] = useState(false);
  const [copyEventFormShown, showCopyEventForm] = useState(false);
  const [deleteEvent, showDeleteEvent] = useState(false);

  const { events, setEvents } = useContext(AdminContext);

  const deleteEventAction = useCallback(async () => {
    const response = await fetch(
      `/api/event`,
      {
        method: "DELETE",
        headers: { Authorization: `Bearer ${accessToken}` },
        body: event.id,
      },
      {}
    );

    if (response.ok) {
      setEvents(events.filter(({ id }) => id !== event.id));
    }
  });

  return (
    <>
      <EventCard
        event={event}
        button={
          <section>
            <div>
              <a
                href="#"
                onClick={() => {
                  showDeleteEvent(true);
                }}
              >
                Cancella l&apos;evento
              </a>
            </div>
            <div>
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
            </div>
            <div>
              <a
                href="#"
                onClick={() => {
                  showCopyEventForm(true);
                }}
              >
                Copia evento
              </a>
            </div>
            <div className={eventCardStyles.booking}>
              <Button primary={true} onClick={() => showEventForm(true)}>
                Modifica
              </Button>

              {!event.reservationLink && !event.booked ? (
                <Button
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

      {copyEventFormShown && (
        <Modal onClose={() => showCopyEventForm(false)}>
          <EventForm
            event={{
              ...event,
              id: undefined, // forces removal of id property
              date: new Date(),
            }}
          />
        </Modal>
      )}

      {bookingsShown && (
        <Modal onClose={() => showBookings(false)}>
          <Bookings event={event} />
        </Modal>
      )}

      {deleteEvent && (
        <Modal onClose={() => showDeleteEvent(false)}>
          <section>
            <p>
              Vuoi cancellare l&apos;evento {event.name} in data {event.date}?
            </p>
          </section>
          <section>
            <Button primary onClick={deleteEventAction}>
              Sì
            </Button>
            <Button>Annulla</Button>
          </section>
        </Modal>
      )}
    </>
  );
}

export default withAuthInfo(EditCard);
