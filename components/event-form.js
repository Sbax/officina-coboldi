import { withAuthInfo } from "@propelauth/react";
import { format } from "date-fns";
import React, { useCallback, useState } from "react";
import eventFormStyle from "../styles/event-form.module.scss";
import requestFormStyles from "../styles/request-form.module.scss";
import Button from "./button";
import Input from "./input";
import Loader from "./loader";

const FormState = { Idle: 0, Sending: 1, Success: 2, Error: 3 };

const EventForm = withAuthInfo(
  ({ event = { dm: {}, place: {} }, onSave = () => {}, accessToken }) => {
    const { rowNumber } = event;

    const [title, setTitle] = useState({ value: event.title || "" });
    const [system, setSystem] = useState({ value: event.system || "" });

    const [dm, setDm] = useState({ value: event.dm.name || "" });
    const [dmLink, setDmLink] = useState({ value: event.dm.link || "" });

    const [date, setDate] = useState({
      value: format(new Date(event.date || null), "yyyy-MM-dd"),
    });
    const [time, setTime] = useState({ value: event.time || "20:30" });
    const [place, setPlace] = useState({ value: event.place.name || "" });
    const [placeLink, setPlaceLink] = useState({
      value: event.place.link || "",
    });
    const [max, setMax] = useState({ value: event.max || 1 });

    const [reservationLink, setReservationLink] = useState({
      value: event.reservationLink || "",
    });

    const [formState, setFormState] = useState(FormState.Idle);

    const sendForm = useCallback(async () => {
      setTitle({
        value: title.value,
        error: title.value === "",
      });

      setSystem({
        value: system.value,
        error: system.value === "",
      });

      setDm({
        value: dm.value,
        error: dm.value === "",
      });

      setDate({
        value: date.value,
        error: date.value === "",
      });

      setTime({
        value: time.value,
        error: time.value === "",
      });

      setPlace({
        value: place.value,
        error: place.value === "",
      });

      setPlaceLink({
        value: placeLink.value,
        error: placeLink.value === "",
      });

      if (
        title.error ||
        system.error ||
        dm.error ||
        date.error ||
        time.error ||
        place.error ||
        placeLink.error
      ) {
        return;
      }

      setFormState(FormState.Sending);

      const response = await fetch(`/api/event`, {
        method: rowNumber ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: title.value,
          system: system.value,
          dm: dm.value,
          dmlink: dmLink.value,
          date: date.value,
          time: time.value,
          place: place.value,
          placelink: placeLink.value,
          max: max.value,
          reservationLink: reservationLink.value,
          rowNumber: rowNumber || null,
        }),
      });

      if (!response.ok) {
        return setFormState(FormState.Error);
      }

      setFormState(FormState.Success);
      onSave();
    }, [
      title,
      system,
      dm,
      dmLink,
      date,
      time,
      place,
      placeLink,
      max,
      reservationLink,
    ]);

    return (
      <section className={eventFormStyle.container}>
        {formState === FormState.Sending ? (
          <section className={requestFormStyles.loader}>
            <Loader />
          </section>
        ) : (
          ""
        )}

        <form className={eventFormStyle.form}>
          <section className={eventFormStyle.item}>
            <label className={eventFormStyle.required}>Titolo</label>
            <Input
              value={title.value}
              error={title.error}
              onChange={({ target }) =>
                setTitle({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              type="text"
              placeholder="Titolo"
            />
          </section>

          <section className={eventFormStyle.item}>
            <label className={eventFormStyle.required}>Sistema</label>
            <Input
              value={system.value}
              error={system.error}
              onChange={({ target }) =>
                setSystem({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              type="text"
              placeholder="Sistema"
            />
          </section>

          <section className={eventFormStyle.item}>
            <label className={eventFormStyle.required}>DM</label>
            <Input
              value={dm.value}
              error={dm.error}
              onChange={({ target }) =>
                setDm({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              type="text"
              placeholder="DM"
            />
          </section>

          <section className={eventFormStyle.item}>
            <label>DM Link</label>
            <Input
              value={dmLink.value}
              error={dmLink.error}
              onChange={({ target }) =>
                setDmLink({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              type="text"
              placeholder="DM Link"
            />

            <div>Facoltativo</div>
          </section>

          <section className={eventFormStyle.item}>
            <label className={eventFormStyle.required}>Data</label>
            <Input
              value={date.value}
              error={date.error}
              onChange={({ target }) =>
                setDate({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              type="date"
              placeholder="Data"
            />
          </section>

          <section className={eventFormStyle.item}>
            <label className={eventFormStyle.required}>Ora</label>
            <Input
              value={time.value}
              error={time.error}
              onChange={({ target }) =>
                setTime({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              type="time"
              placeholder="Ora"
            />
          </section>

          <section className={eventFormStyle.item}>
            <label className={eventFormStyle.required}>Luogo</label>
            <Input
              value={place.value}
              error={place.error}
              onChange={({ target }) =>
                setPlace({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              type="text"
              placeholder="Luogo"
            />
          </section>

          <section className={eventFormStyle.item}>
            <label className={eventFormStyle.required}>Link Luogo</label>
            <Input
              value={placeLink.value}
              error={placeLink.error}
              onChange={({ target }) =>
                setPlaceLink({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              type="text"
              placeholder="Link Luogo"
            />
          </section>

          <section className={eventFormStyle.item}>
            <label className={eventFormStyle.required}>Max</label>
            <Input
              value={max.value}
              error={max.error}
              onChange={({ target }) => {
                setMax({ value: target.value });
              }}
              id="max"
              type="number"
              placeholder={`1`}
              min="1"
            />
          </section>

          <section className={eventFormStyle.item}>
            <label>Link Prenotazione</label>
            <Input
              value={reservationLink.value}
              error={reservationLink.error}
              onChange={({ target }) =>
                setReservationLink({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              type="text"
              placeholder="Link Prenotazione"
            />

            <div>
              Facoltativo. Per gestire le prenotazioni non attraverso il sito
            </div>
          </section>
        </form>
        <section className={requestFormStyles.button}>
          <Button secondary onClick={() => sendForm()}>
            {event.id ? "Modifica l'evento" : "Crea l'evento"}
          </Button>
        </section>
      </section>
    );
  }
);

export default EventForm;
