import Link from "next/link";
import React, { useCallback, useState } from "react";
import requestFormStyles from "../styles/request-form.module.scss";
import Button from "./button";
import Checkbox from "./checkbox";
import DateFormatter from "./date-formatter";
import Input from "./input";
import Loader from "./loader";

const FormState = { Idle: 0, Sending: 1, Success: 2, Error: 3 };

export default function RequestForm({ event }) {
  const { title, system, dm, date, time, place, max, booked } = event;
  const [people, setPeople] = useState({ value: 1 });
  const [name, setName] = useState({ value: "" });
  const [phone, setPhone] = useState({ value: "" });
  const [instagram, setInstagram] = useState({ value: "" });

  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [formState, setFormState] = useState(FormState.Idle);

  const remainingPlaces = max - booked;

  const sendForm = useCallback(async () => {
    const peopleError = people.value < 1 || people.value > remainingPlaces;

    setPeople({
      value: people.value,
      error: peopleError,
    });

    const nameError = !name.value || name.value === "";
    setName({
      value: name.value,
      error: nameError,
    });

    const phoneError = !phone.value || phone.value === "";
    const instagramError = !instagram.value || instagram.value === "";

    setPhone({ value: phone.value, error: phoneError && instagramError });
    setInstagram({
      value: instagram.value,
      error: phoneError && instagramError,
    });

    if (peopleError || nameError || (phoneError && instagramError)) {
      return;
    }

    setFormState(FormState.Sending);

    const response = await fetch(`/api/requests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: event.id,
        event,
        people: people.value,
        name: name.value,
        phone: phone.value,
        instagram: instagram.value,
      }),
    });

    if (!response.ok) {
      return setFormState(FormState.Error);
    }

    setFormState(FormState.Success);
  }, [event, people, name, phone, instagram, remainingPlaces]);

  return (
    <section className={requestFormStyles.container}>
      {formState === FormState.Sending ? (
        <section className={requestFormStyles.loader}>
          <Loader />
        </section>
      ) : (
        ""
      )}

      <h2>Ti stai prenotando per</h2>
      <h1>{title}</h1>
      <h2>
        {system} con {dm.name}, il <DateFormatter dateString={date} /> alle{" "}
        {time} presso <a href={place.link}>{place.name}</a>
      </h2>
      <form className={requestFormStyles.form}>
        {remainingPlaces !== 1 && (
          <section className={requestFormStyles.item}>
            <label>Quante persone?</label>
            <Input
              disabled={formState === FormState.Success}
              value={people.value}
              error={people.error}
              onChange={({ target }) => {
                const { value } = target;

                if (!value || value < 1 || value > remainingPlaces) {
                  return setPeople({ value: target.value, error: true });
                }

                setPeople({ value: target.value });
              }}
              id="people"
              type="number"
              placeholder={`1-${remainingPlaces}`}
              min="1"
              max={remainingPlaces}
            />
          </section>
        )}

        <section className={requestFormStyles.item}>
          <label>Nome</label>
          <Input
            disabled={formState === FormState.Success}
            value={name.value}
            error={name.error}
            onChange={({ target }) =>
              setName({
                value: target.value,
                error: !target.value || target.value === "",
              })
            }
            id="name"
            type="text"
            placeholder="Nome"
          />
        </section>

        <section className={requestFormStyles.item}>
          <label>Numero di telefono</label>
          <Input
            disabled={formState === FormState.Success}
            value={phone.value}
            error={phone.error}
            onChange={({ target }) => {
              const { value } = target;
              const hasError = !value || value === "";

              const instagramError = !instagram.value || instagram.value === "";

              setInstagram({
                value: instagram.value,
                error: hasError && instagramError,
              });

              setPhone({
                value: value,
                error: hasError && instagramError,
              });
            }}
            id="phone"
            type="text"
            placeholder="XXX 123 45 67"
          />
        </section>

        <section className={requestFormStyles.item}>
          <label>Instagram</label>
          <Input
            disabled={formState === FormState.Success}
            value={instagram.value}
            error={instagram.error}
            onChange={({ target }) => {
              const { value } = target;
              const hasError = !value || value === "";
              const phoneError = !phone.value || phone.value === "";

              setPhone({
                value: phone.value,
                error: hasError && phoneError,
              });

              setInstagram({
                value: value,
                error: hasError && phoneError,
              });
            }}
            id="instagram"
            type="text"
            placeholder="username"
          />
        </section>
        <section>
          <Checkbox
            value={privacyAccepted}
            onChange={() => setPrivacyAccepted(!privacyAccepted)}
          >
            <span className={requestFormStyles.privacy}>
              Ho letto la <Link href="/privacy-policy">privacy policy</Link> e
              acconsento al trattamento dei dati che non verranno ceduti a terzi
            </span>
          </Checkbox>
        </section>
      </form>
      <section className={requestFormStyles.button}>
        <Button
          disabled={
            formState === FormState.Success ||
            name.error ||
            instagram.error ||
            phone.error ||
            !privacyAccepted
          }
          secondary
          onClick={() => sendForm()}
        >
          Prenota!
        </Button>
      </section>

      {formState === FormState.Success && (
        <section className={requestFormStyles.success}>
          <h2>
            La richiesta è stata inviata, tra poco riceverai un messaggio per
            confermarla!
          </h2>
        </section>
      )}

      {formState === FormState.Error && (
        <section className={requestFormStyles.error}>
          <h2>Si è verificato un errore, riprova.</h2>
        </section>
      )}
    </section>
  );
}
