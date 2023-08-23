import { useRouter } from "next/router";
import React, { cloneElement, Fragment, useEffect, useState } from "react";
import eventPreviewStyles from "../styles/event-preview.module.scss";
import Modal from "./modal";
import RequestForm from "./request-form";
import Link from "next/link";

export default function EventPreview({
  events,
  card,
  showEmpty = true,
  style = { gridTemplateColumns: "repeat(auto-fit, minmax(15rem, 1fr))" },
}) {
  const [shown, setShown] = useState();
  const router = useRouter();

  useEffect(() => {
    setShown(router.query.eventId);
  }, [router.query.eventId]);

  return (
    <>
      <section
        className={events.length ? eventPreviewStyles.container : ""}
        style={style}
      >
        {events.map((event) =>
          cloneElement(card, {
            key: event.id,
            event,
          })
        )}

        {events.length < 4 && showEmpty ? (
          <div className={eventPreviewStyles.empty}>
            <div>
              Non ci sono altri eventi in programma, oppure i posti sono finiti
            </div>
            <div>{"o͡╮༼  ಠДಠ ༽╭o͡━☆ﾟ.*･｡ﾟ"}</div>
            <span>
              <Link href="/#contacts">
                <a alt="Contatti">Contattaci</a>
              </Link>{" "}
              se vuoi giocare a tutti i costi!
            </span>
          </div>
        ) : (
          ""
        )}
      </section>

      {events.map((event) => (
        <Fragment key={event.id}>
          {shown === event.id && (
            <Modal
              onClose={() => {
                router.replace(router.pathname, undefined, { shallow: true });
              }}
            >
              <RequestForm event={event} />
            </Modal>
          )}
        </Fragment>
      ))}
    </>
  );
}
