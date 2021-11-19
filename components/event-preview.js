import React, { useState } from "react";
import EventCard from "./event-card";

import eventPreviewStyles from "../styles/event-preview.module.scss";
import Modal from "./modal";
import RequestForm from "./request-form";

export default function EventPreview({ events }) {
  const [selectedEvent, setSelectedEvent] = useState();

  return (
    <section className={eventPreviewStyles.container}>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          onBook={() => setSelectedEvent(event)}
        />
      ))}

      {selectedEvent && (
        <Modal onClose={() => setSelectedEvent()}>
          <RequestForm event={selectedEvent} />
        </Modal>
      )}
    </section>
  );
}
