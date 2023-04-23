import Link from "next/link";
import React from "react";
import eventCardStyles from "../../styles/event-card.module.scss";
import Button from "../button";
import EventCard from "./event-card";

export default function BookingCard({ event }) {
  const { date, max, booked, reservationLink, info } = event;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const futureEvent = new Date(date) >= today;

  const threeMonthsAgo = new Date(today);
  threeMonthsAgo.setMonth(today.getMonth() - 3);

  const pastEvent = new Date(date) < threeMonthsAgo;

  const fullyBooked = booked >= max;

  const Book = () => {
    if (futureEvent && !fullyBooked) {
      if (reservationLink)
        return (
          <a href={reservationLink}>
            <Button primary={true}>{info ? "Leggi di più" : "Prenota!"}</Button>
          </a>
        );

      return (
        <Link href={`?eventId=${event.id}`} shallow={true}>
          <a>
            <Button primary={true}>Prenota!</Button>
          </a>
        </Link>
      );
    }

    return <></>;
  };

  return (
    <>
      <EventCard
        event={event}
        button={
          <section className={eventCardStyles.booking}>
            <section>
              {!reservationLink && !pastEvent && (
                <>
                  <span>{booked}</span> / <span>{max}</span>
                </>
              )}
            </section>
            {futureEvent && !fullyBooked && <Book />}
          </section>
        }
      />
    </>
  );
}
