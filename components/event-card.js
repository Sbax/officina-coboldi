import React from "react";
import eventCardStyles from "../styles/event-card.module.scss";
import Button from "./button";
import DateFormatter from "./date-formatter";

export default function EventCard({ event }) {
  const { title, system, dm, date, time, place, max, booked } = event;

  const futureEvent = new Date(date) >= new Date().setHours(0, 0, 0, 0);
  const fullyBooked = booked >= max;

  return (
    <article className={eventCardStyles.card}>
      <section className={eventCardStyles.body}>
        <h2 className={eventCardStyles.date}>
          <DateFormatter dateString={date} /> alle {time}
        </h2>
        <h1>{title}</h1>
        <h2>
          <div>
            {dm} – {system}
          </div>
          <div>
            Presso <a href={`https://instagram.com/${place}`}>{place}</a>
          </div>
        </h2>
      </section>

      <section className={eventCardStyles.booking}>
        <div>
          <span>{booked}</span>/<span>{max}</span>
        </div>
        {futureEvent && !fullyBooked && (
          <Button primary={true}>Prenota!</Button>
        )}
      </section>
    </article>
  );
}
