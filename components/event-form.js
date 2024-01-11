import { withAuthInfo } from "@propelauth/react";
import { format } from "date-fns";
import React, { useCallback, useContext, useEffect, useState } from "react";
import eventFormStyle from "../styles/event-form.module.scss";
import requestFormStyles from "../styles/request-form.module.scss";
import { AdminContext } from "./admin-wrapper";
import Button from "./button";
import Checkbox from "./checkbox";
import Input, { Textarea } from "./input";
import Loader from "./loader";
import Select from "./select";

const FormState = { Idle: 0, Sending: 1, Success: 2, Error: 3 };

const EventForm = withAuthInfo(
  ({ event = { dm: {}, place: {} }, onSave = () => {}, accessToken }) => {
    const { events, setEvents } = useContext(AdminContext);

    const [places, setPlaces] = useState([]);

    useEffect(() => {
      setPlaces(
        events.reduce((aggregated, { place }) => {
          if (!aggregated.find((item) => item.name === place.name)) {
            aggregated.push(place);
          }

          return aggregated;
        }, [])
      );
    }, [events]);

    useEffect(() => {
      if (!places?.length) return;
      if (event.place?.name) return;

      const [place] = places;
      setPlace({ value: place.name });
      setPlaceLink({ value: place.link });
    }, [places]);

    const { id } = event;

    const [title, setTitle] = useState({ value: event.title || "" });
    const [system, setSystem] = useState({ value: event.system || "" });

    const [dm, setDm] = useState({ value: event.dm.name || "" });
    const [dmLink, setDmLink] = useState({ value: event.dm.link || "" });

    const [date, setDate] = useState({
      value: format(
        event.date ? new Date(event.date) : new Date(),
        "yyyy-MM-dd"
      ),
    });
    const [time, setTime] = useState({ value: event.time || "20:30" });
    const [place, setPlace] = useState({
      value: event.place.name,
    });
    const [placeLink, setPlaceLink] = useState({
      value: event.place.link,
    });
    const [max, setMax] = useState({ value: event.max || 1 });

    const [reservationLink, setReservationLink] = useState({
      value: event.reservationLink || "",
    });

    const [description, setDescription] = useState({
      value: event.description || "",
    });

    const [pinned, setPinned] = useState(event.pinned);
    const [hidden, setHidden] = useState(event.hide);
    const [info, setInfo] = useState(event.info);

    const [formState, setFormState] = useState(FormState.Idle);

    const sendForm = useCallback(async () => {
      const titleError = title.value === "";
      const systemError = system.value === "" && reservationLink === "";
      const dmError = dm.value === "" && reservationLink === "";
      const dateError = date.value === "";
      const timeError = time.value === "";
      const placeError = place.value === "";
      const placeLinkError = placeLink.value === "";

      setTitle({
        value: title.value,
        error: titleError,
      });

      setSystem({
        value: system.value,
        error: systemError,
      });

      setDm({
        value: dm.value,
        error: dmError,
      });

      setDate({
        value: date.value,
        error: dateError,
      });

      setTime({
        value: time.value,
        error: timeError,
      });

      setPlace({
        value: place.value,
        error: placeError,
      });

      setPlaceLink({
        value: placeLink.value,
        error: placeLinkError,
      });

      if (
        titleError ||
        systemError ||
        dmError ||
        dateError ||
        timeError ||
        placeError ||
        placeLinkError
      ) {
        return;
      }

      setFormState(FormState.Sending);

      const response = await fetch(`/api/event`, {
        method: id ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id,
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
          description: description.value,
          pinned,
          hide: hidden,
          info,
        }),
      });

      if (!response.ok) {
        return setFormState(FormState.Error);
      }

      setFormState(FormState.Success);
      const newEvent = await response.json();

      if (id) {
        // editing
        setEvents(
          events.map((event) => {
            if (event.id === id) {
              return newEvent;
            }

            return event;
          })
        );
      } else {
        // creating
        setEvents([...events, newEvent]);
      }
    }, [
      id,
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
      accessToken,
      onSave,
      description,
      pinned,
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
            <label>
              <div>DM Link</div>
              <div>Facoltativo</div>
            </label>
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
            <div className={eventFormStyle.column}>
              <div>{place.value}</div>
              <Select
                value={place.value}
                onChange={({ target }) => {
                  const place = places.find(
                    ({ name }) => name === target.value
                  );
                  setPlace({ value: place.name });
                  setPlaceLink({ value: place.link });
                }}
              >
                {places.map((place) => (
                  <option key={place.name} value={place.name}>
                    {place.name}
                  </option>
                ))}
              </Select>

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
            </div>
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
            <label>
              <div>Link Prenotazione</div>
              <div>
                Facoltativo. Per gestire le prenotazioni non attraverso il sito
              </div>
            </label>
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
          </section>

          <section className={eventFormStyle.item}>
            <label>
              <div>Descrizione</div>
              <div className={eventFormStyle.caption}>
                Facoltativo. La descrizione della sessione
              </div>
            </label>

            <Textarea
              rows={10}
              cols={50}
              value={description.value}
              error={description.error}
              onChange={({ target }) =>
                setDescription({
                  value: target.value,
                  error: !target.value || target.value === "",
                })
              }
              placeholder="Descrizione..."
            />
          </section>

          <section
            className={[eventFormStyle.item, eventFormStyle.checkboxes].join(
              " "
            )}
          >
            <div>
              <Checkbox
                value={pinned}
                onChange={({ target }) => setPinned(target.checked)}
              />
            </div>
            Pinnato, da usare per gli eventi speciali
          </section>

          <section
            className={[eventFormStyle.item, eventFormStyle.checkboxes].join(
              " "
            )}
          >
            <div>
              <Checkbox
                value={hidden}
                onChange={({ target }) => setHidden(target.checked)}
              />
            </div>
            Nascondi l&apos;evento
          </section>

          <section
            className={[eventFormStyle.item, eventFormStyle.checkboxes].join(
              " "
            )}
          >
            <div>
              <Checkbox
                value={info}
                onChange={({ target }) => setInfo(target.checked)}
              />
            </div>
            Sostituisci il testo Prenota! con Mostra di più
          </section>
        </form>
        <section className={requestFormStyles.button}>
          <Button
            secondary
            onClick={() => {
              sendForm();
              onSave();
            }}
          >
            {event.id ? "Modifica l'evento" : "Crea l'evento"}
          </Button>
        </section>
      </section>
    );
  }
);

export default EventForm;
