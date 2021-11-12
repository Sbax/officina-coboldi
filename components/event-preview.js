import React from "react";
import EventCard from "./event-card";

import eventPreviewStyles from "../styles/event-preview.module.scss";

export default function EventPreview({ events }) {
  return (
    <section className={eventPreviewStyles.container}>
      {events.map(({ id, ...event }) => (
        <EventCard key={id} event={event} />
      ))}
    </section>
  );
}
