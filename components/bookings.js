import { withAuthInfo } from "@propelauth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";
import styles from "../styles/pending.module.scss";
import Button from "./button";
import DateFormatter from "./date-formatter";
import Input from "./input";

const fetcher = (url, accessToken) =>
  fetch(url, {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  }).then((res) => res.json());

function Bookings({ accessToken, event }) {
  const [name, setName] = useState({ value: "" });

  const [requests, setRequests] = useState();
  const { data, error } = useSWR(["/api/requests", accessToken], fetcher);

  useEffect(() => {
    setRequests(
      (data || []).filter(
        ({ eventId, accepted }) => accepted && eventId === event.id
      )
    );
  }, [data, event]);

  if (error) return "Si è verificato un errore";
  if (!data) return "Loading...";

  const removeRequest = async (id) => {
    const response = await fetch(`/api/requests`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify([{ id }]),
    });

    if (response.ok) {
      setRequests(requests.filter((item) => item.id !== id));
    }
  };

  const addRequest = async () => {
    const response = await fetch(`/api/requests`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: event.id,
        event,
        people: 1,
        name: name.value,
        instagram: name.value,
        skipNotification: true,
      }),
    });

    if (response.ok) {
      setName({ value: "" });
    }
  };

  return (
    <>
      <h1 className={styles.title}>
        Prenotazioni per {event.title} (
        <DateFormatter dateString={event.date} />)
      </h1>
      <div className={styles.scrollable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Instagram</th>
              <th>Telefono</th>
            </tr>
          </thead>

          <tbody>
            {(requests || []).map((item, index) => (
              <tr key={`${item.name}-${index}`}>
                <td>{item.name}</td>
                <td>{item.instagram}</td>
                <td>{item.phone}</td>
                <td>
                  <Button onClick={() => removeRequest(item.id)}>
                    Rimuovi
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3}>
                <Input
                  value={name.value}
                  onChange={({ target }) =>
                    setName({
                      value: target.value,
                    })
                  }
                  id="name"
                  type="text"
                  placeholder="Nome"
                />
              </td>
              <td>
                <Button onClick={() => addRequest()}>Aggiungi</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default withAuthInfo(Bookings);
