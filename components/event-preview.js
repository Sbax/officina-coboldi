import React, { cloneElement } from "react";
import eventPreviewStyles from "../styles/event-preview.module.scss";

export default function EventPreview({ events, card, showEmpty = true }) {
  return (
    <section className={events.length ? eventPreviewStyles.container : ""}>
      {events.map((event) =>
        cloneElement(card, {
          key: event.id,
          event,
        })
      )}

      {events.length < 4 && showEmpty ? (
        <div className={eventPreviewStyles.empty}>
          {!events.length ? (
            <span>Nessun evento in programma</span>
          ) : (
            <span>Nessun altro evento in programma</span>
          )}
          <div>{"o͡╮༼  ಠДಠ ༽╭o͡━☆ﾟ.*･｡ﾟ"}</div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
