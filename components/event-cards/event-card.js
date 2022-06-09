import React from "react";
import eventCardStyles from "../../styles/event-card.module.scss";
import DateFormatter from "../date-formatter";

export default function EventCard({ event, button }) {
  const { title, system, dm, date, time, place } = event;

  return (
    <article className={eventCardStyles.card}>
      <section className={eventCardStyles.body}>
        <h2 className={eventCardStyles.date}>
          <DateFormatter dateString={date} />
          <br />
          alle {time}
        </h2>
        <h1>{title}</h1>
        <h2>
          <section>
            {dm.link ? <a href={dm.link}>{dm.name}</a> : dm.name} – {system}
          </section>
          <section>
            Presso <a href={place.link}>{place.name}</a>
          </section>
        </h2>
      </section>

      {button || <></>}
    </article>
  );
}
