import { faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import eventCardStyles from "../../styles/event-card.module.scss";
import Button from "../button";
import DateFormatter from "../date-formatter";
import Modal from "../modal";

export default function EventCard({ event, button }) {
  const { title, system, dm, date, time, place, description, hide } = event;

  const [showModal, setShowModal] = useState(false);

  return (
    <article
      className={`${eventCardStyles.card} ${
        hide ? eventCardStyles.hidden : ""
      }`}
    >
      <section className={eventCardStyles.body}>
        <div className={eventCardStyles.header}>
          <h2 className={eventCardStyles.date}>
            <DateFormatter dateString={date} />
            <br />
            alle {time}
          </h2>
          {description && (
            <span className={eventCardStyles.infoContainer}>
              <Button
                className={eventCardStyles.info}
                onClick={() => setShowModal(true)}
              >
                <FontAwesomeIcon icon={faInfo} />
              </Button>
            </span>
          )}
        </div>
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

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div>
            <h1>{title}</h1>
            <p className={eventCardStyles.description}>{description}</p>
          </div>
        </Modal>
      )}
    </article>
  );
}
