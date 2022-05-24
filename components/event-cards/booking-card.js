import Link from "next/link";
import React from "react";
import eventCardStyles from "../../styles/event-card.module.scss";
import Button from "../button";
import EventCard from "./event-card";

export default function BookingCard({ event }) {
  const { date, max, booked, reservationLink } = event;

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
              {!reservationLink && (
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
