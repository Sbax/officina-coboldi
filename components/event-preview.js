import React, { useState } from "react";
import EventCard from "./event-card";

import eventPreviewStyles from "../styles/event-preview.module.scss";
import Modal from "./modal";
import RequestForm from "./request-form";

export default function EventPreview({ events }) {
  const [selectedEvent, setSelectedEvent] = useState();

  return (
    <section className={events.length ? eventPreviewStyles.container : ""}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onBook={() => setSelectedEvent(event)}
        />
      ))}

      {events.length && events.length < 4 ? (
        <div className={eventPreviewStyles.empty}>
          <span>Nessun altro evento in programma</span>
          <div>{"o͡╮༼  ಠДಠ ༽╭o͡━☆ﾟ.*･｡ﾟ"}</div>
        </div>
      ) : (
        ""
      )}

      {!events.length && (
        <div className={eventPreviewStyles.empty}>
          <span>Nessun evento in programma</span>
          <div>{"o͡╮༼  ಠДಠ ༽╭o͡━☆ﾟ.*･｡ﾟ"}</div>
        </div>
      )}

      {selectedEvent && (
        <Modal onClose={() => setSelectedEvent()}>
          <RequestForm event={selectedEvent} />
        </Modal>
      )}
    </section>
  );
}
