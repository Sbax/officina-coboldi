import { useRouter } from "next/router";
import React, { cloneElement, Fragment, useEffect, useState } from "react";
import eventPreviewStyles from "../styles/event-preview.module.scss";
import Modal from "./modal";
import RequestForm from "./request-form";

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
