import React from "react";
import eventCardStyles from "../styles/event-card.module.scss";
import Button from "./button";
import DateFormatter from "./date-formatter";

export default function EventCard({ event, onBook }) {
  const { title, system, dm, date, time, place, max, booked, reservationLink } =
    event;

  const futureEvent = new Date(date) >= new Date().setHours(0, 0, 0, 0);
  const fullyBooked = booked >= max;

  const Book = () => {
    if (futureEvent && !fullyBooked) {
      if (reservationLink)
        return (
          <a href={reservationLink}>
            <Button primary={true}>Prenota!</Button>
          </a>
        );

      return (
        <Button primary={true} onClick={onBook}>
          Prenota!
        </Button>
      );
    }

    return <></>;
  };

  return (
    <article className={eventCardStyles.card}>
      <section className={eventCardStyles.body}>
        <h2 className={eventCardStyles.date}>
          <DateFormatter dateString={date} /> alle {time}
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

      <section className={eventCardStyles.booking}>
        <section>
          {!reservationLink && (
            <>
              <span>{booked}</span> / <span>{max}</span>
            </>
          )}
        </section>
        {futureEvent && !fullyBooked && (
          <Button primary onClick={onBook}>
            Prenota!
          </Button>
        )}
      </section>
    </article>
  );
}
